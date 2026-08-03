import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | e-Culture CI",
};

const FAQ = [
  {
    q: "Qui est exempté de licence et de caution bancaire ?",
    a: "D'après l'article 10 du décret de 2021, les organisateurs occasionnels dont l'événement a un but socio-éducatif, sportif, philanthropique ou de promotion de la culture locale (mariage, funérailles, fête de quartier, tournoi, festival régional, sensibilisation, etc.) sont exemptés de licence et de caution bancaire. C'est le cas de la majorité des promoteurs du pays profond.",
  },
  {
    q: "Si je suis exempté, dois-je quand même faire quelque chose ?",
    a: "Oui : une déclaration gratuite et rapide (3 minutes) via le module « Déclaration Express ». Elle permet à l'État de disposer de statistiques fiables sur le secteur informel, et vous obtenez un récépissé numérique à présenter en mairie ou préfecture pour légitimer votre événement.",
  },
  {
    q: "Combien coûte la licence pour les professionnels ?",
    a: "5 000 000 FCFA pour la licence, plus 5 000 000 FCFA de caution bancaire de garantie, soit 10 000 000 FCFA au total. La caution est versée à un établissement bancaire, pas directement au ministère — c'est une garantie, pas une taxe.",
  },
  {
    q: "Est-ce vrai que tout le monde doit payer jusqu'à 10 millions de FCFA ?",
    a: "Non, c'est une rumeur infondée. Ce montant ne concerne que les 10 à 30 % d'acteurs dont le spectacle est l'activité professionnelle principale. Les organisateurs occasionnels à but socio-éducatif ou culturel en sont exemptés.",
  },
  {
    q: "Pourquoi dois-je m'immatriculer au ministère ?",
    a: "L'immatriculation transforme les acteurs isolés — souvent regroupés informellement sur des groupes WhatsApp — en interlocuteurs officiels et reconnus. Elle est indispensable pour participer aux politiques publiques du secteur et bénéficier d'un accompagnement.",
  },
  {
    q: "Qu'est-ce que le parrainage (Licence B) ?",
    a: "Un promoteur qui débute doit réaliser 5 spectacles sous la supervision d'un professionnel déjà titulaire d'une licence, avant de pouvoir opérer en toute autonomie. Le module Mentorat vous met en relation avec un professionnel licencié pour vous accompagner.",
  },
  {
    q: "Les résultats du test « Suis-je concerné ? » sont-ils officiels ?",
    a: "Non, ils sont indicatifs. Ils vous donnent une orientation rapide basée sur vos réponses, mais seule l'administration peut rendre une décision officielle sur votre dossier.",
  },
];

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <p className="text-sm font-semibold text-primary">Centre de ressources</p>
      <h1 className="mt-1 text-3xl font-extrabold text-foreground">
        Questions fréquentes
      </h1>

      <div className="mt-6 flex flex-col gap-3">
        {FAQ.map((item) => (
          <details
            key={item.q}
            className="group rounded-xl border border-border bg-surface p-4 open:shadow-sm"
          >
            <summary className="cursor-pointer list-none text-sm font-semibold text-foreground marker:content-none">
              <span className="flex items-center justify-between gap-3">
                {item.q}
                <span className="shrink-0 text-primary transition-transform group-open:rotate-45">
                  +
                </span>
              </span>
            </summary>
            <p className="mt-2.5 text-sm text-muted">{item.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
