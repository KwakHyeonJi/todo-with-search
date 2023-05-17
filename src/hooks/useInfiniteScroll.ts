import { useEffect, useRef, useState } from 'react'

const useInfiniteScroll = <T extends HTMLElement>(
  onScrollEnd: () => void,
  length: number
) => {
  const [canScroll, setCanScroll] = useState(true)
  const containerRef = useRef<T | null>(null)

  useEffect(() => {
    const container = containerRef.current

    const handleScroll = () => {
      if (!container) {
        return
      }

      const { scrollHeight, scrollTop, clientHeight } = container
      if (canScroll && scrollTop + clientHeight >= scrollHeight) {
        onScrollEnd()
        setCanScroll(false)
      }
    }

    if (container) {
      container.addEventListener('scroll', handleScroll)

      return () => {
        if (container) {
          container.removeEventListener('scroll', handleScroll)
        }
      }
    }
  }, [canScroll, onScrollEnd])

  useEffect(() => {
    setCanScroll(true)
  }, [length])

  return containerRef
}

export default useInfiniteScroll
