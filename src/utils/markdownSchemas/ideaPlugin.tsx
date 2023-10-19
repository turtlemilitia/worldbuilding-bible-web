import { $inputRule, $node, $remark } from '@milkdown/utils'
import { expectDomTypeError } from '@milkdown/exception'
import ReactDOM from 'react-dom'
import React from 'react'
import IdeaCheckbox from '../../components/Elements/Idea'
import { wrappingInputRule } from '@milkdown/prose/inputrules'
import { InputRule } from 'prosemirror-inputrules'

export const ideaListItemNode = $node('idea', () => ({
  group: 'listItem',
  content: 'paragraph block*',
  defining: true,
  attrs: {
    idea: {
      default: true
    }
  },
  parseDOM: [
    {
      tag: 'li[data-item-type="idea"]',
      attrs: {
        idea: true
      }
    },
  ],
  toDOM: (node) => {
    let dom = document.createElement('div')

    ReactDOM.render(<IdeaCheckbox/>, dom) // todo https://stackoverflow.com/a/74479991/4269986

    return [
      'li',
      {
        'data-item-type': 'idea',
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
    match: ({ type, name }) => type === 'listItem' && name === 'idea',
    runner: (state, node, type) => {
      state.openNode(type)
        .next(node.children)
        .closeNode()
    },
  },
  toMarkdown: {
    match: node => node.type.name === 'idea',
    runner: (state, node) => {
      state.openNode('listItem', undefined, { name: 'idea', attributes: {idea: true} })
        .next(node.content)
        .closeNode()
    },
  },
}))

export const wrapInIdeaListInputRule = $inputRule((ctx) => {
  return new InputRule(/^\[i]\s$/, (state, match, start, end) => {
    const pos = state.doc.resolve(start)
    let depth = 0
    let node = pos.node(depth)
    while (node && node.type.name !== 'list_item') { // replace previous listItem
      depth--
      node = pos.node(depth)
    }

    if (!node || node.attrs.itemType === 'idea')
      return null

    const finPos = pos.before(depth)
    const tr = state.tr

    tr.deleteRange(start, end)
      .setNodeMarkup(finPos, ideaListItemNode.type(ctx))

    return tr
  })
})