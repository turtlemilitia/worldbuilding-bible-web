import { marked } from 'marked'

const ideaListItemExtension: marked.TokenizerAndRendererExtension = {
  name: 'ideaListItem',
  level: 'block',                                 // Is this a block-level or inline-level tokenizer?
  start: (src: string) => src.match(/^([*\-.+]\s*)?\[(?<type>[iIkl?!"*$])]\s*([^:\n]*(?:\n|$))$/)?.index,    // Hint to Marked.js to stop and check for a match
  tokenizer (src: string) {
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

export default ideaListItemExtension;