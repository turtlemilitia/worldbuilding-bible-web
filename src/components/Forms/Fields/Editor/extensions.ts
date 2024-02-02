import { AnyExtension } from 'remirror'
import {
  BlockquoteExtension,
  BoldExtension,
  BulletListExtension,
  CalloutExtension,
  HeadingExtension,
  ItalicExtension,
  // LinkExtension,
  MarkdownExtension,
  OrderedListExtension,
  TaskListExtension,
  TaskListItemExtension
} from 'remirror/extensions'
import { PlaceholderExtension } from '@remirror/react'
import { IdeaListExtension, IdeaListItemExtension } from '../../../../utils/remirror/extensions/IdeaListItemExtension'
import { turndownService } from '../../../../utils/remirror/turndownService'
import { convertMarkdown } from './converters'

// Encapsulate the list of extensions into a separate function
export function getExtensions (placeholder?: string): AnyExtension[] {
  return [
    new HeadingExtension(),
    new BoldExtension(),
    new ItalicExtension(),
    new CalloutExtension({ defaultType: 'warn' }),
    new BulletListExtension(),
    new OrderedListExtension(),
    new TaskListExtension(),
    new TaskListItemExtension(),
    new IdeaListExtension(),
    new IdeaListItemExtension(),
    new BlockquoteExtension(),
    // new LinkExtension(),
    new MarkdownExtension({
      htmlToMarkdown: (html) => turndownService.turndown(html),
      markdownToHtml: (markdown) => convertMarkdown(markdown),
    }),
    new PlaceholderExtension({ placeholder }),
  ]
}