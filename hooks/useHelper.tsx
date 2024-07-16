import { useCallback } from 'react';

export default function useHelper() {
  const $ = useCallback(
    (query: string) => document.querySelector(query) as HTMLDivElement,
    []
  );
  const $$ = useCallback(
    (query: string) =>
      document.querySelectorAll(query) as NodeListOf<HTMLDivElement>,
    []
  );
  return { $, $$ };
}
