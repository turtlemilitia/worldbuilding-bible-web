import { TCanHaveImages, TGenericPost, TPlayerTools } from '@/types'

export type TSystem = TGenericPost & TPlayerTools & TCanHaveImages & {
  id: number;
  slug: string;
  name: string;
  content: string;
}