import { useLayoutEffect } from "react";

const useOnUIEvent = (target: EventTarget | React.RefObject<HTMLElement>, type: string, handler: (evt: Event) => void, dependencies: any[]) => {
    useLayoutEffect(() => {
        const tg = ('current' in target ? target.current : target) as EventTarget;
        let animationFrame: number | null;

        const onRedraw = () => {
            animationFrame = null;
        };

        const listener = (evt: Event) => {
            if (animationFrame) return;
            animationFrame = requestAnimationFrame(onRedraw);
            handler(evt)
        }

        tg.addEventListener(type, listener);

        return () => {
            animationFrame && cancelAnimationFrame(animationFrame);
            tg.removeEventListener(type, listener);
        };
    }, dependencies);
};

export default useOnUIEvent