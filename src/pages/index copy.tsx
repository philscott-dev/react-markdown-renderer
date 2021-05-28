

const Index = () => {
  return (
    <ChapterProvider markdown={get(work, 'fields.entryContent', '')}>
      <Page css={globalPadding}>
        <BreadCrumbs />
        <Section>
          <ChaptersContainer>
            <TableOfContents />
          </ChaptersContainer>
          <ContentContainer css={contentContainerCss}>
            <Content />
          </ContentContainer>
          <SidebarContainer>
            <RecommendedContainer>
              <ResourceStackSmall
                title="Recommended Content"
                titleType="subtitle"
                shouldHideOnMobile={true}
              />
            </RecommendedContainer>
          </SidebarContainer>
        </Section>
      </Page>
      <Page css={globalPadding}>
        <BlockHeading title="Related Services" />
        <ServiceContainer>
          {relatedServices.map((service: any, index: number) => (
            <CardMedium
              key={index}
              href={`/services/${service.fields.slug}`}
              title={service.fields.title}
              paragraph={service.fields.excerpt}
            />
          ))}
        </ServiceContainer>
        <ContactCallout />
      </Page>
    </ChapterProvider>
  )
}
