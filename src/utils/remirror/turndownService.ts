import { ErrorConstant, invariant, isElementDomNode } from '@remirror/core'
import TurndownService from 'turndown'

const isControllerHeadingCell = (cell: any) => isElementDomNode(cell) && cell.matches('th[data-controller-cell]')

const cell = (content: string, node: TurndownService.Node) => {
  var _a;
  const childNodes = [];
  // @ts-ignore
  for (const n of ((_a = node.parentNode) == null ? void 0 : _a.childNodes) ?? []) {
    if (isControllerHeadingCell(n)) {
      continue;
    }
    childNodes.push(n);
  }
  const index = childNodes.indexOf(node);
  const prefix = index === 0 ? "| " : " ";
  return `${prefix + content.trim()} |`;
}


function isHeadingRow(tableRow: TurndownService.Node) {
  const parentNode = tableRow.parentNode;
  if (!isElementDomNode(parentNode)) {
    return false;
  }
  if (parentNode.nodeName === "THEAD") {
    return true;
  }
  if (parentNode.nodeName !== "TABLE" && !isFirstTbody(parentNode)) {
    return false;
  }
  // @ts-ignore
  const childNodes = [...tableRow.childNodes];
  return childNodes.every((n) => n.nodeName === "TH") && childNodes.some((n) => !!n.textContent);
}

function isNestedTable(element: HTMLElement) {
  const currentTable = element.closest("table");
  if (!currentTable) {
    return false;
  }
  const { parentNode } = currentTable;
  if (!parentNode) {
    return true;
  }
  // @ts-ignore
  return !!parentNode.closest("table");
}

function isFirstTbody(element: HTMLElement) {
  var _a;
  if (element.nodeName !== "TBODY") {
    return false;
  }
  const previousSibling = element.previousSibling;
  if (!previousSibling) {
    return true;
  }
  return isElementDomNode(previousSibling) && previousSibling.nodeName === "THEAD" && !((_a = previousSibling.textContent) == null ? void 0 : _a.trim());
}

function isControllerHeadingRow(tableRow: { parentNode: any; childNodes: any; }) {
  const parentNode = tableRow.parentNode;
  if (!isElementDomNode(parentNode)) {
    return false;
  }
  if (parentNode.nodeName !== "TABLE" && !isFirstTbody(parentNode)) {
    return false;
  }
  const childNodes = [...tableRow.childNodes];
  return childNodes.every((n) => isControllerHeadingCell(n));
}

export const turndownService = new TurndownService({
  codeBlockStyle: 'fenced',
  headingStyle: 'atx'
})
  .addRule('taskListItems', {
    filter: (node) => {
      return node.nodeName === 'LI' && node.hasAttribute('data-task-list-item')
    },
    replacement: (content, node) => {
      content = content
        .replace(/^\n+/, '') // remove leading newlines
        .replace(/\n+$/, '\n') // replace trailing newlines with just a single one
        .replace(/\n/gm, '\n    '); // indent
      const isChecked: boolean = 'hasAttribute' in node ? node.hasAttribute('data-checked') : false
      return `- ${isChecked ? '[x]' : '[ ]'} ${content.trimStart()}` + (node.nextSibling && !/\n$/.test(content) ? '\n' : '')
    }
  })
  .addRule('ideaListItems', {
    filter: (node) => {
      return node.nodeName === 'LI' && node.hasAttribute('data-idea-list-item')
    },
    replacement: (content, node) => {
      content = content
        .replace(/^\n+/, '') // remove leading newlines
        .replace(/\n+$/, '\n') // replace trailing newlines with just a single one
        .replace(/\n/gm, '\n    '); // indent
      const idea: string = 'getAttribute' in node ? node.getAttribute('data-idea-type') || 'i' : 'i'
      return `+ [${idea}] ${content.trimStart()}` + (node.nextSibling && !/\n$/.test(content) ? '\n' : '')
    }
  })
  .addRule('tableCell', {
    filter: ['th', 'td'],
    replacement: (content, node) => {
      if (isControllerHeadingCell(node)) {
        return ''
      }
      return cell(content, node)
    }
  })
  .addRule('tableRow', {
    filter: 'tr',
    replacement: (content, node) => {
      let borderCells = ''
      const alignMap = { left: ':--', right: '--:', center: ':-:' }
      // @ts-ignore
      const childNodes = [...node.childNodes].filter((n) => !isControllerHeadingCell(n))
      if (isHeadingRow(node)) {
        for (const childNode of childNodes) {
          if (!isElementDomNode(childNode)) {
            continue
          }
          let border = '---'
          const align = (childNode.getAttribute('align') ?? '').toLowerCase()
          if (align) {
            // @ts-ignore
            border = alignMap[align] || border
          }
          borderCells += cell(border, childNode)
        }
      }
      return `
${content}${borderCells ? `
${borderCells}` : ''}`
    }
  })
  .addRule('table', {
    // Only convert tables with a heading row. Tables with no heading row are kept
    // using `keep` (see below).
    filter: (node) => {
      if (node.nodeName !== 'TABLE') {
        return false
      }
      if (isNestedTable(node)) {
        return false
      }
      // @ts-ignore
      const rows = [...node.rows].filter((r) => {
        return !isControllerHeadingRow(r)
      })
      return isHeadingRow(rows[0])
    },
    replacement: (content) => {
      content = content.replace('\n\n', '\n')
      return `

${content}

`
    }
  })
  .addRule('tableSection', {
    filter: ['thead', 'tbody', 'tfoot'],
    replacement: function (content) {
      return content
    }
  })
  .keep((node) => {
    // @ts-ignore
    return node.nodeName === 'TABLE' && !isHeadingRow(node.rows[0])
  })
  .keep((node) => {
    return node.nodeName === 'TABLE' && isNestedTable(node)
  })
  .addRule('strikethrough', {
    // @ts-ignore
    filter: ['del', 's', 'strike'],
    replacement: function (content) {
      return `~${content}~`
    }
  })
  .addRule('fencedCodeBlock', {
    filter: (node, options) => {
      return Boolean(options.codeBlockStyle === 'fenced' && node.nodeName === 'PRE' && node.firstChild && node.firstChild.nodeName === 'CODE')
    },
    replacement: (_, node, options) => {
      var _a, _b
      invariant(isElementDomNode(node.firstChild), {
        code: ErrorConstant.EXTENSION,
        message: `Invalid node \`${(_a = node.firstChild) == null ? void 0 : _a.nodeName}\` encountered for codeblock when converting html to markdown.`
      })
      const className = node.firstChild.getAttribute('class') ?? ''
      const language = ((_b = className.match(/(?:lang|language)-(\S+)/)) == null ? void 0 : _b[1]) ?? node.firstChild.getAttribute('data-code-block-language') ?? ''
      return `

${options.fence}${language}
${node.firstChild.textContent}
${options.fence}

`
    }
  })
