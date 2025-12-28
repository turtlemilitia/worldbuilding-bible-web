import { describe, expect, it, vi } from 'vitest'
import { Editor } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'

import { IdeaList } from './IdeaList'
import { IdeaListItem } from './IdeaListItem'

// IdeaListItem uses ReactNodeViewRenderer; for extension behavior tests we don't need the React view.
// We just need a valid NodeView factory so ProseMirror doesn't crash.
vi.mock('@tiptap/react', async (importOriginal) => {
  const actual = await importOriginal<any>()

  return {
    ...actual,
    ReactNodeViewRenderer: () => {
      return () => {
        const dom = document.createElement('div')
        const contentDOM = document.createElement('div')
        dom.appendChild(contentDOM)

        return { dom, contentDOM }
      }
    },
  }
})

function countNodesByTypeName(editor: Editor, typeName: string): number {
  let count = 0
  editor.state.doc.descendants((node) => {
    if (node.type.name === typeName) count += 1
  })
  return count
}

function createIdeaListEditor(extraExtensions: any[]) {
  return new Editor({
    element: document.createElement('div'),
    extensions: [
      // ✅ Your list
      IdeaList,
      IdeaListItem,

      // ✅ Scenario-specific extensions (StarterKit / TaskList etc.)
      ...extraExtensions,
    ],
    content: {
      type: 'doc',
      content: [
        {
          type: 'ideaList',
          content: [
            {
              type: 'ideaListItem',
              attrs: { ideaType: 'i' },
              content: [
                {
                  type: 'paragraph',
                  content: [{ type: 'text', text: 'First item' }],
                },
              ],
            },
          ],
        },
      ],
    },
  })
}

function pressEnter(editor: Editor) {
  editor.commands.focus('end')

  const event = new KeyboardEvent('keydown', {
    key: 'Enter',
    code: 'Enter',
    bubbles: true,
    cancelable: true,
  })

  editor.view.dom.dispatchEvent(event)
}

describe('IdeaList / IdeaListItem - Enter behavior', () => {
  it('Enter creates a new ideaListItem (no other list extensions)', () => {
    const editor = createIdeaListEditor([
      StarterKit.configure({}),
    ])

    expect(countNodesByTypeName(editor, 'ideaListItem')).toBe(1)

    pressEnter(editor)

    expect(countNodesByTypeName(editor, 'ideaListItem')).toBe(2)
  })

  it('Enter creates a new ideaListItem even with StarterKit bulletList/listItem present', () => {
    const editor = createIdeaListEditor([
      StarterKit.configure({}),
    ])

    expect(countNodesByTypeName(editor, 'ideaListItem')).toBe(1)

    pressEnter(editor)

    expect(countNodesByTypeName(editor, 'ideaListItem')).toBe(2)
  })

  it('Enter creates a new ideaListItem with TaskList/TaskItem present (matches your Editor.tsx intent)', () => {
    const editor = createIdeaListEditor([
      StarterKit.configure({ link: false }),
      TaskList,
      TaskItem.configure({ nested: true }),
    ])

    expect(countNodesByTypeName(editor, 'ideaListItem')).toBe(1)

    pressEnter(editor)

    expect(countNodesByTypeName(editor, 'ideaListItem')).toBe(2)
  })
})