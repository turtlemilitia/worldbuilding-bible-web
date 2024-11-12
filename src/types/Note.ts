import { TGenericPost, TPlayerTools } from '@/types/Generic'
import { TCanHaveImages } from '@/types/Image'

export type TCanHaveNotes = {
  notes?: TNote[];
}

export type TNote = TGenericPost & TPlayerTools & TCanHaveImages & {
  parent?: TNote
  children?: TNote[]
}