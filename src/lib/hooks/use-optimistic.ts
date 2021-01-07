import { useCallback, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useMounted } from "lib/hooks";

type Options = {
    skipInvalidate?: boolean,
    rethrow?: boolean,
}

const useOptimistic = <D, T, V>(
    cacheKey: any,
    asyncFn: (vars: V) => Promise<T>,
    optimisticFn: (old: D, vars: V) => D,
    dependencies: any[],
    opt?: Options
) => {
    const mounted = useMounted()
    const [error, setError] = useState<string | null>(null)
    const queryClient = useQueryClient()
    const mutation = useMutation<T, Error, V, D>(asyncFn)

    return {
        mutate: useCallback(
            async (vars: V) => {
                queryClient.cancelQueries(cacheKey)
                const oldData = queryClient.getQueryData<D>(cacheKey, { exact: true })!
                try {
                    queryClient.setQueryData(cacheKey, optimisticFn(oldData, vars))
                    const result = await mutation.mutateAsync(vars)
                    return result
                } catch (err) {
                    queryClient.setQueryData(cacheKey, oldData)
                    mounted.current && setError(err.message)
                    if (opt?.rethrow) throw err
                } finally {
                    if (!opt || !opt.skipInvalidate) queryClient.invalidateQueries(cacheKey)
                }
            },
            dependencies
        ),
        error
    }
}

export default useOptimistic