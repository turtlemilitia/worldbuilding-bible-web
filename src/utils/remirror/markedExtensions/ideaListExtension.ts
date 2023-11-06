import { marked } from 'marked'

const ideaListExtension: marked.TokenizerAndRendererExtension = {
  name: 'ideaList',
  level: 'block',
  start: (src: string) => src.match(/^\s*[*\-.+]\s?\[[iIkl?!"*$]]\s*[^:\n]*(?:\n|$)/)?.index,
  tokenizer (src, tokens) {
    const rule = /^(\s*([*\-.+]\s*)\[[iIkl?!"*$]])\s*([^\n]*(?:\n|$))/  // Regex for the complete token, anchor to string start
    let match = rule.exec(src)

    // START
    if (match) {
      let raw, indent, i, blankLine, endsWithBlankLine,
        line, nextLine, rawLine, itemContents, endEarly;

      const list: marked.Tokens.Generic = {
        type: 'list',
        raw: '',
        tokens: []
      };

      // Get next list item
      const itemRegex = /^(\s{0,3}[*\-.+]\s\[[iIkl?!"*$]])(?:\s[^\n]*)?(?:\n|$)/gm;

      // Check if current bullet point can start a new List Item
      while (src) {
        endEarly = false;
        if (!(match = itemRegex.exec(src))) {
          break;
        }

        if (/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/.test(src)) { // End list if bullet was actually HR (possibly move into itemRegex?)
          break;
        }

        raw = match[0];
        src = src.substring(raw.length);

        line = match[2].split('\n', 1)[0].replace(/^\t+/, (t) => ' '.repeat(3 * t.length));
        nextLine = src.split('\n', 1)[0];

        indent = match[2].search(/[^ ]/); // Find first non-space char
        indent = indent > 4 ? 1 : indent; // Treat indented code blocks (> 4 spaces) as having only 1 indent
        itemContents = line.slice(indent);
        indent += match[1].length;

        blankLine = false;

        if (!line && /^ *$/.test(nextLine)) { // Items begin with at most one blank line
          raw += nextLine + '\n';
          src = src.substring(nextLine.length + 1);
          endEarly = true;
        }

        if (!endEarly) {
          const nextBulletRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ \t][^\\n]*)?(?:\\n|$))`);
          const hrRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`);
          const fencesBeginRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}(?:\`\`\`|~~~)`);
          const headingBeginRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}#`);

          // Check if following lines should be included in List Item
          while (src) {
            rawLine = src.split('\n', 1)[0];
            nextLine = rawLine;

            // End list item if found code fences
            if (fencesBeginRegex.test(nextLine)) {
              break;
            }

            // End list item if found start of new heading
            if (headingBeginRegex.test(nextLine)) {
              break;
            }

            // End list item if found start of new bullet
            if (nextBulletRegex.test(nextLine)) {
              break;
            }

            // Horizontal rule found
            if (hrRegex.test(src)) {
              break;
            }

            if (nextLine.search(/[^ ]/) >= indent || !nextLine.trim()) { // Dedent if possible
              itemContents += '\n' + nextLine.slice(indent);
            } else {
              // not enough indentation
              if (blankLine) {
                break;
              }

              // paragraph continuation unless last line was a different block level element
              if (line.search(/[^ ]/) >= 4) { // indented code block
                break;
              }
              if (fencesBeginRegex.test(line)) {
                break;
              }
              if (headingBeginRegex.test(line)) {
                break;
              }
              if (hrRegex.test(line)) {
                break;
              }

              itemContents += '\n' + nextLine;
            }

            if (!blankLine && !nextLine.trim()) { // Check if current line is blank
              blankLine = true;
            }

            raw += rawLine + '\n';
            src = src.substring(rawLine.length + 1);
            line = nextLine.slice(indent);
          }
        }

        list.tokens?.push({
          type: 'list_item',
          raw,
          task: false,
          checked: false,
          loose: false,
          text: itemContents,
          tokens: []
        });

        list.raw += raw;
      }

      // Do not consume newlines at end of final item. Alternatively, make itemRegex *start* with any newlines to simplify/speed up endsWithBlankLine logic
      // @ts-ignore
      list.tokens[list.tokens.length - 1].raw = (raw?.trimRight() || '');
      // @ts-ignore
      list.tokens[list.tokens.length - 1].text = (itemContents?.trimRight() || '');
      list.raw = list.raw.trimRight();

      const l = list.items.length;

      // Item child tokens handled here at end because we needed to have the final item to trim it first
      for (i = 0; i < l; i++) {
        this.lexer.state.top = false;
        list.items[i].tokens = this.lexer.blockTokens(list.items[i].text, []);
      }

      // Set all items to loose if list is loose
      if (list.loose) {
        for (i = 0; i < l; i++) {
          list.items[i].loose = true;
        }
      }

      return list;
    }
  },
  renderer (token) {
    return `<ul data-idea-list>${this.parser.parseInline(token.tokens || [])}\\n</ul>`
  }
}

export default ideaListExtension;