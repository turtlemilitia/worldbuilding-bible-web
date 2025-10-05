import TiptapLink, { LinkOptions } from '@tiptap/extension-link'
import {
  MarkViewContent,
  MarkViewRendererProps, mergeAttributes,
  ReactMarkViewRenderer,
} from '@tiptap/react'
import { useSpotifyPlayer } from '@/hooks/useSpotifyPlayer'
import React, { useState } from 'react'
import Dialog from '@/components/Dialogs'
import { Identifiable } from '@/types'
import { extractDialogTargetFromPath } from '@/utils/pathUtils'
import { TDialogTypes } from '@/hooks/fieldTools/types'

/**
 * This should work but it doesn't. Seems there is a bug on TipTap
 * For now its disables
 */
const NewLinkMarkView = (props: MarkViewRendererProps) => {

  const [dialogIsOpen, setDialogIsOpen] = useState<{
    type: TDialogTypes;
    id: Identifiable['id'];
  } | false>(false)

  const { HTMLAttributes, mark } = props
  const { href } = mark.attrs

  // Determine if the link is internal or external
  const isInternal = href && href.startsWith("/");
  const isSpotify = href && (href.includes("spotify:") || href.includes("open.spotify.com"));

  const {play, isAuthed: spotifyIsAuthed} = useSpotifyPlayer()

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {

    if (isInternal) {
      event.preventDefault()
      const target = extractDialogTargetFromPath(href)
      setDialogIsOpen(target || false)
      return true
    }

    if (isSpotify && spotifyIsAuthed) {
      event.preventDefault()
      let url = href;
      if (url.includes('open.spotify.com')) {
        url = url.replace('https://', 'spotify:')
        url = url.replace('http://', 'spotify:')
        url = url.replace('open.spotify.com/', '')
        url = url.replace('/', ':')
      }
      play(url)
      return true
    }

    // External links: explicitly open (so it "continues on" even inside the editor)
    const targetAttr = event.currentTarget.getAttribute('target') ?? '_blank'
    // Use window.open to guarantee navigation from within the editor context
    window.open(href, targetAttr)
    event.preventDefault()
    return true
  }

  // External link
  return (
    <>
      <a
        href={href}
        {...mergeAttributes(HTMLAttributes)}
        rel="noopener noreferrer nofollow"
        onClick={handleClick}
      >
        <MarkViewContent />
      </a>
      {dialogIsOpen && (
        <Dialog
          type={dialogIsOpen.type}
          isOpen={!!dialogIsOpen}
          setIsOpen={() => setDialogIsOpen(false)}
          id={dialogIsOpen.id}
        />
      )}
    </>
  );
};

export const CustomLinkExtension = TiptapLink.extend<LinkOptions>({
  addMarkView() {
    return ReactMarkViewRenderer(NewLinkMarkView)
  }
})