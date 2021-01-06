import React from 'react';
import Ctrl from './Ctrl';
import Bullets from './Bullets';
import useAdapter from './use-adapter';
import styled from '@emotion/styled';
import touchDetect from './touch-detect';
import fwdIcon from './fwd.svg';
import backIcon from './back.svg'
import { Stylable } from 'types'

const isTouchDevice = touchDetect();

const f2p = (...vals: number[]) => vals.map(val => 100 * val + '%')

const YFlex = styled.div({
    display: 'flex',
    flexDirection: 'column',
})

const XFlex = styled.div({
    display: 'flex',
    height: '100%',
    flexGrow: 1,
    flexShrink: 0,
    alignItems: 'center',
})

const Frame = styled.div({
    height: '100%',
    flexGrow: 1,
    flexShrink: 0,
    position: 'relative',
});

const Svg = styled.svg({
    width: '100%',
});

type NodeFactory = (index: number) => React.ReactNode;

type Props = {
    images: string[];
    h?: number;
    shift?: number;
    timeout?: number;
    swipeTimeout?: number;
    interval?: number | null;
    height?: number;
    children?: React.ReactNode | NodeFactory;
};

const Carousel: React.FC<Props & Stylable> = ({
    shift = 0.2, timeout = 750, swipeTimeout = 300, interval = null, images, children, className, h }) => {

    const {
        keys, onFwd, onBack, onJump, index, prev, state, ref,
    } = useAdapter(images, timeout, swipeTimeout, interval, shift),

        hasChildFactory = typeof children === 'function',
        url = images[index],
        oldUrl = typeof prev === 'number' ? images[prev] : undefined,
        [mx, mw, ax, bx] = f2p(state?.mask.x || 0, state?.mask.width || 0, state?.a.x || 0, state?.b.x || 0),
        [a, b] = keys,

        left = <Ctrl mr="0.2rem" src={backIcon} onClick={onBack} />,
        rgt = <Ctrl ml="0.2rem" src={fwdIcon} onClick={onFwd} />,
        stripe = <Bullets mt="0.5rem" length={images.length} index={index} timeout={timeout} onClick={onJump} />,

        frame = (
            <Frame ref={ref}>
                <Svg xmlns="http://www.w3.org/2000/svg" width="100" height={h}>
                    <defs>
                        <mask id="mask" x="0" y="0" width="100%" height="100%">
                            <rect fill="white" x={mx} y="0" width={mw} height="100%" />
                        </mask>
                    </defs>
                    <image key={a} x={ax} y="0" width="100%" height="100%" href={url} preserveAspectRatio="xMidYMid slice" />
                    <image key={b} x={bx} y="0" width="100%" height="100%" href={oldUrl} mask="url(#mask)" preserveAspectRatio="xMidYMid slice" />
                    {!hasChildFactory && children}
                </Svg>
            </Frame>
        ),

        content = isTouchDevice ? frame : [left, frame, rgt];

    return (
        <YFlex className={className}>
            <XFlex>{content}</XFlex>
            {stripe}
        </YFlex>
    );

};

export default Carousel;