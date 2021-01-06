import React, { memo } from 'react';
import styled from '@emotion/styled';
import { MouseEventHandler } from 'react';
import { space, SpaceProps } from 'styled-system';

const Icon = styled.div<{ src: string }>(p => ({
    flexShrink: 0,
    width: 25,
    height: 25,
    zIndex: 1,
    cursor: 'pointer',
    backgroundImage: `url(${p.src})`,
    backgroundSize: '100%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
}));

type Props = {
    src: string;
    onClick: MouseEventHandler<HTMLDivElement>;
};

const Ctrl: React.FC<Props> = (props) => (
    <Icon {...props} />
);

export default styled(Ctrl)<SpaceProps>(space);
