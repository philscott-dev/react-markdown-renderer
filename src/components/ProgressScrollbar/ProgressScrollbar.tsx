import { useRef, useEffect } from 'react'
import styled from '@emotion/styled'
import useIntersectionObserver from '../../hooks/useIntersectionObserver'

const ProgressScrollbar = () => {
  const ref = useRef<HTMLDivElement>(null)
  const isVisible = useIntersectionObserver('#tracking-pixel')
  useEffect(() => {
    function handleScroll() {
      var winScroll =
        document.body.scrollTop || document.documentElement.scrollTop
      var height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight
      var scrolled = (winScroll / height) * 100
      if (ref.current) {
        ref.current.style.width = scrolled + '%'
      }
    }
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  })

  if (!isVisible) return null

  return (
    <Bar>
      <Progress ref={ref} />
    </Bar>
  )
}

const BAR_SIZE: number = 6

const Bar = styled.div`
  position: fixed;
  top: 0;
  z-index: 1000000000;
  width: 100%;
  background: ${({ theme }) => theme.color.white};
  width: 100%;
  height: ${BAR_SIZE}px;
`

const Progress = styled.div`
  height: ${BAR_SIZE}px;
  background: linear-gradient(135deg, blue 0%, lightblue 100%);
  width: 0%;
`

export default ProgressScrollbar
