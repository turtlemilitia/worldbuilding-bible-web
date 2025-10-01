import { Node, wrappingInputRule } from '@tiptap/core'
import { mergeAttributes } from '@tiptap/react'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    dmsEyesOnly: {
      /**
       * Set a blockquote node
       */
      setDmOnly: () => ReturnType
      /**
       * Toggle a blockquote node
       */
      toggleDmOnly: () => ReturnType
      /**
       * Unset a blockquote node
       */
      unsetDmOnly: () => ReturnType
    }
  }
}

export const inputRegex = /^\s*>\s$/

export const DMsEyesOnly = Node.create({
  name: 'dmsEyesOnly',
  topNode: true,
  group: 'block',
  content: 'block+',

  parseHTML() {
    return [
      {
        tag: `div[dm-eyes-only]`,
        priority: 51,
        getAttrs: (element) => {
          return {
            class: element.getAttribute('class'),
          }
        },
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes,
        { 'dm-eyes-only': '' }),
      0
    ]
  },

  addCommands() {
    return {
      setDmOnly:
        () =>
          ({ commands }) => {
            return commands.wrapIn(this.name)
          },
      toggleDmOnly:
        () =>
          ({ commands }) => {
            return commands.toggleWrap(this.name)
          },
      unsetDmOnly:
        () =>
          ({ commands }) => {
            return commands.lift(this.name)
          },
    }
  },

  addInputRules() {
    return [
      wrappingInputRule({
        find: inputRegex,
        type: this.type,
      }),
    ]
  },
})