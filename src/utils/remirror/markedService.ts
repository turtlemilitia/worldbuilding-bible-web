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
      name: 'ideaListItem',
      level: 'block',                                 // Is this a block-level or inline-level tokenizer?
      start (src) { return src.match(/^\*\s+(\[(i?|I|k|l|\?|!|"|\*|\$)]\s)$/)?.index },    // Hint to Marked.js to stop and check for a match
      tokenizer (src, tokens) {
        const rule = /^[*\-.+]*\s*\[(?<type>(?:i|I|k|l|\?|!|"|\*|\$))]\s*([^:\n]*(?:\n|$))/  // Regex for the complete token, anchor to string start
        const match = rule.exec(src)
        if (match) {
          const token = {        // Token to generate
            type: 'ideaListItem',                         // Should match "name" above
            raw: match[0],                                // Text to consume from the source
            text: match[2].trim(),                        // Additional custom properties
            ideaType: match.groups?.type,                 // Additional custom properties
            tokens: []
          }
          this.lexer.inline(token.text, token.tokens)    // Queue this data to be processed for inline tokens
          return token
        }
      },
      renderer (token) {
        // @ts-ignore
        return `<li data-idea-list-item data-idea-type="${token.ideaType}">${this.parser.parseInline(token.tokens)}</li>` // parseInline to turn child tokens into HTML
      }
    }
  ]
})