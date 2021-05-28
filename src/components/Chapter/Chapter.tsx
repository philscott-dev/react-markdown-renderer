import { FC, useContext, useEffect, useState } from 'react'
import HTML, { IDoc } from 'html-parse-stringify'
import styled from '@emotion/styled'
import useIntersectionObserver from 'hooks/useIntersectionObserver'
import { ChapterContext } from './ChapterContext'

interface ChapterProps {
  elements: IDoc[]
  offsetTrigger?: number // controls when the table of context lights up
}

const Chapter: FC<ChapterProps> = ({ elements, offsetTrigger = -85 }) => {
  const [dangerousHtml, setDangerousHtml] = useState<{ __html: string }>({
    __html: '',
  })
  useEffect(() => {
    const __html = HTML.stringify(elements)
    setDangerousHtml({ __html })
  }, [elements])

  const { setActiveChapter } = useContext(ChapterContext)
  const id = elements[0].attrs.id || ''
  const trackingId = id + '-tracker' // encountered 1st to trigger the nav highlight
  const jumpToId = id // jump to ID - after the tracker to trigger higlighting properly
  const hasIntersected = useIntersectionObserver(`#${trackingId}`)
  setActiveChapter(hasIntersected, id)

  return (
    <Container className="markdown">
      <TrackingPixel id={trackingId} offsetTrigger={offsetTrigger} />
      <JumpPixel id={jumpToId} />
      <div dangerouslySetInnerHTML={dangerousHtml} />
    </Container>
  )
}

export default Chapter

const Container = styled.div`
  position: relative;
`
interface TrackingPixelProps {
  offsetTrigger: number
}

const TrackingPixel = styled.div<TrackingPixelProps>`
  position: absolute;
  background: transparent;
  top: ${({ offsetTrigger }) => offsetTrigger}px;
  width: 1px;
  height: 1px;
  background: red;
`

const JumpPixel = styled.div`
  position: absolute;
  background: transparent;
  top: -75px;
  width: 1px;
  height: 1px;
`
