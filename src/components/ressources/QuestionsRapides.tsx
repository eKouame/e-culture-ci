// « Votre question ? » : de vrais liens d'ancre (ils fonctionnent même si le script
// ne se charge pas). Ouverture des accordéons, surbrillance et mesure sont gérées
// par ComportementAncres. Présentés en pastilles.
export function QuestionsRapides({
  questions,
}: {
  questions: readonly { id: string; label: string; ancre: string }[];
}) {
  return (
    <nav id="votre-question" aria-labelledby="questions-titre" className="scroll-mt-24">
      <h2 id="questions-titre" className="text-xl font-extrabold tracking-tight text-foreground">
        Votre question ?
      </h2>
      <ul className="mt-3 flex flex-wrap gap-2.5">
        {questions.map((q) => (
          <li key={q.id}>
            <a
              href={`#${q.ancre}`}
              data-question={q.id}
              className="inline-flex min-h-[44px] items-center rounded-full border border-border-strong bg-surface px-4 py-2 text-sm font-semibold leading-snug text-foreground transition-colors hover:border-secondary hover:bg-surface-2"
            >
              {q.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function AutresQuestions() {
  return (
    <a
      href="#votre-question"
      className="no-print mt-1 inline-block text-xs font-semibold text-primary-dark underline"
    >
      ↑ Autres questions
    </a>
  );
}
