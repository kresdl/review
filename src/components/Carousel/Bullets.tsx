import styled from '@emotion/styled';
import React, { MouseEventHandler } from 'react';
import { space, SpaceProps } from 'styled-system';
import { Stylable } from 'types';
import Bullet from './Bullet';

type Props = {
    length: number;
    onClick: (i: number) => void;
    index?: number | null;
    timeout: number;
};

const Stripe = styled.div({
    flexShrink: 0,
    lineHeight: 0,
    textAlign: 'center',
    cursor: 'default',
});

const Bullets: React.FC<Props & Stylable> = ({ length, onClick, index, timeout, className }) => {
    const block: MouseEventHandler = (evt) => {
        evt.stopPropagation();
        evt.preventDefault();
    };

    return (
        <Stripe className={className} onClick={block}>
            {[...Array(length)].map((_, i) => {
                return (
                <Bullet key={i} active={i === index} timeout={timeout} onClick={() => onClick(i)} />
            )})}
        </Stripe>
    );
};

export default styled(Bullets)<SpaceProps>(space);
