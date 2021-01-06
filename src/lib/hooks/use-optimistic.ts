import { useCallback } from "react";
import { MutationFunction, useMutation, useQueryClient } from "react-query";

const useOptimistic = <P = unknown, V = unknown, D = unknown, C = unknown>(
    cacheKey: any,
    asyncFn: MutationFunction<D, V>,
    optimisticFn: (old: P, vars: V) => C,
    dependencies: any[]
) => {
    const queryClient = useQueryClient();
    const mutation = useMutation(asyncFn);

    return useCallback(
        async (vars: V) => {
            const oldData = queryClient.getQueryData(cacheKey, { exact: true }) as P;
            let result: D;
            try {
                queryClient.setQueryData(cacheKey, optimisticFn(oldData, vars))
                result = await mutation.mutateAsync(vars);
            } catch (err) {
                queryClient.setQueryData(cacheKey, oldData);
                throw err;
            } finally {
                queryClient.invalidateQueries(cacheKey);
            }
            return result;
        },
        dependencies
    );
}

export default useOptimistic