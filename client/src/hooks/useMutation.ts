import { useState, useCallback } from 'react';

interface UseMutationOptions<T, U> {
  variables: T;
  update?: (val: U) => void;
}

const useMutation = <T, U>(excutor: (val: T) => Promise<U>, options: UseMutationOptions<T, U>) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<U | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const refetch = useCallback(
    (updateOptions?: UseMutationOptions<T, U>) => {
      setLoading(true);
      excutor(updateOptions?.variables || options.variables)
        .then(result => {
          setData(result);
          const update = updateOptions?.update || options.update;
          update?.(result);
        })
        .catch(err => setError(err))
        .finally(() => setLoading(false));
    },
    [excutor, options]
  );

  return [refetch, { loading, data, error }];
};

export default useMutation;
