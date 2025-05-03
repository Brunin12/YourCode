"use client";

import { X } from "lucide-react";
import Link from "next/link";

const SearchFormReset = ({ query }: { query?: string }) => {
  const reset = () => {
    const form = document.querySelector(".search-form") as HTMLFormElement;

    if (form) form.reset();
  };

  return (
    <Link href="/" onClick={reset} className="search-btn text-white">
      <X />
    </Link>
  );
};

export default SearchFormReset;
