import TaskList from '@tiptap/extension-task-list'
import { mergeAttributes } from '@tiptap/react'

export const IdeaList = TaskList.extend({
  name: 'ideaList',

  parseHTML () {
    return [
      {
        tag: `ul[data-idea-list]`,
        priority: 51,
      },
    ]
  },

  renderHTML ({ HTMLAttributes }) {
    return [
      'ul',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes,
        { 'data-idea-list': '' }),
      0,
    ]
  },

  addOptions () {
    return {
      itemTypeName: 'ideaListItem',
      HTMLAttributes: {},
    }
  },
})