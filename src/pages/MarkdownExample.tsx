import { FloatingBox } from '@/components/FloatingBox'
import { Editor } from '@/components/Forms/Fields/Editor'

const content = `
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6
A paragraph can use **bold** (Ctrl/Cmd+B), _italic_ (Ctrl/Cmd+I) or underlined (Ctrl/Cmd+S)
> You can also highlight things inside a quotation box by using ">"
*  You may also use bullet points;
   * And sub-bullets if you press TAB
- [ ] Checkmarks (which you can click on
- [X] Checked checkmarks
1. Numbered
2. And you only need to "Enter" to start a new line
   * And if you tap TAB button, you can start sub-bullets
* And what's new, we have icons for more **visual** notes
- [d] Descriptions
- [h] History/Past stuff
- [i] Information
- [I] Ideas!
- [k] Key points
- [l] Locations
- [L] Locked?
- [m] Music or sounds
- [p] Notes
- [P] People / Fingerprints
- [r] Dice rolls ;)
- [s] Swords or combat encounter
- [S] Secret shhh
- [w] Wand for magic
- [?] Questions?
- [!] Important stuff!!
- ["] Dialogue
- [*] Highlights
- [$] Treasure
- [<3] And loooove

> ... Coming later:
> - [*] General improvements as it can be a little finicky, specially to do with paragraphs
> - [*] Links
> - [*] Tables
> - [*] Embed images
> - [i] And yes, you can use any of the above inside a quotation box
`

const MarkdownExample = () => {


  return (
    <div className={'flex justify-center mt-14 p-10'}>
      <FloatingBox color={'dark'}>
        <div className={'max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:grid lg:gap-8 lg:grid-cols-12 lg:items-center'}>
          <div className={'relative row-start-1 col-start-7 col-span-6'}>
            <pre className={'whitespace-pre-wrap'}>{content}</pre>
          </div>
          <div className={'relative row-start-1 col-start-1 col-span-6'}>
            <Editor initialValue={content} canEdit={false}/>
          </div>
        </div>
      </FloatingBox>
    </div>
  )
}

export default MarkdownExample;