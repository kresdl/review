import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useSwipe } from 'lib/hooks';
import { useMounted, useOnUIEvent } from 'lib/hooks';
import animate from './animate';
import { useAnimation } from 'lib/hooks';

type Static = {
    index: number;
    keys: [string, string];
    prev?: number | null;
    task?: number | null;
    reverse?: boolean;
    inView?: boolean;
    time?: number;
    refs?: HTMLImageElement[];
    playing?: boolean;
}

const useAdapter = (images: string[], timeout: number, swipeTimeout: number, interval: number | null, shift: number) => {
    if (interval && timeout > interval) throw Error('"timeout" cannot be bigger than "interval"');

    const mounted = useMounted()
    const { current: mem } = useRef<Static>({ 
        index: 0,
        keys: ['a', 'b'] 
    })
    const key = images.join('@');
    const urls = useMemo(() => images, [key]);

    const offs = (offset: number) => (mem.index! + urls.length + offset) % urls.length;

    const check = (i?: number) =>
        mounted.current
        && mem.inView
        && !mem.playing
        && (typeof i === 'undefined' || i !== mem.index);

    const nav = async (i: number, reverse = false, time = timeout) => {
        if (!check(i)) return;
        const [a, b] = mem.keys!;

        Object.assign(mem, {
            reverse,
            index: i,
            prev: mem.index,
            keys: [b, a],
            time,
        });

        play(time)
    };

    const fwd = (time = timeout) => {
        nav(offs(1), false, time)
    };

    const back = (time = timeout) => {
        nav(offs(-1), true, time);
    };

    const cancel = () => {
        if (mem.task) {
            clearInterval(mem.task);
            mem.task = null;
        }
    };

    const schedule = () => {
        cancel();
        if (interval) {
            mem.task = window.setInterval(fwd, interval);
        }
    };

    const isInView = () => {
        const em = ref.current;
        if (!em) return false;
        const r = em.getBoundingClientRect();
        return (r.y < window.innerHeight && r.y + r.height > 0);
    };

    const click = (i: number, reverse: boolean, evt?: React.MouseEvent) => {
        if (evt) {
            evt.stopPropagation();
            evt.preventDefault();
        }
        cancel();
        nav(i, reverse);
    }

    const onFwd = useCallback(
        (evt: React.MouseEvent) => click(offs(1), false, evt), []
    )

    const onBack = useCallback(
        (evt: React.MouseEvent) => click(offs(-1), true, evt), []
    )

    const onJump = useCallback(
        (i: number) => click(i, i < mem.index!), []
    )

    const onSwipe = useCallback(
        ([x]: [Number, number]) => {
            if (!x) return;
            cancel();
            if (x > 0) back(swipeTimeout);
            else fwd(swipeTimeout);
        },
        [swipeTimeout]
    )

    const ref = useRef<HTMLDivElement>(null);

    const focus = () => {
        schedule();
        cache();
    };

    const cache = () => urls.map(url => {
        const img = new Image();
        img.src = url;
        return img;
    });

    useOnUIEvent(window, 'scroll', () => {
        let inView = isInView();
        if (inView && !mem.inView) schedule();
        if (!inView) cancel();
        mem.inView = inView;
    }, []);

    useEffect(() => {
        window.addEventListener('focus', focus);
        window.addEventListener('blur', cancel);
        mem.inView = isInView();
        schedule();

        return () => {
            window.removeEventListener('focus', focus);
            window.removeEventListener('blur', cancel);
            cancel();
        }
    }, []);
    
    useEffect(() => {
        Object.assign(mem, {
            index: 0,
            prev: null,
            keys: ['x', 'y'],
            refs: cache(),
        });

        stop();
    }, [urls]);

    useSwipe(ref, onSwipe);

    const { cursor, playing, play, stop } = useAnimation()
    mem.playing = playing;

    return {
        state: playing 
            ? animate(cursor!, shift, mem.reverse)
            : null,
        ref, onFwd, onBack, onJump, ...mem,
    };
};

export default useAdapter;
