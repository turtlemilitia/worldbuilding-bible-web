import React from 'react'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import { render } from '@testing-library/react'
import Editor from './Editor'

// We capture the config passed into useEditor, so we can assert on it and trigger onUpdate manually.
let lastUseEditorOptions: any = null
let useEditorReturnValue: any = null

type CommandName =
  | 'toggleBold'
  | 'toggleItalic'
  | 'toggleUnderline'
  | 'toggleStrike'
  | 'setDmOnly'
  | 'toggleBulletList'

function buildEditorForSimpleCommand(commandName: CommandName) {
  const run = vi.fn()
  const command = vi.fn(() => ({ run }))
  const focus = vi.fn(() => ({ [commandName]: command } as any))
  const chain = vi.fn(() => ({ focus }))

  const editor = {
    destroy: vi.fn(),
    isActive: vi.fn(() => false),
    getAttributes: vi.fn(() => ({})),
    chain,
  }

  return { editor, chain, focus, command, run }
}

vi.mock('@tiptap/react', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@tiptap/react')>()

  return {
    ...actual,
    EditorContent: () => <div data-testid="tiptap-editor-content" />,
    useEditor: (options: any) => {
      lastUseEditorOptions = options
      return useEditorReturnValue
    },
  }
})

// BubbleMenu / FloatingMenu are UI wrappers; for unit tests we make them no-ops that only render children.
vi.mock('@tiptap/react/menus', async (importOriginal) => {
  const actual = await importOriginal<any>()

  return {
    ...actual,
    BubbleMenu: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    FloatingMenu: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  }
})

// Keep the test focused on Editor, not child components’ behavior/portals.
vi.mock('@/components/Forms/Fields/Button', async () => {
  return {
    Button: ({ children, onClick, ...props }: any) => (
      <button type="button" onClick={onClick} {...props}>
        {children}
      </button>
    ),
  }
})

// Keep the test focused on Editor, not child components’ behavior/portals.
vi.mock('@/components/Forms/Fields/Button', async () => {
  return {
    Button: ({ children, onClick, ...props }: any) => (
      <button type="button" onClick={onClick} {...props}>
        {children}
      </button>
    ),
  }
})

vi.mock('@/components/InputDialog', async () => ({
  default: () => null,
}))
vi.mock('@/components/SearchDialog', async () => ({
  default: () => null,
}))
vi.mock('@/components/DropdownMenu', async () => ({
  DropdownMenu: ({ children }: any) => <div>{children}</div>,
  DropdownMenuContent: ({ children }: any) => <div>{children}</div>,
  DropdownMenuItem: ({ children, onClick }: any) => (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  ),
  DropdownMenuSeparator: () => <div />,
  DropdownMenuTrigger: ({ children }: any) => <div>{children}</div>,
}))

// ✅ hoisted so it exists when vi.mock factories are evaluated
const { placeholderConfigureMock } = vi.hoisted(() => {
  return {
    placeholderConfigureMock: vi.fn((opts: any) => ({ __placeholderOpts: opts })),
  }
})

vi.mock('@tiptap/extension-placeholder', async (importOriginal) => {
  const actual = await importOriginal<any>()

  return {
    ...actual,
    default: {
      configure: placeholderConfigureMock,
    },
  }
})

describe('<Editor />', () => {
  beforeEach(() => {
    lastUseEditorOptions = null
    useEditorReturnValue = null
  })

  it('clicking Bold calls editor.chain().focus().toggleBold().run()', () => {
    const { editor, chain, focus, command, run } = buildEditorForSimpleCommand('toggleBold')
    useEditorReturnValue = editor

    const { getByRole } = render(<Editor initialValue="<p>initial</p>" />)
    getByRole('button', { name: 'Bold' }).click()

    expect(chain).toHaveBeenCalledTimes(1)
    expect(focus).toHaveBeenCalledTimes(1)
    expect(command).toHaveBeenCalledTimes(1)
    expect(run).toHaveBeenCalledTimes(1)
  })

  it('clicking Italic calls editor.chain().focus().toggleItalic().run()', () => {
    const { editor, chain, focus, command, run } = buildEditorForSimpleCommand('toggleItalic')
    useEditorReturnValue = editor

    const { getByRole } = render(<Editor initialValue="<p>initial</p>" />)
    getByRole('button', { name: 'Italic' }).click()

    expect(chain).toHaveBeenCalledTimes(1)
    expect(focus).toHaveBeenCalledTimes(1)
    expect(command).toHaveBeenCalledTimes(1)
    expect(run).toHaveBeenCalledTimes(1)
  })

  it('clicking Underline calls editor.chain().focus().toggleUnderline().run()', () => {
    const { editor, chain, focus, command, run } = buildEditorForSimpleCommand('toggleUnderline')
    useEditorReturnValue = editor

    const { getByRole } = render(<Editor initialValue="<p>initial</p>" />)
    getByRole('button', { name: 'Underline' }).click()

    expect(chain).toHaveBeenCalledTimes(1)
    expect(focus).toHaveBeenCalledTimes(1)
    expect(command).toHaveBeenCalledTimes(1)
    expect(run).toHaveBeenCalledTimes(1)
  })

  it('clicking Strikethrough calls editor.chain().focus().toggleStrike().run()', () => {
    const { editor, chain, focus, command, run } = buildEditorForSimpleCommand('toggleStrike')
    useEditorReturnValue = editor

    const { getByRole } = render(<Editor initialValue="<p>initial</p>" />)
    getByRole('button', { name: 'Strikethrough' }).click()

    expect(chain).toHaveBeenCalledTimes(1)
    expect(focus).toHaveBeenCalledTimes(1)
    expect(command).toHaveBeenCalledTimes(1)
    expect(run).toHaveBeenCalledTimes(1)
  })

  it('clicking "DMs eyes only (bubble)" calls editor.chain().focus().setDmOnly().run()', () => {
    const { editor, chain, focus, command, run } = buildEditorForSimpleCommand('setDmOnly')
    useEditorReturnValue = editor

    const { getByRole } = render(<Editor initialValue="<p>initial</p>" />)
    getByRole('button', { name: 'DMs eyes only (bubble)' }).click()

    expect(chain).toHaveBeenCalledTimes(1)
    expect(focus).toHaveBeenCalledTimes(1)
    expect(command).toHaveBeenCalledTimes(1)
    expect(run).toHaveBeenCalledTimes(1)
  })

  it('shows "Remove link" only when link is active, and clicking it unsets the link', () => {
    const run = vi.fn()
    const unsetLink = vi.fn(() => ({ run }))
    const extendMarkRange = vi.fn(() => ({ unsetLink }))
    const focus = vi.fn(() => ({ extendMarkRange }))
    const chain = vi.fn(() => ({ focus }))

    useEditorReturnValue = {
      destroy: vi.fn(),
      isActive: vi.fn((name: string) => name === 'link'),
      getAttributes: vi.fn(() => ({ href: 'https://example.com' })),
      chain,
    }

    const { getByRole } = render(<Editor initialValue="<p>initial</p>" />)

    // Conditional button should exist because isActive('link') === true
    getByRole('button', { name: 'Remove link' }).click()

    expect(chain).toHaveBeenCalledTimes(1)
    expect(focus).toHaveBeenCalledTimes(1)
    expect(extendMarkRange).toHaveBeenCalledWith('link')
    expect(unsetLink).toHaveBeenCalledTimes(1)
    expect(run).toHaveBeenCalledTimes(1)
  })

  it('renders null while the TipTap editor instance is not ready', () => {
    useEditorReturnValue = null

    const { container } = render(<Editor initialValue="<p>hi</p>" />)

    // When the component returns null, render() produces an empty container.
    expect(container).toBeEmptyDOMElement()
  })

  it('defaults canEdit to true (editable: true)', () => {
    useEditorReturnValue = {
      destroy: vi.fn(),
      isActive: vi.fn(() => false),
      getAttributes: vi.fn(() => ({})),
      chain: vi.fn(() => ({ focus: vi.fn(() => ({})) })),
    }

    render(<Editor initialValue="<p>initial</p>" />)

    expect(lastUseEditorOptions.editable).toBe(true)
  })

  it('passes initialValue and canEdit into useEditor()', () => {
    useEditorReturnValue = {
      destroy: vi.fn(),
      isActive: vi.fn(() => false),
      getAttributes: vi.fn(() => ({})),
      chain: vi.fn(() => ({
        focus: vi.fn(() => ({
          toggleBold: vi.fn(() => ({ run: vi.fn() })),
          toggleItalic: vi.fn(() => ({ run: vi.fn() })),
          toggleUnderline: vi.fn(() => ({ run: vi.fn() })),
          toggleStrike: vi.fn(() => ({ run: vi.fn() })),
          setDmOnly: vi.fn(() => ({ run: vi.fn() })),
          toggleHeading: vi.fn(() => ({ run: vi.fn() })),
          toggleBulletList: vi.fn(() => ({ run: vi.fn() })),
          insertTable: vi.fn(() => ({ run: vi.fn() })),
          addColumnBefore: vi.fn(() => ({ run: vi.fn() })),
          addColumnAfter: vi.fn(() => ({ run: vi.fn() })),
          deleteColumn: vi.fn(() => ({ run: vi.fn() })),
          addRowBefore: vi.fn(() => ({ run: vi.fn() })),
          addRowAfter: vi.fn(() => ({ run: vi.fn() })),
          deleteRow: vi.fn(() => ({ run: vi.fn() })),
          deleteTable: vi.fn(() => ({ run: vi.fn() })),
          mergeCells: vi.fn(() => ({ run: vi.fn() })),
          splitCell: vi.fn(() => ({ run: vi.fn() })),
          toggleHeaderColumn: vi.fn(() => ({ run: vi.fn() })),
          toggleHeaderRow: vi.fn(() => ({ run: vi.fn() })),
          toggleHeaderCell: vi.fn(() => ({ run: vi.fn() })),
          mergeOrSplit: vi.fn(() => ({ run: vi.fn() })),
          setCellAttribute: vi.fn(() => ({ run: vi.fn() })),
          fixTables: vi.fn(() => ({ run: vi.fn() })),
          extendMarkRange: vi.fn(() => ({
            unsetLink: vi.fn(() => ({ run: vi.fn() })),
            setLink: vi.fn(() => ({ run: vi.fn() })),
          })),
        })),
      })),
    }

    render(<Editor initialValue="<p>initial</p>" canEdit={false} />)

    expect(lastUseEditorOptions).not.toBeNull()
    expect(lastUseEditorOptions.content).toBe('<p>initial</p>')
    expect(lastUseEditorOptions.editable).toBe(false)
  })

  it('calls onChange with editor.getHTML() when TipTap triggers onUpdate', () => {
    useEditorReturnValue = {
      destroy: vi.fn(),
      isActive: vi.fn(() => false),
      getAttributes: vi.fn(() => ({})),
      chain: vi.fn(() => ({
        focus: vi.fn(() => ({
          toggleBold: vi.fn(() => ({ run: vi.fn() })),
          toggleItalic: vi.fn(() => ({ run: vi.fn() })),
          toggleUnderline: vi.fn(() => ({ run: vi.fn() })),
          toggleStrike: vi.fn(() => ({ run: vi.fn() })),
          setDmOnly: vi.fn(() => ({ run: vi.fn() })),
          toggleHeading: vi.fn(() => ({ run: vi.fn() })),
          toggleBulletList: vi.fn(() => ({ run: vi.fn() })),
          insertTable: vi.fn(() => ({ run: vi.fn() })),
          addColumnBefore: vi.fn(() => ({ run: vi.fn() })),
          addColumnAfter: vi.fn(() => ({ run: vi.fn() })),
          deleteColumn: vi.fn(() => ({ run: vi.fn() })),
          addRowBefore: vi.fn(() => ({ run: vi.fn() })),
          addRowAfter: vi.fn(() => ({ run: vi.fn() })),
          deleteRow: vi.fn(() => ({ run: vi.fn() })),
          deleteTable: vi.fn(() => ({ run: vi.fn() })),
          mergeCells: vi.fn(() => ({ run: vi.fn() })),
          splitCell: vi.fn(() => ({ run: vi.fn() })),
          toggleHeaderColumn: vi.fn(() => ({ run: vi.fn() })),
          toggleHeaderRow: vi.fn(() => ({ run: vi.fn() })),
          toggleHeaderCell: vi.fn(() => ({ run: vi.fn() })),
          mergeOrSplit: vi.fn(() => ({ run: vi.fn() })),
          setCellAttribute: vi.fn(() => ({ run: vi.fn() })),
          fixTables: vi.fn(() => ({ run: vi.fn() })),
          extendMarkRange: vi.fn(() => ({
            unsetLink: vi.fn(() => ({ run: vi.fn() })),
            setLink: vi.fn(() => ({ run: vi.fn() })),
          })),
        })),
      })),
    }

    const onChange = vi.fn()
    render(<Editor initialValue="<p>initial</p>" onChange={onChange} />)

    // Simulate TipTap calling the onUpdate callback we provided to useEditor()
    const fakeEditor = { getHTML: () => '<p>changed</p>' }
    lastUseEditorOptions.onUpdate({ editor: fakeEditor })

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith('<p>changed</p>')
  })

  it('does not throw if TipTap triggers onUpdate and onChange is not provided', () => {
    useEditorReturnValue = {
      destroy: vi.fn(),
      isActive: vi.fn(() => false),
      getAttributes: vi.fn(() => ({})),
      chain: vi.fn(() => ({ focus: vi.fn(() => ({})) })),
    }

    render(<Editor initialValue="<p>initial</p>" />)

    const fakeEditor = { getHTML: () => '<p>changed</p>' }

    expect(() => {
      lastUseEditorOptions.onUpdate({ editor: fakeEditor })
    }).not.toThrow()
  })

  it('configures the Placeholder extension with the placeholder prop', () => {
    // Minimal editor so component renders
    useEditorReturnValue = {
      destroy: vi.fn(),
      isActive: vi.fn(() => false),
      getAttributes: vi.fn(() => ({})),
      chain: vi.fn(() => ({ focus: vi.fn(() => ({})) })),
    }

    render(<Editor initialValue="<p>initial</p>" placeholder="Write here..." />)

    expect(placeholderConfigureMock).toHaveBeenCalled()
    expect(placeholderConfigureMock).toHaveBeenCalledWith(
      expect.objectContaining({ placeholder: 'Write here...' }),
    )
  })

  it('destroys the editor on unmount', () => {
    const destroy = vi.fn()

    useEditorReturnValue = {
      destroy,
      isActive: vi.fn(() => false),
      getAttributes: vi.fn(() => ({})),
      chain: vi.fn(() => ({ focus: vi.fn(() => ({})) })),
    }

    const { unmount } = render(<Editor initialValue="<p>initial</p>" />)

    unmount()

    expect(destroy).toHaveBeenCalledTimes(1)
  })
})