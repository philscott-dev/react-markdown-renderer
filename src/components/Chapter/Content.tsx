import { FC, useContext, Fragment } from 'react'
import Chapter from './Chapter'
import { ChapterContext } from './ChapterContext'

interface ContentProps {}

const Content: FC<ContentProps> = ({}) => {
  const { docs } = useContext(ChapterContext)

  return (
    <div style={{ marginLeft: 32 }}>
      {docs.map((elements, index) => {
        return (
          <Fragment key={index}>
            <Chapter key={`$chapter-${index}`} elements={elements} />
          </Fragment>
        )
      })}
    </div>
  )
}

export default Content
