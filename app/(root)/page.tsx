import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { StartupTypeCard } from "@/components/StartupCard";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const params = { search: query || null };

  const { data: startups } = await sanityFetch({ query: STARTUPS_QUERY, params });

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Crie sua startup,
          <br />
          conecte-se com programadores
        </h1>
        <p className="sub-heading !max-w-3xl">
          Envie ideias, vote e Ganhe reconhecimento!
        </p>
        <SearchForm />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Resultados para '${query}'` : "Mostrando Todas as Startups"}
        </p>

        <ul className="mt-7 card_grid">
          {startups?.length > 0 ? (
            startups.map((startup: StartupTypeCard) => (
                <StartupCard key={startup?._id} startup={startup} />
            ))
          ) : (
            <p className="no-results">
              Nenhuma startup cadastrada até o momento 🥲
            </p>
          )}
        </ul>
      </section>

      <SanityLive />
    </>
  );
}
