import { Extension } from '@tiptap/core'
import { TextSelection } from '@tiptap/pm/state'
import { keymap } from '@tiptap/pm/keymap'

type ItemTypeName = 'listItem' | 'taskItem'
type ListTypeName = 'bulletList' | 'taskList'

/**
 * Option A behavior:
 * If the cursor is in an EMPTY paragraph inside a NESTED list item,
 * pressing Enter creates a paragraph inside the PARENT item (after the nested list),
 * instead of "lifting" (outdenting) or exiting the list to top-level.
 *
 * Supports:
 * - bulletList/listItem
 * - taskList/taskItem
 */
export const NestedEmptyListItemEnterToParentParagraph = Extension.create({
  name: 'nestedEmptyListItemEnterToParentParagraph',

  // Make sure we run BEFORE StarterKit/TaskItem keymaps.
  priority: 10000,

  addProseMirrorPlugins() {
    const handle = (itemType: ItemTypeName, listType: ListTypeName) => {
      const { state, view } = this.editor
      const { selection, schema } = state
      const { $from } = selection

      if (!selection.empty) return false

      // Must be inside an empty paragraph
      const para = $from.parent
      if (para.type.name !== 'paragraph') return false
      if (para.content.size !== 0) return false

      // Find the nearest ancestor that is the current itemType (listItem/taskItem)
      let currentItemDepth: number | null = null
      for (let depth = $from.depth; depth >= 1; depth -= 1) {
        if ($from.node(depth).type.name === itemType) {
          currentItemDepth = depth
          break
        }
      }
      if (currentItemDepth === null) return false

      // We only want the NESTED case: itemType must be inside a listType, which itself is inside a parent itemType.
      const nestedListDepth = currentItemDepth - 1
      const parentItemDepth = currentItemDepth - 2

      if (nestedListDepth < 1 || parentItemDepth < 1) return false

      if ($from.node(nestedListDepth).type.name !== listType) return false
      if ($from.node(parentItemDepth).type.name !== itemType) return false

      const itemFrom = $from.before(currentItemDepth)
      const itemTo = $from.after(currentItemDepth)

      // Insert after the nested list node (inside the parent item)
      const insertAfterNestedListPos = $from.after(nestedListDepth)

      const tr = state.tr

      // Remove the empty nested item
      tr.delete(itemFrom, itemTo)

      // Insert paragraph after nested list
      const mappedInsertPos = tr.mapping.map(insertAfterNestedListPos)
      const paragraphNode = schema.nodes.paragraph.create()
      tr.insert(mappedInsertPos, paragraphNode)

      // Put cursor inside the new paragraph
      tr.setSelection(TextSelection.create(tr.doc, mappedInsertPos + 1))

      view.dispatch(tr)
      return true
    }

    return [
      keymap({
        Enter: () =>
          handle('taskItem', 'taskList') ||
          handle('listItem', 'bulletList'),
      }),
    ]
  },
})
