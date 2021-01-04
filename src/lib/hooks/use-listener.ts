import { useEffect } from "react";

const useListener = (target: EventTarget, type: string, handler: (evt: Event) => void, dependencies: any[]) => {
    useEffect(() => {
        target.addEventListener(type, handler);

        return () => {
            target.removeEventListener(type, handler);
        }
    }, dependencies);
}

export default useListener