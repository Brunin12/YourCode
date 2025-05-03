'use client';

import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans text-black font-medium">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={144} height={30} priority />
        </Link>

        <div className="flex items-center gap-5">
          {session?.user ? (
            <>
              <Link href="/startup/create">
                <span>Criar Startup</span>
              </Link>

              <button onClick={() => signOut()}>
                <span>Sair da Conta</span>
              </button>

              <Link href={`/user/${session?.user?.id ?? ""}`}>
                <Image alt="foto de perfil" src={session?.user?.image ?? ""} width={35} height={35} className="rounded-4xl" />								
              </Link>
            </>
          ) : (
            <button onClick={() => signIn("github")}>
              <span>Entrar com GitHub</span>
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
