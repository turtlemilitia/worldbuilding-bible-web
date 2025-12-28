import { describe, expect, it } from 'vitest'
import { Editor } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import { NestedEmptyListItemEnterToParentParagraph } from '@/components/Forms/Fields/Editor/NestedListItemEnterHandler'

function pressEnter(editor: Editor) {
  const event = new KeyboardEvent('keydown', {
    key: 'Enter',
    code: 'Enter',
    bubbles: true,
    cancelable: true,
  })

  editor.view.dom.dispatchEvent(event)
}

function topLevelNodeTypeNames(editor: Editor): string[] {
  return editor.state.doc.content.content.map((n) => n.type.name)
}

/**
 * Finds the first node of a given type and returns its resolved position.
 * This lets us place the cursor inside nested structures deterministically.
 */
function findFirstNodePos(editor: Editor, typeName: string): number {
  let foundPos: number | null = null

  editor.state.doc.descendants((node, pos) => {
    if (foundPos !== null) return false
    if (node.type.name === typeName) {
      foundPos = pos
      return false
    }
    return true
  })

  if (foundPos === null) {
    throw new Error(`Node type not found in doc: ${typeName}`)
  }

  return foundPos
}

/**
 * Finds the first EMPTY paragraph inside a nested list item and returns a cursor position inside it.
 * Useful after we press Enter to create a new empty nested list item.
 */
function findEmptyNestedItemParagraphCursorPos(editor: Editor): number {
  const { doc } = editor.state

  let found: number | null = null

  doc.descendants((node, pos) => {
    if (found !== null) return false

    // We only want an EMPTY paragraph
    if (node.type.name !== 'paragraph' || node.content.size !== 0) return true

    // Ensure this paragraph is inside a listItem/taskItem, and that item is nested
    // (i.e., item -> list -> parent item)
    const $pos = doc.resolve(pos)

    // parent of the paragraph should be the item (listItem/taskItem)
    const itemDepth = $pos.depth
    if (itemDepth < 3) return true

    const itemNode = $pos.node(itemDepth)
    const listNode = $pos.node(itemDepth - 1)
    const parentItemNode = $pos.node(itemDepth - 2)

    const isItem = itemNode.type.name === 'listItem' || itemNode.type.name === 'taskItem'
    const isList = listNode.type.name === 'bulletList' || listNode.type.name === 'taskList'
    const isParentItem = parentItemNode.type.name === 'listItem' || parentItemNode.type.name === 'taskItem'

    if (!isItem || !isList || !isParentItem) return true

    // Cursor goes inside the paragraph
    found = pos + 1
    return false
  })

  if (found === null) {
    throw new Error('Empty nested-item paragraph not found in doc')
  }

  return found
}

describe('Nested list UX: double Enter should create a paragraph in the parent list item (Option A)', () => {
  it('BulletList: double Enter on empty nested item creates a paragraph in the parent listItem (not an outdent)', () => {
    const editor = new Editor({
      element: document.createElement('div'),
      extensions: [
        NestedEmptyListItemEnterToParentParagraph,
        StarterKit.configure({}),
      ],
      content: {
        type: 'doc',
        content: [
          {
            type: 'bulletList',
            content: [
              {
                type: 'listItem',
                content: [
                  { type: 'paragraph', content: [{ type: 'text', text: 'Parent' }] },
                  {
                    type: 'bulletList',
                    content: [
                      {
                        type: 'listItem',
                        content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Child' }] }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    })

    // ✅ sanity check: first Enter should NOT exit the list
    expect(topLevelNodeTypeNames(editor)).toEqual(['bulletList'])

    editor.commands.focus('end')

    // Enter once => new empty nested listItem
    pressEnter(editor)

    // ✅ sanity check: first Enter should NOT exit the list
    expect(topLevelNodeTypeNames(editor)).toEqual(['bulletList', 'paragraph'])

    // ✅ ensure caret is inside the newly created empty nested item
    const emptyParaCursorPos = findEmptyNestedItemParagraphCursorPos(editor)
    editor.commands.setTextSelection(emptyParaCursorPos)

    // Enter again on empty nested listItem => Option A behavior
    pressEnter(editor)

    expect(topLevelNodeTypeNames(editor)).toEqual(['bulletList', 'paragraph'])

    const json = editor.getJSON()
    const parentItemContent = (json.content?.[0] as any).content?.[0]?.content ?? []
    const parentChildTypes = parentItemContent.map((n: any) => n.type)

    expect(parentChildTypes).toEqual(['paragraph', 'bulletList', 'paragraph'])
  })

  it('TaskList: double Enter on empty nested taskItem creates a paragraph in the parent taskItem (not an outdent)', () => {
    const editor = new Editor({
      element: document.createElement('div'),
      extensions: [
        NestedEmptyListItemEnterToParentParagraph,
        StarterKit.configure({}),
        TaskList,
        TaskItem.configure({ nested: true }),
      ],
      content: {
        type: 'doc',
        content: [
          {
            type: 'taskList',
            content: [
              {
                type: 'taskItem',
                attrs: { checked: false },
                content: [
                  { type: 'paragraph', content: [{ type: 'text', text: 'Parent' }] },
                  {
                    type: 'taskList',
                    content: [
                      {
                        type: 'taskItem',
                        attrs: { checked: false },
                        content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Child' }] }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    })

    expect(topLevelNodeTypeNames(editor)).toEqual(['taskList'])

    editor.commands.focus('end')

    pressEnter(editor)

    // ✅ sanity check: first Enter should NOT exit the list
    expect(topLevelNodeTypeNames(editor)).toEqual(['taskList', 'paragraph'])

    // ✅ ensure caret is inside the newly created empty nested taskItem
    const emptyParaCursorPos = findEmptyNestedItemParagraphCursorPos(editor)
    editor.commands.setTextSelection(emptyParaCursorPos)

    pressEnter(editor)

    expect(topLevelNodeTypeNames(editor)).toEqual(['taskList', 'paragraph'])

    const json = editor.getJSON()
    const parentItemContent = (json.content?.[0] as any).content?.[0]?.content ?? []
    const parentChildTypes = parentItemContent.map((n: any) => n.type)

    expect(parentChildTypes).toEqual(['paragraph', 'taskList', 'paragraph'])
  })
})