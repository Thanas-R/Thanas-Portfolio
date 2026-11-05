import { Check } from 'lucide-react';

const ingredients = ['Tomato', 'Basil', 'Pasta', 'Garlic'];

const matches = [
  { name: 'Tomato & basil pasta', score: 0.92 },
  { name: 'Tomato soup', score: 0.73 },
  { name: 'Garlic bread', score: 0.46 },
];

const SmartChefMatchingNotebook = () => (
  <section
    aria-labelledby="matching-notebook-title"
    className="mx-auto max-w-2xl border border-border bg-card px-6 py-7 shadow-sm sm:px-8 sm:py-8"
  >
    <header className="flex items-center justify-between gap-4 border-b border-dashed border-border pb-4">
      <h3
        id="matching-notebook-title"
        className="font-['Instrument_Serif'] text-2xl text-card-foreground sm:text-3xl"
      >
        The matching notebook
      </h3>
      <span className="shrink-0 font-mono text-[10px] uppercase text-muted-foreground">Example</span>
    </header>

    <div className="grid gap-6 border-b border-dashed border-border py-5 sm:grid-cols-2 sm:gap-8">
      <div>
        <h4 className="mb-3 text-xs font-bold uppercase text-muted-foreground">Ingredients you have</h4>
        <ul className="divide-y divide-border">
          {ingredients.map((ingredient) => (
            <li key={ingredient} className="flex items-center gap-2 py-2 text-sm text-card-foreground">
              <Check aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-primary" />
              {ingredient}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="mb-3 text-xs font-bold uppercase text-muted-foreground">How it matches</h4>
        <p className="text-sm leading-relaxed text-muted-foreground">
          TF-IDF weights the ingredients. The vector space model turns them into vectors. Cosine similarity compares your ingredients against each recipe to rank the closest matches.
        </p>
      </div>
    </div>

    <ol aria-label="Example recipe match scores" className="space-y-4 border-b border-dashed border-border py-5">
      {matches.map((match) => (
        <li key={match.name}>
          <div className="mb-1.5 flex items-baseline justify-between gap-3 text-sm">
            <span className="text-card-foreground">{match.name}</span>
            <span className="font-mono text-xs text-muted-foreground">{match.score.toFixed(2)}</span>
          </div>
          <div
            role="img"
            aria-label={`${match.name}: ${(match.score * 100).toFixed(0)} percent match`}
            className="h-1.5 overflow-hidden bg-muted"
          >
            <div className="h-full bg-primary" style={{ width: `${match.score * 100}%` }} />
          </div>
        </li>
      ))}
    </ol>

    <footer className="flex flex-col gap-2 pt-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
      <span className="font-mono text-primary">TF-IDF, cosine similarity</span>
      <span>Example ingredients and scores, not measured app results.</span>
    </footer>
  </section>
);

export default SmartChefMatchingNotebook;