// This is a client component, required by the useEditor hook.
'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import { Button } from '@/components/Forms/Fields/Button'
import SearchDialog from '@/components/SearchDialog'
import {
  BoldIcon,
  EyeOffIcon,
  Heading1Icon,
  Heading2Icon,
  ItalicIcon,
  LinkIcon,
  ListIcon,
  StrikethroughIcon,
  TableIcon,
  UnderlineIcon,
  UnlinkIcon,
} from 'lucide-react'
import { IdeaListItem } from '@/components/Forms/Fields/Editor/IdeaListItem'
import { IdeaList } from '@/components/Forms/Fields/Editor/IdeaList'
import { Table } from '@tiptap/extension-table'
import { TableRow } from '@tiptap/extension-table-row'
import { TableHeader } from '@tiptap/extension-table-header'
import { TableCell } from '@tiptap/extension-table-cell'
import { Typography } from '@tiptap/extension-typography'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/DropdownMenu'
// @ts-ignore
import { BubbleMenu, FloatingMenu } from '@tiptap/react/menus'
import InputDialog from '@/components/InputDialog'
import {
  CustomLinkExtension,
} from '@/components/Forms/Fields/Editor/CustomLinkExtension'
import { useNavigate } from 'react-router-dom'
import { DMsEyesOnly } from '@/components/Forms/Fields/Editor/DMsEyesOnly'

// Import additional extensions if needed (e.g., TaskList, TaskItem, etc.)

interface TEditorProps {
  className?: string;
  initialValue: string;
  onChange?: (html: string) => void;
  placeholder?: string;
  canEdit?: boolean;
}

function parseUrl (url: string): string {
  if (!url.includes(':') && !url.startsWith('/')) {
    url = `https://${url}`
  }
  if (url.includes('open.spotify.com')) {
    url = url.replace('https://', 'spotify:')
    url = url.replace('http://', 'spotify:')
    url = url.replace('open.spotify.com/', '')
    url = url.replace('/', ':')
  }
  return url
}

const Editor: React.FC<TEditorProps> = ({ className = '', initialValue, onChange, placeholder, canEdit = true }) => {

  const navigate = useNavigate()

  const editor = useEditor({
    editorProps: {
      attributes: {
        class: 'mx-auto min-h-36 focus:outline-none',
      },
    },
    extensions: [
      DMsEyesOnly,
      IdeaList,
      IdeaListItem,
      StarterKit.configure({
        italic: {},
        link: false,
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      CustomLinkExtension.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
        protocols: ['http', 'https', 'spotify'],
        isAllowedUri: (url, ctx) => {
          try {
            // construct URL
            const parsedUrl = url.includes(':')
              ? new URL(url)
              : new URL(`${ctx.defaultProtocol}://${url}`)

            // use default validation
            if (!ctx.defaultValidate(parsedUrl.href)) {
              return false
            }

            // disallowed protocols
            const disallowedProtocols = ['ftp', 'file', 'mailto']
            const protocol = parsedUrl.protocol.replace(':', '')

            if (disallowedProtocols.includes(protocol)) {
              return false
            }

            // only allow protocols specified in ctx.protocols
            const allowedProtocols = ctx.protocols.map(
              p => (typeof p === 'string' ? p : p.scheme))

            if (!allowedProtocols.includes(protocol)) {
              return false
            }

            // disallowed domains
            const disallowedDomains = [
              'example-phishing.com',
              'malicious-site.net',
            ]
            const domain = parsedUrl.hostname

            if (disallowedDomains.includes(domain)) {
              return false
            }

            // all checks have passed
            return true
          } catch {
            return false
          }
        },
        shouldAutoLink: url => {
          try {
            // construct URL
            const parsedUrl = url.includes(':')
              ? new URL(url)
              : new URL(`https://${url}`)

            // only auto-link if the domain is not in the disallowed list
            const disallowedDomains = [
              'example-no-autolink.com',
              'another-no-autolink.com',
            ]
            const domain = parsedUrl.hostname

            return !disallowedDomains.includes(domain)
          } catch {
            return false
          }
        },
        isInternal: href => href?.startsWith('/'),
        onInternalClick: (href) => navigate(href),
      }),
      Placeholder.configure({
        placeholder: placeholder || 'Start typing...',
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Typography,
      // Add any additional TipTap extensions here (e.g., Callout, TaskList, etc.)
    ],
    content: initialValue,
    editable: canEdit,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      onChange && onChange(html)
    },
  })

  // Clean up the editor on unmount.
  useEffect(() => {
    return () => {
      editor?.destroy()
    }
  }, [editor])

  const setLink = useCallback((url: string) => {
    setOpenLinkDialog(false)
    setOpenSearchDialog(false)

    if (!editor) {
      return
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink()
        .run()

      return
    }

    // update link
    try {
      editor.chain().focus().extendMarkRange('link').setLink({ href: parseUrl(url) })
        .run()
    } catch (e) {
      if (e instanceof Error) {
        alert(e.message)
      } else {
        alert(String(e))
      }
    }
  }, [editor])

  const [openLinkDialog, setOpenLinkDialog] = useState<boolean>(false)
  const [initialLinkValue, setInitialLinkValue] = useState<string>('')
  const [openSearchDialog, setOpenSearchDialog] = useState<boolean>(false)

  if (!editor) {
    return null
  }

  return (
    <div className={`editor-theme relative font-serif text-serif-lg ${className}`}>
      <InputDialog isOpen={openLinkDialog}
                   setIsOpen={setOpenLinkDialog}
                   onSubmit={setLink}
                   initValue={initialLinkValue}
                   onOpenSearch={() => setOpenSearchDialog(true)}/>
      <SearchDialog isOpen={openSearchDialog}
                    setIsOpen={setOpenSearchDialog}
                    onSelect={setLink}/>
      <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}
                  className={'flex gap-2'}>
        <Button size={'sm'} onClick={() => {
          setInitialLinkValue(editor.getAttributes('link').href || '')
          setOpenLinkDialog(true)
        }}>
          <LinkIcon size={15}/>
        </Button>
        {editor.isActive('link') && (
          <Button size="sm" onClick={() => editor.chain().focus().extendMarkRange('link').unsetLink().run()}>
            <UnlinkIcon size={15}/>
          </Button>
        )}
        <Button size={'sm'} onClick={() => editor.chain().focus().toggleBold().run()}>
          <BoldIcon size={15} className={'text-burnOrange'}/>
        </Button>
        <Button size={'sm'} onClick={() => editor.chain().focus().toggleItalic().run()}>
          <ItalicIcon size={15} className={'text-emerald-500'}/>
        </Button>
        <Button size={'sm'} onClick={() => editor.chain().focus().toggleUnderline().run()}>
          <UnderlineIcon size={15}/>
        </Button>
        <Button size={'sm'} onClick={() => editor.chain().focus().toggleStrike().run()}>
          <StrikethroughIcon size={15}/>
        </Button>
        <Button size={'sm'} onClick={() => editor.chain().focus().setDmOnly().run()}>
          <EyeOffIcon size={15}/>
        </Button>
      </BubbleMenu>
      <FloatingMenu editor={editor} tippyOptions={{ duration: 100 }}
                    className={'flex gap-2'}>
        <Button size={'sm'} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
          <Heading1Icon size={15}/>
        </Button>
        <Button size={'sm'} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
          <Heading2Icon size={15}/>
        </Button>
        <Button size={'sm'} onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <ListIcon size={15}/>
        </Button>
        <Button size={'sm'} onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}>
          <TableIcon size={15}/>
        </Button>
        <Button size={'sm'} onClick={() => editor.chain().focus().setDmOnly().run()}>
          <EyeOffIcon size={15}/>
        </Button>
      </FloatingMenu>
      {editor.isActive('table') && (
        <div className={'absolute top-3 right-3 z-10'}>
          <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm">
              <TableIcon size={15}/>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => editor.chain()
                .focus()
                .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                .run()}
            >
              Insert table
            </DropdownMenuItem>
            <DropdownMenuSeparator/>
            <DropdownMenuItem
              onClick={() => editor.chain().focus().addColumnBefore().run()}>
              Add column before
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => editor.chain().focus().addColumnAfter().run()}>
              Add column after
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => editor.chain().focus().deleteColumn().run()}>
              Delete column
            </DropdownMenuItem>
            <DropdownMenuSeparator/>
            <DropdownMenuItem
              onClick={() => editor.chain().focus().addRowBefore().run()}>
              Add row before
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => editor.chain().focus().addRowAfter().run()}>
              Add row after
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => editor.chain().focus().deleteRow().run()}>
              Delete row
            </DropdownMenuItem>
            <DropdownMenuSeparator/>
            <DropdownMenuItem
              onClick={() => editor.chain().focus().deleteTable().run()}>
              Delete table
            </DropdownMenuItem>
            <DropdownMenuSeparator/>
            <DropdownMenuItem
              onClick={() => editor.chain().focus().mergeCells().run()}>
              Merge cells
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => editor.chain().focus().splitCell().run()}>
              Split cell
            </DropdownMenuItem>
            <DropdownMenuSeparator/>
            <DropdownMenuItem
              onClick={() => editor.chain().focus().toggleHeaderColumn().run()}>
              Toggle header column
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => editor.chain().focus().toggleHeaderRow().run()}>
              Toggle header row
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => editor.chain().focus().toggleHeaderCell().run()}>
              Toggle header cell
            </DropdownMenuItem>
            <DropdownMenuSeparator/>
            <DropdownMenuItem
              onClick={() => editor.chain().focus().mergeOrSplit().run()}>
              Merge or split
            </DropdownMenuItem>
            <DropdownMenuSeparator/>
            <DropdownMenuItem onClick={() => editor.chain()
              .focus()
              .setCellAttribute('colspan', 2)
              .run()}>
              Set cell attribute
            </DropdownMenuItem>
            <DropdownMenuSeparator/>
            <DropdownMenuItem
              onClick={() => editor.chain().focus().fixTables().run()}>
              Fix tables
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
      )}
      <EditorContent editor={editor}/>
    </div>
  )
}

export default Editor