import styled from '@emotion/styled';

type StyleProps = {
    active: boolean;
    timeout: number;
};

const Bullet = styled.div<StyleProps>(({ active, timeout }) => ({
    display: 'inline-block',
    width: 6,
    height: 6,
    backgroundColor: 'white',
    borderRadius: '50%',
    margin: '0 0.2rem',
    cursor: 'pointer',
    opacity: active ? 1 : 0.25,
    transition: `opacity ${timeout}ms`,
}));

export default Bullet;
