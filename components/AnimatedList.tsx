'use client'

import { useEffect, useRef } from 'react'
import anime from 'animejs'

interface AnimatedListProps {
  items: string[]
}

export default function AnimatedList({ items }: AnimatedListProps) {
  const listRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    if (listRef.current) {
      anime({
        targets: listRef.current.children,
        translateX: [-50, 0],
        opacity: [0, 1],
        delay: anime.stagger(100),
        duration: 800,
        easing: 'easeOutExpo'
      })
    }
  }, [items])

  return (
    <ul ref={listRef} className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-center opacity-0">
          <span className="text-green-500 mr-3">✓</span>
          {item}
        </li>
      ))}
    </ul>
  )
}
