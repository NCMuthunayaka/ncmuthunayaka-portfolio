import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'
import { schemaTypes } from './schemaTypes/index.js'
const projectId = process.env.SANITY_STUDIO_PROJECT_ID
if (!projectId) throw new Error('Set SANITY_STUDIO_PROJECT_ID and SANITY_STUDIO_DATASET before starting Studio.')
export default defineConfig({
  name: 'portfolio', title: 'Portfolio Studio', projectId,
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  plugins: [structureTool({ structure: (S, context) => S.list().title('Content').items([
    S.listItem().title('Profile').id('profile').child(S.document().schemaType('profile').documentId('profile')),
    orderableDocumentListDeskItem({ type: 'project', S, context }),
    ...S.documentTypeListItems().filter(item => !['profile', 'project'].includes(item.getId())),
  ]) })],
  schema: { types: schemaTypes, templates: templates => templates.filter(t => t.schemaType !== 'profile') },
  document: { actions: (actions, context) => context.schemaType === 'profile' ? actions.filter(a => !['duplicate', 'delete'].includes(a.action)) : actions },
})
