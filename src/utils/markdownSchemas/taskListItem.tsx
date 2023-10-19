import { expectDomTypeError } from '@milkdown/exception'
import { listItemSchema } from '@milkdown/preset-commonmark'
import ReactDOM from 'react-dom'
import Checkbox from '../../components/Elements/Checkbox'
import { $inputRule } from '@milkdown/utils'
import { InputRule } from 'prosemirror-inputrules'

export const extendListItemSchemaForTask = listItemSchema.extendSchema((prev) => {
  return (ctx) => {
    const baseSchema = prev(ctx)
    return {
      ...baseSchema,
      attrs: {
        ...baseSchema.attrs,
        checked: {
          default: null,
        },
      },
      parseDOM: [
        {
          tag: 'li[data-item-type="task"]',
          getAttrs: (dom) => {
            if (!(dom instanceof HTMLElement))
              throw expectDomTypeError(dom)

            return {
              label: dom.dataset.label,
              listType: dom.dataset['list-type'],
              spread: dom.dataset.spread,
              checked: dom.dataset.checked
                ? dom.dataset.checked === 'true'
                : null,
            }
          },
        },
        ...baseSchema?.parseDOM || [],
      ],
      toDOM: (node) => {
        if (baseSchema.toDOM && node.attrs.checked == null)
          return baseSchema.toDOM(node)

        let dom = document.createElement('div')

        ReactDOM.render(<Checkbox checked={node.attrs.checked}/>, dom)

        return [
          'li',
          {
            'data-item-type': 'task',
            'data-label': node.attrs.label,
            'data-list-type': node.attrs.listType,
            'data-spread': node.attrs.spread,
            'data-checked': node.attrs.checked,
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
          if (node.checked == null) {
            baseSchema.parseMarkdown.runner(state, node, type)
            return
          }

          const label = node.label != null ? `${node.label}.` : '•'
          const checked = node.checked != null ? Boolean(node.checked) : null
          const listType = node.label != null ? 'ordered' : 'bullet'
          const spread = node.spread != null ? `${node.spread}` : 'true'

          state.openNode(type, { label, listType, spread, checked })
          state.next(node.children)
          state.closeNode()
        },
      },
      toMarkdown: {
        match: node => node.type.name === 'list_item',
        runner: (state, node) => {
          if (node.attrs.checked == null) {
            baseSchema.toMarkdown.runner(state, node)
            return
          }

          const label = node.attrs.label
          const listType = node.attrs.listType
          const spread = node.attrs.spread === 'true'
          const checked = node.attrs.checked

          state.openNode('listItem', undefined, { label, listType, spread, checked })
          state.next(node.content)
          state.closeNode()
        },
      },
    }
  }
})

/// Input rule for wrapping a block in task list node.
/// Users can type `[ ] ` or `[x] ` to wrap the block in task list node with checked status.
export const wrapInTaskListInputRule = $inputRule(() => {
  return new InputRule(/^\[(?<checked>\s|x)\]\s$/, (state, match, start, end) => {
    const pos = state.doc.resolve(start)
    let depth = 0
    let node = pos.node(depth)
    while (node && node.type.name !== 'list_item') {
      depth--
      node = pos.node(depth)
    }

    if (!node || node.attrs.checked != null)
      return null

    const checked = Boolean(match.groups?.checked === 'x');

    const finPos = pos.before(depth)
    const tr = state.tr

    tr.deleteRange(start, end)
      .setNodeMarkup(finPos, undefined, { ...node.attrs, checked })

    return tr
  })
})
