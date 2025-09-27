import TiptapLink, { LinkOptions } from '@tiptap/extension-link'
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

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {

    if (isInternal) return;

    // External links: explicitly open (so it "continues on" even inside the editor)
    const targetAttr = event.currentTarget.getAttribute('target') ?? '_blank'
    // Use window.open to guarantee navigation from within the editor context
    window.open(href, targetAttr)
    event.preventDefault()
    return true
  }

  // For internal links, use React's Link component for client-side routing.
  // For external links, use a standard <a> tag.
  if (isInternal) {
    return (
      <RouterLink to={href}>
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
      onClick={handleClick}
    >
      <MarkViewContent />
    </a>
  );
};

export const CustomLinkExtension = TiptapLink.extend<LinkOptions>({
  addMarkView() {
    return ReactMarkViewRenderer(NewLinkMarkView)
  }
})