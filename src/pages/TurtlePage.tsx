import { ImagePlus } from 'lucide-react';

const turtleImageModules = import.meta.glob(
  '@/assets/turtle/*.{avif,gif,heic,heif,jpeg,jpg,png,webp,AVIF,GIF,HEIC,HEIF,JPEG,JPG,PNG,WEBP}',
  { eager: true, import: 'default', query: '?url' },
) as Record<string, string>;

const turtlePhotos = Object.entries(turtleImageModules)
  .map(([path, src]) => ({
    src,
    name: path.split('/').pop()?.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ') ?? 'turtle photo',
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

const TurtlePage = () => (
  <main className="turtle-page min-h-screen bg-background px-4 pb-20 text-foreground sm:px-8">
    <div className="mx-auto max-w-6xl">
      <header className="mb-8 flex flex-wrap items-baseline justify-between gap-3 border-b border-border/70 py-6 sm:mb-10">
        <div className="flex flex-wrap items-baseline gap-2 sm:gap-3">
          <h1 className="font-['Instrument_Serif'] text-4xl leading-none text-foreground sm:text-6xl">
            #siripics
          </h1>
          <span className="font-['Caveat'] text-xl text-muted-foreground sm:text-2xl">
            (my pet turtle)
          </span>
        </div>
        {turtlePhotos.length > 0 && (
          <span className="font-mono text-xs text-muted-foreground">
            {turtlePhotos.length} {turtlePhotos.length === 1 ? 'photo' : 'photos'}
          </span>
        )}
      </header>

      {turtlePhotos.length > 0 ? (
        <section aria-label="Turtle photos" className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {turtlePhotos.map((photo, index) => (
            <figure
              key={photo.src}
              className={`mb-5 break-inside-avoid border border-border bg-card p-2 shadow-sm transition-transform duration-200 hover:-translate-y-1 ${index % 3 === 1 ? 'rotate-[0.4deg]' : index % 3 === 2 ? '-rotate-[0.4deg]' : ''}`}
            >
              <img
                src={photo.src}
                alt={`Turtle photo: ${photo.name}`}
                loading="lazy"
                decoding="async"
                className="block h-auto w-full"
              />
              <figcaption className="px-1 pb-1 pt-3 font-['Caveat'] text-xl capitalize text-muted-foreground">
                {photo.name}
              </figcaption>
            </figure>
          ))}
        </section>
      ) : (
        <section className="mx-auto flex max-w-xl flex-col items-center border border-dashed border-border bg-card/70 px-6 py-12 text-center sm:py-16">
          <div className="mb-5 grid h-14 w-14 place-items-center border border-border bg-background text-primary">
            <ImagePlus aria-hidden="true" className="h-6 w-6" />
          </div>
          <h2 className="font-['Instrument_Serif'] text-3xl">The shell is ready.</h2>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Add your turtle photos to <code className="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">src/assets/turtle/</code> and they’ll appear here after the next update.
          </p>
          <span className="mt-5 font-['Caveat'] text-xl text-primary">jpg · png · webp · heic · heif · avif · gif</span>
        </section>
      )}
    </div>
  </main>
);

export default TurtlePage;
