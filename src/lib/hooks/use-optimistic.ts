import { useCallback, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useMounted } from "lib/hooks";

type Options = {
    skipInvalidate?: boolean,
}

type Config<D, T, V> = {
    asyncFn: (vars: V) => Promise<T>,
    optimisticFn: (old: D, vars: V) => D,
    opt?: Options
}

const useOptimistic = <D, T, V>(
    cacheKey: any,
    config: Config<D, T, V>,
    dependencies: any[],
) => {
    const mounted = useMounted()
    const [error, setError] = useState<string | null>(null)
    const queryClient = useQueryClient()
    const mutation = useMutation<T, Error, V, D>(config.asyncFn)

    return {
        mutate: useCallback(
            async (vars: V) => {
                queryClient.cancelQueries(cacheKey)
                const oldData = queryClient.getQueryData<D>(cacheKey, { exact: true })!
                queryClient.setQueryData(cacheKey, config.optimisticFn(oldData, vars))
                setError(null)

                try {
                    const result = await mutation.mutateAsync(vars)
                    return result

                } catch (err) {
                    queryClient.setQueryData(cacheKey, oldData)
                    mounted.current && setError(err.message)
                    throw err
                    
                } finally {
                    !config.opt?.skipInvalidate && queryClient.invalidateQueries(cacheKey)
                }
            },
            dependencies
        ),
        error
    }
}

export default useOptimistic