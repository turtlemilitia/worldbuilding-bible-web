import { marked } from 'marked'
// import ideaListExtension from './markedExtensions/ideaListExtension'
import ideaListItemExtension from './markedExtensions/ideaListItemExtension'

marked.use({
  renderer: {
    list (body, isOrdered, start) {
      if (isOrdered) {
        const startAttr = start !== 1 ? `start="${start}"` : ''
        return `<ol ${startAttr}>
${body}</ol>
`
      }
      debugger;
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
    // ideaListExtension,
    ideaListItemExtension
  ]
})
