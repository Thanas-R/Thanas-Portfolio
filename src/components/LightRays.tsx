import { useRef, useEffect, useState } from 'react';
import { Renderer, Program, Triangle, Mesh } from 'ogl';
import { useTheme } from '@/hooks/use-theme';

const hexToRgb = (hex: string): [number, number, number] => {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return m
    ? [parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255]
    : [1, 1, 1];
};

interface LightRaysProps {
  className?: string;
}

const LightRays = ({ className = '' }: LightRaysProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const uniformsRef = useRef<any>(null);
  const rendererRef = useRef<any>(null);
  const animationIdRef = useRef<number | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);
  const { isDark } = useTheme();

  // Color: white rays in dark mode, dark rays in light mode
  const raysColor = isDark ? '#ffffff' : '#000000';

  useEffect(() => {
    if (!containerRef.current) return;

    if (cleanupRef.current) {
      cleanupRef.current();
      cleanupRef.current = null;
    }

    const init = async () => {
      if (!containerRef.current) return;
      await new Promise((r) => setTimeout(r, 10));
      if (!containerRef.current) return;

      const renderer = new Renderer({ dpr: Math.min(window.devicePixelRatio, 2), alpha: true });
      rendererRef.current = renderer;
      const gl = renderer.gl;
      gl.canvas.style.width = '100%';
      gl.canvas.style.height = '100%';
      while (containerRef.current.firstChild) containerRef.current.removeChild(containerRef.current.firstChild);
      containerRef.current.appendChild(gl.canvas);

      const vert = `attribute vec2 position; varying vec2 vUv; void main() { vUv = position * 0.5 + 0.5; gl_Position = vec4(position, 0.0, 1.0); }`;

      const frag = `precision highp float;
uniform float iTime;
uniform vec2 iResolution;
uniform vec2 rayPos;
uniform vec3 raysColor;
uniform float raysSpeed;
uniform float lightSpread;
uniform float rayLength;
uniform float fadeDistance;
varying vec2 vUv;

float rayStrength(vec2 raySource, vec2 coord, float seedA, float seedB, float speed) {
  vec2 dir = normalize(vec2(0.0, -1.0));
  vec2 toCoord = coord - raySource;
  vec2 dirNorm = normalize(toCoord);
  float cosAngle = dot(dirNorm, dir);
  float spreadFactor = pow(max(cosAngle, 0.0), 1.0 / max(lightSpread, 0.001));
  float distance = length(toCoord);
  float maxDist = iResolution.x * rayLength;
  float falloff = clamp((maxDist - distance) / maxDist, 0.0, 1.0);
  float base = clamp(
    (0.45 + 0.15 * sin(cosAngle * seedA + iTime * speed)) +
    (0.3 + 0.2 * cos(-cosAngle * seedB + iTime * speed)),
    0.0, 1.0
  );
  return base * falloff * spreadFactor;
}

void main() {
  vec2 coord = vec2(gl_FragCoord.x, iResolution.y - gl_FragCoord.y);
  float r1 = rayStrength(rayPos, coord, 36.2214, 21.11349, 1.5 * raysSpeed);
  float r2 = rayStrength(rayPos, coord, 22.3991, 18.0234, 1.1 * raysSpeed);
  float strength = r1 * 0.5 + r2 * 0.4;
  gl_FragColor = vec4(raysColor * strength, strength * 0.6);
}`;

      const uniforms = {
        iTime: { value: 0 },
        iResolution: { value: [1, 1] as [number, number] },
        rayPos: { value: [0, 0] as [number, number] },
        raysColor: { value: hexToRgb(raysColor) },
        raysSpeed: { value: 0.6 },
        lightSpread: { value: 1.2 },
        rayLength: { value: 1.8 },
        fadeDistance: { value: 1.0 },
      };
      uniformsRef.current = uniforms;

      const geometry = new Triangle(gl);
      const program = new Program(gl, { vertex: vert, fragment: frag, uniforms });
      const mesh = new Mesh(gl, { geometry, program });

      const updateSize = () => {
        if (!containerRef.current || !rendererRef.current) return;
        const { clientWidth: w, clientHeight: h } = containerRef.current;
        renderer.setSize(w, h);
        const dpr = renderer.dpr;
        uniforms.iResolution.value = [w * dpr, h * dpr];
        uniforms.rayPos.value = [w * dpr * 0.5, -h * dpr * 0.1];
      };

      const loop = (t: number) => {
        if (!rendererRef.current || !uniformsRef.current) return;
        uniforms.iTime.value = t * 0.001;
        try {
          renderer.render({ scene: mesh });
          animationIdRef.current = requestAnimationFrame(loop);
        } catch { return; }
      };

      window.addEventListener('resize', updateSize);
      updateSize();
      animationIdRef.current = requestAnimationFrame(loop);

      cleanupRef.current = () => {
        if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
        window.removeEventListener('resize', updateSize);
        try {
          const ext = gl.getExtension('WEBGL_lose_context');
          if (ext) ext.loseContext();
        } catch { /* noop */ }
        rendererRef.current = null;
        uniformsRef.current = null;
      };
    };

    init();
    return () => { if (cleanupRef.current) { cleanupRef.current(); cleanupRef.current = null; } };
  }, []);

  // Update color when theme changes
  useEffect(() => {
    if (uniformsRef.current) {
      uniformsRef.current.raysColor.value = hexToRgb(raysColor);
    }
  }, [raysColor]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ mixBlendMode: isDark ? 'screen' : 'multiply' }}
    />
  );
};

export default LightRays;
