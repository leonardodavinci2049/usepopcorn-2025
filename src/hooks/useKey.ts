import { useEffect } from "react";

type UseKeyProps = {
  key: string;
  onCloseMovie: (id: string) => void;
};

export function useKey({key, onCloseMovie}: UseKeyProps): void {
  useEffect(
    function () {
      function callback(e: KeyboardEvent) {
        if (e.key.toLowerCase() === key.toLowerCase()) {
          onCloseMovie('');
        }
      }

      document.addEventListener("keydown", callback);

      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [onCloseMovie, key]
  );
}
