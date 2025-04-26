import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
// import { myStructure } from './deskStructure'

export default defineConfig({
  name: 'default',
  title: 'ecom',

  projectId: 'sw7ekczt',
  dataset: 'production',

  plugins: [structureTool({
    structure: (S) =>
      S.list()
        .title('محتوى المتجر')
        .items([
          S.listItem()
            .title('المنتجات')
            .schemaType('product')
            .child(
              S.documentTypeList('product').title('المنتجات')
            ),
          S.listItem()
            .title('البانرات')
            .schemaType('banner')
            .child(
              S.documentTypeList('banner').title('البانرات')
            ),
          S.listItem()
            .title('الطلبات')
            .schemaType('order')
            .child(
              S.documentTypeList('order').title('الطلبات')
            ),
          ...S.documentTypeListItems().filter(
            (listItem) =>
              !['product', 'banner', 'order'].includes(
                listItem.getId()
              )
          ),
        ]),
  }), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
