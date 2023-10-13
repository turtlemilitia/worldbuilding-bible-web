import { expectDomTypeError } from '@milkdown/exception'
import { listItemSchema } from '@milkdown/preset-commonmark'
import ReactDOM from "react-dom"
import IdeaCheckbox from "../../components/Elements/Idea";
import {$inputRule} from "@milkdown/utils";
import { InputRule } from '@milkdown/prose/inputrules'

export const extendListItemSchemaForIdea = listItemSchema.extendSchema((prev) => {
  return (ctx) => {
    const baseSchema = prev(ctx)
    return {
      ...baseSchema,
      attrs: {
        ...baseSchema.attrs,
        listType: {
          default: 'idea',
        },
      },
      parseDOM: [
        {
          tag: 'li[data-item-type="idea"]',
          getAttrs: (dom) => {
            if (!(dom instanceof HTMLElement))
              throw expectDomTypeError(dom)

            return {
              label: dom.dataset.label,
              listType: dom.dataset['list-type'],
              spread: dom.dataset.spread,
            }
          },
        },
        ...baseSchema?.parseDOM || [],
      ],
      toDOM: (node) => {
        if (baseSchema.toDOM && node.attrs.listType !== 'idea')
          return baseSchema.toDOM(node)

        let dom = document.createElement("div")

        ReactDOM.render(<IdeaCheckbox/>, dom)

        return [
          'li',
          {
            'data-item-type': 'task',
            'data-label': node.attrs.label,
            'data-list-type': node.attrs.listType,
            'data-spread': node.attrs.spread,
            class: 'flex-column flex items-start gap-2'
          },
          dom,
          [
            'span',
            0
          ]
        ]
      },
      parseMarkdown: {
        match: ({ type }) => type === 'listItem',
        runner: (state, node, type) => {
          if (node.listType !== 'idea') {
            baseSchema.parseMarkdown.runner(state, node, type)
            return
          }

          const label = node.label != null ? `${node.label}.` : '•'
          const listType = node.label != null ? 'ordered' : 'bullet'
          const spread = node.spread != null ? `${node.spread}` : 'true'

          state.openNode(type, { label, listType, spread })
          state.next(node.children)
          state.closeNode()
        },
      },
      toMarkdown: {
        match: node => node.type.name === 'list_item',
        runner: (state, node) => {
          if (node.attrs.listType !== 'idea') {
            baseSchema.toMarkdown.runner(state, node)
            return
          }

          const label = node.attrs.label
          const listType = node.attrs.listType
          const spread = node.attrs.spread === 'true'

          state.openNode('listItem', undefined, { label, listType, spread })
          state.next(node.content)
          state.closeNode()
        },
      },
    }
  }
})


/// Input rule for wrapping a block in task list node.
/// Users can type `[ ] ` or `[x] ` to wrap the block in task list node with idea status.
export const wrapInIdeaListInputRule = $inputRule(() => {
  return new InputRule(/^\[!]\s$/, (state, match, start, end) => {
    const pos = state.doc.resolve(start)
    let depth = 0
    let node = pos.node(depth)
    while (node && node.type.name !== 'list_item') {
      depth--
      node = pos.node(depth)
    }

    const finPos = pos.before(depth)
    const tr = state.tr

    tr.deleteRange(start, end)
      .setNodeMarkup(finPos, undefined, { ...node.attrs, listType: 'idea' })

    return tr
  })
})
