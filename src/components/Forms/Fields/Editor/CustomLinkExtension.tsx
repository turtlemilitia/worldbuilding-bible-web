import TiptapLink, { isAllowedUri, LinkOptions } from '@tiptap/extension-link'
import {
  MarkViewContent,
  MarkViewRendererProps, mergeAttributes,
  ReactMarkViewRenderer,
} from '@tiptap/react'
import { Link as RouterLink } from 'react-router-dom'

/**
 * This should work but it doesn't. Seems there is a bug on TipTap
 * For now its disables
 */
const NewLinkMarkView = (props: MarkViewRendererProps) => {
  const { HTMLAttributes, mark } = props
  const { href } = mark.attrs

  // Determine if the link is internal or external
  const isInternal = href && href.startsWith("/");

  // For internal links, use React's Link component for client-side routing.
  // For external links, use a standard <a> tag.
  if (isInternal) {
    return (
      <RouterLink
        to={href}
        {...mergeAttributes(HTMLAttributes)}
      >
        <MarkViewContent />
      </RouterLink>
    );
  }

  // External link
  return (
    <a
      href={href}
      {...mergeAttributes(HTMLAttributes)}
      rel="noopener noreferrer nofollow"
    >
      <MarkViewContent />
    </a>
  );
};

import { Plugin } from '@tiptap/pm/state'

type CustomLinkOptions = {
  /** decide whether a href should be treated as internal */
  isInternal?: (href: string) => boolean
  /** handle internal clicks (e.g., call your router navigate) */
  onInternalClick?: (href: string, event: MouseEvent) => void
}

export const CustomLinkExtension = TiptapLink.extend<CustomLinkOptions & LinkOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      isInternal: (href: string) => Boolean(href && href.startsWith('/')),
      onInternalClick: undefined,
    }
  },

  // NOTE: Temporarily disable MarkView due to a React MarkView issue where
  // MarkViewContent renders outside the component for marks (#6743).
  // When the upstream bug is fixed, you can re-enable the MarkView below.
  // addMarkView() {
  //   return ReactMarkViewRenderer(NewLinkMarkView)
  // },

  addProseMirrorPlugins() {
    const isInternal = this.options.isInternal!
    const onInternalClick = this.options.onInternalClick

    return [
      new Plugin({
        props: {
          handleClick: (_view, _pos, event) => {
            const target = event.target as HTMLElement | null
            const anchor = target?.closest('a[href]') as HTMLAnchorElement | null
            if (!anchor) return false

            const href = anchor.getAttribute('href') || ''

            // Only intercept internal links; let external links behave normally
            if (isInternal(href)) {
              event.preventDefault()
              onInternalClick?.(href, event as unknown as MouseEvent)
              return true
            }

            // External links: explicitly open (so it "continues on" even inside the editor)
            const targetAttr = anchor.getAttribute('target') ?? '_blank'
            // Use window.open to guarantee navigation from within the editor context
            window.open(href, targetAttr)
            event.preventDefault()
            return true
          },
        },
      }),
    ]
  },
})