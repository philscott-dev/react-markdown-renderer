import React, { FC, useState, useEffect } from 'react'
import HTML, { IDoc } from 'html-parse-stringify'
import marked from 'marked'

export const ChapterContext = React.createContext<{
  chapters: string[]
  activeChapter: string
  docs: IDoc[][]
  setActiveChapter: (isActive: boolean, chapter: string) => void
}>({
  chapters: [],
  activeChapter: '',
  docs: [],
  setActiveChapter: () => {},
})

interface ContextProps {
  children?: any
  markdown: string
}

type Chapter = string | undefined

const ChapterProvider: FC<ContextProps> = ({ children, markdown }) => {
  const [chapters, setChapters] = useState<string[]>([])
  const [readChapters, setReadChapters] = useState<Chapter[]>([])
  const [activeChapter, updateActiveChapter] = useState<string>('')
  const [docs, setDocs] = useState<IDoc[][]>([])

  //parse the chapters from the markdown to send to component
  useEffect(() => {
    const html = marked(markdown, {
      smartypants: true,
    })
    const output = HTML.parse(html) as IDoc[]
    const array = output.reduce<IDoc[][]>((acc, obj) => {
      // if a non html tag was parsed, return
      if (obj.type !== 'tag') return acc

      // use h2 tags as chapters
      if (obj.name === 'h2') {
        return [...acc, [obj]]
      }
      const length = acc.length
      const nested = acc[length - 1] ? [...acc[length - 1]] : []

      const next = [...acc.slice(0, length - 1), [...nested, obj]]
      return next
    }, [])

    setDocs(array)

    const chapter = array.map((chapter) => chapter[0].attrs.id || '')
    if (chapter.length) {
      setChapters(chapter || [])
    }
  }, [markdown, setDocs, setChapters])

  //as read chapters changes, update the active chapter
  useEffect(() => {
    const last = readChapters[readChapters.length - 1]
    if (last) {
      updateActiveChapter(last)
    }
  }, [readChapters])

  const setActiveChapter = (isActive: boolean, chapter: string) => {
    const index = readChapters.indexOf(chapter)
    // if true, just set the chapter name
    if (isActive && index < 0) {
      const chapterIndex = chapters.indexOf(chapter)
      setReadChapters([
        ...readChapters.slice(0, chapterIndex),
        chapter,
        ...readChapters.slice(chapterIndex + 1),
      ])
    } else if (!isActive && index >= 0) {
      setReadChapters([
        ...readChapters.slice(0, index),
        ...readChapters.slice(index + 1),
      ])
    }
  }

  return (
    <ChapterContext.Provider
      value={{
        chapters,
        docs,
        activeChapter,
        setActiveChapter,
      }}
    >
      {children}
    </ChapterContext.Provider>
  )
}

export default ChapterProvider
