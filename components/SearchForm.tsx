import Form from "next/form";
import SearchFormReset from "@/components/SearchFormReset";
import { SearchIcon } from "lucide-react";

const SearchForm = () => {
  const query = "Teste";

  return (
    <Form action="/" scroll={false} className="search-form">
      <input
        name="query"
        defaultValue={query}
        placeholder="Pesquisar Startups..."
        className="search-input"
      />

      <div className="flex gap-2">
        {query && <SearchFormReset query={query} />}

        <button type="submit" className="search-btn text-white">
          <SearchIcon />
        </button>
      </div>
    </Form>
  );
};

export default SearchForm;
