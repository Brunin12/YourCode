'use client';

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

const AuthButtons = () => {
  const { data: session } = useSession();

  if (session?.user) {
    return (
      <div className="flex items-center gap-5">
        <Link href="/startup/create">
          <span>Criar Startup</span>
        </Link>

        <button onClick={() => signOut()}>
          <span>Sair da Conta</span>
        </button>

        <Link href={`/user/${session?.user?.id ?? ""}`}>
          <Image alt="foto de perfil" src={session?.user?.image ?? ""} width={35} height={35} className="rounded-4xl" />
        </Link>
      </div>
    );
  }

  return (
    <button onClick={() => signIn("github")}>
      <span>Entrar com GitHub</span>
    </button>
  );
};

export default AuthButtons;
