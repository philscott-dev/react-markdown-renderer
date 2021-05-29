import { FC } from 'react'
import { NextPage } from 'next'
import styled from '@emotion/styled'
import { ChapterProvider, Content } from 'components/Chapter'
import { TableOfContents } from 'components/TableOfContents'
import { ProgressScrollbar } from 'components/ProgressScrollbar'
import markdown from 'contants/markdown'

const Index: FC<NextPage> = ({}) => {
  return (
    <>
      <ProgressScrollbar />
      <div id="tracking-pixel" />
      <ChapterProvider markdown={markdown}>
        <section style={{ display: 'flex' }}>
          <ChaptersContainer>
            <TableOfContents />
          </ChaptersContainer>
          <ContentContainer>
            <Content />
          </ContentContainer>
        </section>
      </ChapterProvider>
      <Footer />
    </>
  )
}

export default Index

/**
 * Components
 */

export const ChaptersContainer = styled.div`
  @media screen and (max-width: ${({ theme }) => theme.breakpoint.small}) {
    display: none;
  }
`

export const ContentContainer = styled.div`
  max-width: 1024px;
`

const Footer = styled.div`
  height: 800px;
  background: linear-gradient(135deg, blue 0%, lightblue 100%);
`
