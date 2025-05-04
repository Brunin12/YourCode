import { Suspense } from "react";
import { client } from "@/sanity/lib/client";
import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import markdownit from "markdown-it";
import Link from "next/link";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/Views";


const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const startup = await client.fetch(STARTUP_BY_ID_QUERY, { id });

  if (!startup) return notFound();

  const md = markdownit();
  const parsedContent = md.render(startup?.pitch || "");

  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <p className="tag">{formatDate(startup?._createdAt)}</p>

        <h1 className="heading">{startup.title}</h1>
        <p className="sub-heading !max-w-5xl">{startup.description}</p>
      </section>

      <section className="section_container">
        <img
          src={startup.image}
          alt="thumbnail"
          className="w-full h-auto rounded-xl"
        />

        <div className="space-y-5 mt-10 max-w-6xl mx-auto">
          <div className="flex-between gap-5">
            <Link
              href={`/user/${startup.author?._id}`}
              className="flex gap-2 items-center mb-3"
            >
              <Image
                src={startup.author.image}
                alt="avatar"
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg"
              />

              <div>
                <p className="text-[20px] font-medium">{startup.author.name}</p>
                <p className="text-[16px] font-semibold !text-black">
                  @{startup.author.username}
                </p>
              </div>
            </Link>

            <p className="startup-category-tag">{startup.category}</p>
          </div>
          <h3 className="text-30-bold">Proposta da Startup</h3>
          {parsedContent ? (
            <article dangerouslySetInnerHTML={{ __html: parsedContent }} />
          ) : (
            <p className="no-result">
              Detalhes indisponiveis
            </p>
          )}
        </div>

        <hr className="divider" />

        {/* TODO: SELECTED STARTUPS */}

        <Suspense fallback={<Skeleton className="view_skeleton" />}>
            <View id={id} />
        </Suspense>
      </section>
    </>
  );
};

export default Page;
