import { marked } from 'marked'

marked.use({
  renderer: {
    list (body, isOrdered, start) {
      if (isOrdered) {
        const startAttr = start !== 1 ? `start="${start}"` : ''
        return `<ol ${startAttr}>
${body}</ol>
`
      }
      let taskListAttr: string
      if (body.startsWith('<li data-task-list-item ')) {
        taskListAttr = 'data-task-list'
      } else if (body.startsWith('<li data-idea-list-item ')) {
        taskListAttr = 'data-idea-list'
      } else {
        taskListAttr = ''
      }
      return `<ul ${taskListAttr}>
${body}</ul>
`
    },
    listitem (this, text, isTask, isChecked) {
      if (!isTask) {

        const regex = /<p>(\s*\[(i?|I|k|l|\?|!|"|\*|\$)]\s*)(.*?)<\/p>/;
        const match = regex.exec(text);

        if (match) {
          const exclamation = match[2]; // Capture the "!"
          return `<li data-task-list-item data-idea-list-item data-idea-type="${exclamation}">${text.replace(match[1], '')}</li>`; // Remove "[!]"
        }

        return `<li>${text}</li>
`
      }
      const checkedAttr = isChecked ? 'data-checked' : ''
      return `<li data-task-list-item ${checkedAttr}>${text}</li>
`
    }
  },
  extensions: [
    {
      name: 'ideaList',
      level: 'block',
      start: (src: string) => src.match(/^ *([*\-.+]\s*)?\[(?<type>[iIkl?!"*$])]\s*([^:\n]*(?:\n|$))/)?.index,
      tokenizer (src, tokens) {
        const rule = /^( *([*\-.+]\s*)?\[[iIkl?!"*$]]\s*([^:\n]*(?:\n|$)))+/  // Regex for the complete token, anchor to string start
        const match = rule.exec(src)
        if (match) {
          const token = {        // Token to generate
            type: 'ideaList',                         // Should match "name" above
            raw: match[0],                                // Text to consume from the source
            text: match[0].trim(),                        // Additional custom properties
            tokens: []
          }
          this.lexer.inline(token.text, token.tokens);    // Queue this data to be processed for inline tokens
          return token;
        }
      },
      renderer (token) {
        return `<ul data-idea-list>${this.parser.parseInline(token.tokens || [])}\\n</ul>`
      }
    },
    {
      name: 'ideaListItem',
      level: 'block',                                 // Is this a block-level or inline-level tokenizer?
      start: (src) => src.match(/^([*\-.+]\s*)?\[(?<type>[iIkl?!"*$])]\s*([^:\n]*(?:\n|$))$/)?.index,    // Hint to Marked.js to stop and check for a match
      tokenizer (src) {
        const rule = /^ *([*\-.+]\s*)?\[(?<type>[iIkl?!"*$])]\s*([^:\n]*(?:\n|$))/  // Regex for the complete token, anchor to string start
        const match = rule.exec(src)
        if (match) {
          const text = match[3].trim();
          const top = this.lexer.state.top;
          this.lexer.state.top = true;
          // @ts-ignore
          const tokens = this.lexer.blockTokens(text);
          this.lexer.state.top = top;
          return {        // Token to generate
            type: 'ideaListItem',                         // Should match "name" above
            raw: match[0],                                // Text to consume from the source
            text,                        // Additional custom properties
            ideaType: match.groups?.type,                 // Additional custom properties
            tokens: tokens
          }
        }
      },
      renderer (token) {
        // @ts-ignore
        return `<li data-idea-list-item data-idea-type="${token.ideaType}">${this.parser.parse(token.tokens)}</li>` // parseInline to turn child tokens into HTML
      }
    }
  ]
})
