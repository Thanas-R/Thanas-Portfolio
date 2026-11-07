interface AsciiWordmarkProps {
  className?: string;
}

/**
 * Compact blocky ASCII wordmark spelling "thanas." — used in the navbar
 * and as the bottom-left signature on standalone pages (loader, 404).
 */
const ASCII_LINES = [
  '▀█▀ █ █ ▄▀█ █▄ █ ▄▀█ █▀',
  ' █  █▀█ █▀█ █ ▀█ █▀█ ▄█ ▄',
];

export const AsciiWordmark = ({ className = '' }: AsciiWordmarkProps) => (
  <span
    role="img"
    aria-label="thanas."
    className={`block font-mono whitespace-pre select-none ${className}`}
  >
    {ASCII_LINES.join('\n')}
  </span>
);

export default AsciiWordmark;
