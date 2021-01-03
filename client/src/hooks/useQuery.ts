import { useState, useRef, useEffect, useCallback } from 'react';

interface UseQueryOptions<T, U> {
  variables: T;
  update?: (val: U) => void;
}

export const useQuery = <T, U>(
  excutor: (options: T) => Promise<U>,
  options: UseQueryOptions<T, U>
) => {
  const execRef = useRef(excutor);
  const optionsRef = useRef(options);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<U | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const refetch = useCallback(() => {
    setLoading(false);
    execRef
      .current(optionsRef.current.variables)
      .then(result => {
        setData(result);
        optionsRef.current.update?.(result);
      })
      .catch(err => setError(err))
      .finally(() => {
        setLoading(false);
      });
  }, [excutor, options]);

  useEffect(() => {
    refetch();
  }, []);

  return { loading, error, refetch, data };
};
