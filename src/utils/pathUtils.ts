import { mapSingular } from '@/utils/dataUtils'
import { TDialogTypes } from '@/hooks/fieldTools/types'

const ALLOWED_DIALOG_TYPES: TDialogTypes[] = [
  'note',
  'encounter',
  'faction',
  'language',
  'location',
  'character',
  'item',
  'story',
  'quest',
  'session',
  'scene',
]

/**
 * Extracts the dialog target (type + id) from a route/path.
 *
 * Examples:
 *  - "/campaigns/1/foo/characters/4/john-doe"  => { type: 'character', id: 4 }
 *  - "compendia/12/dragons/notes/99/any"       => { type: 'note', id: 99 }
 *  - "/notes/123"                               => { type: 'note', id: 123 }
 *
 * It scans the path from right-to-left and returns the **last** matching entity pair
 * (plural-segment + numeric id). Plural handling uses mapSingular() already defined in this file.
 */
export const extractDialogTargetFromPath = (
  path: string,
): { type: TDialogTypes; id: number } | null => {
  if (!path) return null

  // drop query/hash, trim slashes, split into segments
  const cleaned = path
    .split('?')[0]
    .split('#')[0]
    .replace(/^\/+|\/+$/g, '')

  if (!cleaned) return null

  const segments = cleaned.split('/')

  // look for the last occurrence of a known plural segment followed by a numeric id
  for (let i = segments.length - 2; i >= 0; i--) {
    const seg = String(segments[i] || '').toLowerCase()
    const singular = mapSingular(seg)

    if ((ALLOWED_DIALOG_TYPES as readonly string[]).includes(singular as TDialogTypes)) {
      const idStr = String(segments[i + 1] || '')
      if (/^\d+$/.test(idStr)) {
        return { type: singular as TDialogTypes, id: Number(idStr) }
      }
    }
  }

  return null
}