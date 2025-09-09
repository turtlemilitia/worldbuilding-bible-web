import { hasMarkdownManager, TDataManager } from './DataManagers'
import { TGenericPostBasic } from '@/types'

export type TMarkdownHandler = {
  export: () => Promise<void>,
  canExport: boolean,
}

type TProps<TEntity> = {
  manager: TDataManager<TEntity, any> & Partial<hasMarkdownManager>
}
const useMarkdownHandler = <T extends TGenericPostBasic> ({ manager }: TProps<T>): TMarkdownHandler => {


  const canExport = !!manager.entity?.id && !!manager.markdown

  const exportMarkdown = async () => {
    if (!manager.markdown || !manager.entity) {
      return;
    }
    manager.markdown.exportMarkdown(manager.entity.id)
  }

  return {
    canExport,
    export: exportMarkdown
  }
}

export default useMarkdownHandler;