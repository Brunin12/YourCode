import { auth } from "@/auth";
import StartupForm from "@/components/StartupForm";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth();
  if (!session) redirect("/");

  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <h1 className="heading">Crie sua Startup</h1>
        <p className="sub-heading !max-w-5xl">Preencha os campos a seguir:</p>
      </section>

      <StartupForm />
    </>
  );
};

export default Page;
