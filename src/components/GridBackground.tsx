const GridBackground = () => {
  return (
    <div className="fixed inset-0 w-full h-full">
      <div className="absolute inset-0 bg-background" />
      <svg className="absolute inset-0 w-full h-full opacity-[0.08]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid-sm" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-foreground" />
          </pattern>
          <pattern id="grid-lg" width="100" height="100" patternUnits="userSpaceOnUse">
            <rect width="100" height="100" fill="url(#grid-sm)" />
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" strokeWidth="1" className="text-foreground" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-lg)" />
      </svg>
    </div>
  );
};

export default GridBackground;
