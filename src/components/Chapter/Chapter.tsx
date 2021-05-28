import { FC, useContext, useEffect, useState } from 'react'
import HTML, { IDoc } from 'html-parse-stringify'
import styled from '@emotion/styled'
import useIntersectionObserver from 'hooks/useIntersectionObserver'
import { ChapterContext } from './ChapterContext'

interface ChapterProps {
  elements: IDoc[]
}

const Chapter: FC<ChapterProps> = ({ elements }) => {
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
      <TrackingPixel id={trackingId} />
      <JumpPixel id={jumpToId} />
      <div dangerouslySetInnerHTML={dangerousHtml} />
    </Container>
  )
}

export default Chapter

const Container = styled.div`
  position: relative;
`

const TrackingPixel = styled.div`
  position: absolute;
  background: transparent;
  top: -85px;
  width: 1px;
  height: 1px;
`

const JumpPixel = styled.div`
  position: absolute;
  background: transparent;
  top: -75px;
  width: 1px;
  height: 1px;
`