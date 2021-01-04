import { useEffect, useRef } from "react";

type Static = {
    touchPrev?: [number, number] | null;
    touch?: [number, number] | null;
};

const useSwipe = <T extends HTMLDivElement>(ref: React.RefObject<T>, onSwipe: (swipe: [number, number]) => void) => {
    const mem = useRef<Static>({}).current;

    useEffect(
        () => {
            const onTouchStart = (evt: TouchEvent) => {
                const { clientX: x, clientY: y } = evt.touches[0];
                mem.touchPrev = [x, y];
                mem.touch = [x, y];
            }
    
            const onTouchMove = (evt: TouchEvent) => {
                if (!mem.touch) return;
                const [xp, yp] = mem.touch!;
                const { clientX: x, clientY: y } = evt.touches[0];
                const xd = Math.abs(x - xp!);
                const yd = Math.abs(y - yp!);
                if (xd > yd) {
                    mem.touchPrev = mem.touch;
                    mem.touch = [x, y];
                    evt.preventDefault();
                    evt.returnValue = false;
                    return false;
                } else {
                    mem.touch = null;
                }
            }
    
            const onTouchEnd = () => {
                if (!mem.touch) return;
                const [x1, y1] = mem.touchPrev!;
                const [x2, y2] = mem.touch!;
                const xd = x2! - x1!;
                const yd = y2! - y1!;
                onSwipe([xd, yd]);
            }

            const em = ref.current!;
            em.addEventListener('touchstart', onTouchStart);
            em.addEventListener('touchmove', onTouchMove, { passive: false });
            em.addEventListener('touchend', onTouchEnd);

            return () => {
                em.removeEventListener('touchstart', onTouchStart);
                em.removeEventListener('touchmove', onTouchMove);
                em.removeEventListener('touchend', onTouchEnd);
            };
        },
        []
    );
}

export default useSwipe;

