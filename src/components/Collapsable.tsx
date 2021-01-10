import React, { CSSProperties, useCallback, useRef } from 'react'
import { TransitionGroup, Transition } from 'react-transition-group'
import { TransitionStatus } from 'react-transition-group/Transition'
import { TransitionGroupProps } from 'react-transition-group/TransitionGroup'

type Indexed = {
  id: string
}

type HasClientHeight = {
  clientHeight: number | string
}

type TransitionStyles = Partial<Record<TransitionStatus, CSSProperties>>

const useCollapse = (duration: number | string) => {
  const styles = useRef<TransitionStyles | undefined>()

  const ref = useCallback((em: HasClientHeight | null) => {
    if (!em) return

    // Negative bottom margin to emulate collapsing/expanding behavior and shift content below upwards/downwards.
    const animate = {
      transitionProperty: 'opacity, margin-bottom',
      transitionDuration: String(duration) + (Number.isNaN(+duration) ? '' : 'ms')
    }

    const marginBottom = -em.clientHeight,
      position = 'relative',
      zIndex = -1

    styles.current = {
      entering: { opacity: 0, marginBottom, position, zIndex },
      entered: { opacity: 1, marginBottom: 0, ...animate },
      exiting: { opacity: 0, marginBottom, position, zIndex, ...animate },
      exited: { opacity: 0, marginBottom, position, zIndex }
    }
  }, [duration])

  return { styles, ref }
}

type Props<T> = React.PropsWithoutRef<TransitionGroupProps> & {
  items?: T[],
  duration: number | string,
  children: (item: T, style: CSSProperties | undefined, ref: (em: HasClientHeight | null) => void) => React.ReactNode,
}

const Collapsable = <T extends Indexed>({ items, children, duration, ...rest }: Props<T>): React.ReactElement => {
  const { styles, ref } = useCollapse(duration)

  return (
    <TransitionGroup {...rest} id="ul" component="ul">
      {
        items?.map(item =>
          <Transition key={item.id} timeout={{ appear: +duration, exit: +duration }}>
            {
              state => children(item, styles.current?.[state], ref)
            }
          </Transition>
        )
      }
    </TransitionGroup>
  )
}

export default Collapsable
