
// Encapsulate the markdown conversion process into a separate function
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remark2rehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import ideaListPlugin from '../../../../utils/remirror/remark/ideaListPlugin'

export function convertMarkdown (markdown: string): string {
  return unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(ideaListPlugin)
    .use(remark2rehype)
    .use(rehypeStringify)
    .processSync(markdown)
    .toString()
}