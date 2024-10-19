import {
  TCanHaveImages,
  TCanHaveNotes,
  TGenericPost,
  TPlayerTools,
} from '@/types'

export type TSession = TGenericPost & TPlayerTools & TCanHaveImages & TCanHaveNotes & {
  session_number: number
  scheduled_at: string
  duration: number
}