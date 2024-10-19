import { TGenericPost, TGenericPostBasic, TPlayerTools } from '@/types/Generic'
import { TCanHaveImages } from '@/types/Image'

export type TCanHaveNotes = {
  notes?: TNote[];
}

export type TNotebook = TGenericPost & TPlayerTools & TCanHaveImages & {
  notes: TGenericPostBasic[]
}

export type TNote = TGenericPost & TPlayerTools & TCanHaveImages & {
  notebook: TNotebook|null
}