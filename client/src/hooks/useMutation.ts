import { useState, useCallback, useRef } from 'react';

interface UseMutationOptions<T, U> {
  variables: T;
  update?: (val: U) => void;
}

export const useMutation = <T, U>(
  excutor: (val: T) => Promise<U>,
  options?: UseMutationOptions<T, U>
): [
  (updateOptions?: UseMutationOptions<T, U>) => void,
  { loading: boolean; data: U | null; error: Error | null }
] => {
  const excutorRef = useRef(excutor);
  const optionsRef = useRef(options);

  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<U | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const refetch = useCallback((updateOptions?: UseMutationOptions<T, U>) => {
    if (updateOptions) {
      optionsRef.current = updateOptions;
    }
    setLoading(true);
    excutorRef
      .current(optionsRef.current?.variables as T)
      .then(result => {
        setData(result);
        const update = optionsRef.current?.update;
        setLoading(false);
        update?.(result);
      })
      .catch(err => {
        setLoading(false);
        setError(err);
      });
  }, []);

  return [refetch, { loading, data, error }];
};
