import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { AsciiWordmark } from "@/components/AsciiWordmark";
import { 
  TbBrandGithubFilled, 
  TbBrandLinkedin, 
  TbBrandDiscordFilled 
} from "react-icons/tb";

const FRAME_WIDTH = 320;
const FRAME_HEIGHT = 290;
const FRAME_COUNT = 117;
const FRAME_COLUMNS = 10;
const FRAME_RATE = 24;

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/Thanas-R",
    icon: <TbBrandGithubFilled className="w-5 h-5" />,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/thanasr/",
    icon: <TbBrandLinkedin className="w-5 h-5" />,
  },
  {
    name: "Discord",
    href: "https://discord.com/users/677174403859087378",
    icon: <TbBrandDiscordFilled className="w-5 h-5" />,
  },
];

const NotFound = () => {
  const location = useLocation();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  // Continuous loop animation using loading-sprite.webp
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.src = "/loading-sprite.webp";

    let animId = 0;
    const startTime = performance.now();

    const render = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      const frameIndex = Math.floor(elapsed * FRAME_RATE) % FRAME_COUNT;

      if (img.complete && img.naturalWidth > 0) {
        const col = frameIndex % FRAME_COLUMNS;
        const row = Math.floor(frameIndex / FRAME_COLUMNS);
        ctx.clearRect(0, 0, FRAME_WIDTH, FRAME_HEIGHT);
        ctx.drawImage(
          img,
          col * FRAME_WIDTH,
          row * FRAME_HEIGHT,
          FRAME_WIDTH,
          FRAME_HEIGHT,
          0,
          0,
          FRAME_WIDTH,
          FRAME_HEIGHT
        );
      }
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="relative flex min-h-[100dvh] h-[100dvh] flex-col items-center justify-center bg-background px-4 sm:px-6 text-foreground selection:bg-foreground selection:text-background overflow-hidden">
      {/* Vertical Social Icons on Right Edge - Desktop Only */}
      <aside
        aria-label="Social links"
        className="hidden md:flex fixed right-6 lg:right-8 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-3 p-2.5 rounded-full border border-border/60 bg-card/60 backdrop-blur-md shadow-sm"
      >
        {socialLinks.map((social) => (
          <a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.name}
            className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-all duration-200"
          >
            {social.icon}
          </a>
        ))}
      </aside>

      {/* Main Content Card - Balanced spacing for zero mobile scroll */}
      <main className="flex flex-col items-center text-center max-w-md w-full z-10 py-2 sm:py-6">
        {/* Looping Sprite */}
        <div className="relative mb-1 sm:mb-2">
          <canvas
            ref={canvasRef}
            width={FRAME_WIDTH}
            height={FRAME_HEIGHT}
            className="w-[130px] h-[118px] sm:w-[170px] sm:h-[154px]"
            aria-hidden="true"
          />
        </div>

        {/* 404 Badge */}
        <div className="inline-flex items-center px-2.5 py-0.5 sm:py-1 mb-2 sm:mb-3 text-[11px] sm:text-xs font-mono uppercase tracking-widest rounded-full bg-muted/80 text-muted-foreground border border-border">
          404 error
        </div>

        {/* Stylish Title */}
        <h1
          className="text-2xl sm:text-4xl md:text-5xl font-normal tracking-tight mb-2 italic"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          lost into unknown
        </h1>

        {/* Quirky 2-Line Description */}
        <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-snug sm:leading-relaxed mb-5 sm:mb-6 max-w-sm sm:max-w-md">
          looks like you took a wrong path that is detouring the void
          <br className="hidden sm:inline" />
          {" "}Pick a path below to warp back to reality:
        </p>

        {/* The 4 Redirect Options */}
        <div className="w-full max-w-sm sm:max-w-md flex flex-col gap-2.5">
          <div className="grid grid-cols-2 gap-2 sm:gap-3 text-sm sm:text-base md:text-lg font-mono font-medium">
            <Link
              to="/"
              className="px-3 py-2.5 sm:py-3 rounded-xl border border-border/80 bg-card/60 hover:bg-accent hover:border-foreground/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-center shadow-sm"
            >
              /home
            </Link>
            <Link
              to="/projects"
              className="px-3 py-2.5 sm:py-3 rounded-xl border border-border/80 bg-card/60 hover:bg-accent hover:border-foreground/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-center shadow-sm"
            >
              /projects
            </Link>
            <Link
              to="/blogs"
              className="px-3 py-2.5 sm:py-3 rounded-xl border border-border/80 bg-card/60 hover:bg-accent hover:border-foreground/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-center shadow-sm"
            >
              /blogs
            </Link>
            <Link
              to="/resume"
              className="px-3 py-2.5 sm:py-3 rounded-xl border border-border/80 bg-card/60 hover:bg-accent hover:border-foreground/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-center shadow-sm"
            >
              /resume
            </Link>
          </div>
          <Link
            to="/turtle"
            className="mt-2.5 block w-full rounded-xl border border-border/80 bg-card/60 px-3 py-2.5 text-center font-mono text-sm shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground/40 hover:bg-accent active:translate-y-0 sm:py-3 sm:text-base md:text-lg"
          >
            /turtle
          </Link>
        </div>
      </main>

      {/* Signature Wordmark */}
      <AsciiWordmark className="absolute bottom-10 left-5 sm:bottom-6 sm:left-6 text-[9px] leading-[1.15] text-foreground/70" />
    </div>
  );
};

export default NotFound;
