import { useEffect, useRef } from 'react'
import anime from 'animejs'

export function useAnime(config: anime.AnimeParams, deps: any[] = []) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (ref.current) {
      anime({
        targets: ref.current,
        ...config
      })
    }
  }, deps)

  return ref
}
