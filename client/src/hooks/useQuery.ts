import { useState, useMemo, useEffect, useCallback } from 'react';

interface UseQueryOptions<T, U> {
  variables: T;
  update?: (val: U) => void;
}

const useQuery = <T, U>(excutor: (options: T) => Promise<U>, options: UseQueryOptions<T, U>) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<U | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const refetch = useCallback(() => {
    setLoading(false);
    excutor(options.variables)
      .then(result => {
        setData(result);
        options.update?.(result);
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

export default useQuery;
