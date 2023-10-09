import { expectDomTypeError } from '@milkdown/exception'
import { listItemSchema } from '@milkdown/preset-commonmark'

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
              checked: dom.dataset.checked ? dom.dataset.checked === 'true' : null,
            }
          },
        },
        ...baseSchema?.parseDOM || [],
      ],
      toDOM: (node) => {
        if (baseSchema.toDOM && node.attrs.checked == null)
          return baseSchema.toDOM(node)

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
          [
            'span',
            {class: 'flex items-center h-10 rounded'},
            [
              'input',
              {
                type: 'checkbox',
                checked: node.attrs.checked,
                class: 'hidden'
              }
            ],
            [
              'label',
              {class: `flex items-center justify-center w-5 h-5 text-transparent border-2 ${node.attrs.checked ? 'border-emerald-700' : 'border-stone-300'} rounded-full ${node.attrs.checked ? 'bg-emerald-500' : ''}`},
              [
                'svg',
                {
                  class: "w-4 h-4 fill-current",
                  xmlns: "http://www.w3.org/2000/svg",
                  viewBox: "0 0 20 20",
                  fill: "currentColor"
                },
                [
                  'path',
                  {
                    'fill-rule': "evenodd",
                    d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
                    'clip-rule': "evenodd"
                  }
                ]
              ]
            ]
          ],
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