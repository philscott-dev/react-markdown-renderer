import get from 'lodash/get'
import { FC, useContext } from 'react'
import styled from '@emotion/styled'
import { ChapterContext } from '../Chapter'
import offset from '../../helpers/offset'
import getConfig from 'next/config'

const {
  publicRuntimeConfig: { hostname },
} = getConfig()

interface TableOfContentsProps {
  onMouseDown?: () => void
}

const TableOfContents: FC<TableOfContentsProps> = ({}) => {
  const { activeChapter, chapters, docs } = useContext(ChapterContext)

  // animation
  const handleChapterSelect = (id: string) => {
    const { top } = offset(id)
    const scrollOptions: ScrollToOptions = {
      top,
      behavior: 'smooth',
    }

    window.scrollTo(scrollOptions)
  }

  return (
    <Menu>
      <p>
        TABLE OF CONTENTS
      </p>
      {chapters && chapters.length
        ? chapters.map((chapter, index) => {
            //get the real chapter name from docs array
            const chapterName = get(
              docs[index],
              '[0].children[0].content',
              `Chapter ${index + 1}`,
            ).replace('&amp;', '&')
            return (
              <Chapter
                key={chapter}
                onMouseDown={() => handleChapterSelect(chapter)}
              >
                {chapter !== activeChapter ? (
                  <Link>{chapterName}</Link>
                ) : (
                  <Highlight>{chapterName}</Highlight>
                )}
              </Chapter>
            )
          })
        : null}
    </Menu>
  )
}

const Menu = styled.div`
  position: sticky;
  top: 90px;
`

const Link = styled.a`
  margin: 0;
  cursor: pointer;
`

const Highlight = styled.p`
  margin: 0;
  color: blue;
  cursor: pointer;
`

const Chapter = styled.button`
  display: block;
  padding: 0;
  margin: 0;
  margin-bottom: 8px;
  background: transparent;
  outline: none;
  border: none;
  & > p {
    &:hover {
      color: ${({ theme }) => theme.color.orange};
    }
  }
`

export default TableOfContents
