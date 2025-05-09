"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { BadgePlus, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";

const AuthButtons = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <AuthButtonsSkeleton />;
  }

  if (status === "authenticated" && session?.user) {
    return (
      <div className="flex items-center gap-5">
        <Link href="/startup/create">
          <span className="max-sm:hidden">Criar Startup</span>
          <BadgePlus className="size-6 sm:hidden" />
        </Link>

        <button onClick={() => signOut()}>
          <span className="max-sm:hidden">Sair da Conta</span>
          <LogOut className="size-6 sm:hidden" />
        </button>

        <Link href={`/user/${session.id}`}>
          <Avatar className="size-10">
            <AvatarImage
              src={session.user.image || ""}
              alt={session.user.name || ""}
            />
            <AvatarFallback>AV</AvatarFallback>
          </Avatar>
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

export const AuthButtonsSkeleton = () => (
  <div className="flex gap-4 items-center">
    <Skeleton className="h-10 w-24 rounded" />
    <Skeleton className="h-10 w-10 rounded-full" />
  </div>
);

export default AuthButtons;
