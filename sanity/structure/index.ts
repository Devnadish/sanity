import { DefaultDocumentNodeResolver } from 'sanity/structure'
import Iframe from 'sanity-plugin-iframe-pane'
import type { IframeOptions } from 'sanity-plugin-iframe-pane'
import { SanityDocument } from 'sanity'

// Customize this configuration with your own document types
export const getDefaultDocumentNode: DefaultDocumentNodeResolver = (
  S,
  { schemaType }
) => {
  switch (schemaType) {
    case `post`:
      return S.document().views([
        S.view.form(),
        S.view
          .component(Iframe)
          .options({
            url: (doc: SanityDocument) => {
              const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000'
              const slug = doc?.slug?.current
              return slug ? `${baseUrl}/posts/${slug}` : baseUrl
            },
            defaultSize: `desktop`, // default `desktop`
            reload: {
              button: true, // default `undefined`
            },
            attributes: {
              allow: 'fullscreen' // string, optional
            }
          } as IframeOptions)
          .title('Preview')
      ])
    default:
      return S.document().views([S.view.form()])
  }
}