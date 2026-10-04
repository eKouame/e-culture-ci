// « Votre question ? » : de vrais liens d'ancre (ils fonctionnent même si le script
// ne se charge pas). Ouverture des accordéons, surbrillance et mesure sont gérées
// par ComportementAncres.
export function QuestionsRapides({
  questions,
}: {
  questions: readonly { id: string; label: string; ancre: string }[];
}) {
  return (
    <nav
      id="votre-question"
      aria-labelledby="questions-titre"
      className="scroll-mt-24"
    >
      <h2
        id="questions-titre"
        className="text-xs font-bold uppercase tracking-wide text-secondary-dark"
      >
        Votre question ?
      </h2>
      <ul className="mt-3 grid grid-cols-2 gap-2 sm:gap-2.5 md:grid-cols-3">
        {questions.map((q) => (
          <li key={q.id}>
            <a
              href={`#${q.ancre}`}
              data-question={q.id}
              className="flex h-full min-h-[44px] items-center rounded-xl border border-border bg-surface px-3 py-2.5 text-sm font-semibold leading-snug sm:px-4 text-secondary-dark transition-colors hover:border-primary hover:bg-primary-light"
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
