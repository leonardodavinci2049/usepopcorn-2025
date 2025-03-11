import { useEffect, useState } from "react";

const KEY = import.meta.env.VITE_API_KEY; // Para Vite

const useMovies = (query: string) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Definir estado inicial para cada nova busca
    setMovies([]);
    setError("");

    // O objetivo é cancelar a requisição anterior se uma nova for feita
    const controller = new AbortController();

    const fetchMovies = async () => {
      try {
            // Definir isLoading como true ANTES de qualquer outra operação
            setIsLoading(true);
            
        // Adicionando um pequeno atraso para garantir que o estado de carregamento seja renderizado
        if (query.length >= 3) {
          // Aguardar um momento para a UI mostrar o estado de carregamento
       //   await new Promise(resolve => setTimeout(resolve, 150));    

        console.log("====== AAAAAA ===========");

        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );

        if (!res.ok)
          throw new Error("Something went wrong with fetching movies");

        const data = await res.json();
        if (data.Response === "False") throw new Error("Movie not found");

        setMovies(data.Search);
        setError("");

        console.log("====== BBBBBBBBBB  ===========");
      }
      } catch (err: unknown) {
        const errorCatch = err as Error;
        // é necessário verificar se o erro é um AbortError porque usamos o abort controller e não é necessário exibir o erro
        if (errorCatch.name !== "AbortError") {
          console.log(errorCatch.message);
          setError(errorCatch.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    fetchMovies();

    return function () {
      controller.abort();
    };
  }, [query]);

  return { movies, isLoading, error };
};

export default useMovies;
