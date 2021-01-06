import { useCallback } from "react";
import { useMutation, useQueryClient } from "react-query";

const useOptimistic = <D>(
    cacheKey: any,
    asyncFn: (vars?: any) => Promise<D>,
    optimisticFn: (old: any, vars: any) => any,
    dependencies: any[]
) => {
    const queryClient = useQueryClient();
    const mutation = useMutation(asyncFn);

    return useCallback(
        async (vars: any) => {
            const oldData = queryClient.getQueryData(cacheKey, { exact: true });
            let result;
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
    ) as typeof asyncFn;
}

export default useOptimistic