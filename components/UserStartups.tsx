import { client } from "@/sanity/lib/client";
import { STARTUPS_BY_AUTHOR_QUERY } from "@/sanity/lib/queries";
import React from "react";
import StartupCard, { StartupTypeCard } from "./StartupCard";

const UserStartups = async ({ id }: { id: string }) => {
  const startups: StartupTypeCard[] = await client.fetch(STARTUPS_BY_AUTHOR_QUERY, { id });

  return (
    <>
      {startups.length > 0 ? (
        startups.map((startup) => (
          <StartupCard key={startup._id} startup={startup} />
        ))
      ) : (
        <p className="no-result">Sem Startups por enquanto...</p>
      )}
    </>
  );
};

export default UserStartups;
