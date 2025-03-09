import { useRef } from "react";
import { useKey } from "../hooks/useKey";

// Definindo a interface para as props
interface SearchProps {
  query: string;
  setQuery: (query: string) => void;
}


const Search = ({ query, setQuery }: SearchProps) => {

  const inputEl = useRef<HTMLInputElement>(null);

  useKey("Enter", () => {
    if (document.activeElement === inputEl.current) return;
    if (inputEl.current) {
      inputEl.current.focus();
    }
    setQuery("");
  });


  return (
    <input
      className="justify-self-center border-none py-[1.1rem] px-[1.6rem] text-[1.8rem] rounded-[0.9rem] w-[40rem] transition duration-300 text-text bg-primary-light placeholder:text-text-dark focus:outline-none focus:shadow-[0_2.4rem_2.4rem_rgba(0,0,0,0.1)] focus:translate-y-[-2px]"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
};

export default Search;
