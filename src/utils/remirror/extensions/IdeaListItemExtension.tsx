import ReactDOM from 'react-dom'
import {
  ApplySchemaAttributes,
  extension,
  ExtensionTag,
  NodeExtension,
  ExtensionTagType,
  NodeExtensionSpec,
  NodeSpecOverride,
  ExtensionPriority,
} from '@remirror/core'
import { AnyExtension, getMatchString } from 'remirror'
import IdeaNode from '../nodes/IdeaNode'
import { ListItemSharedExtension, wrapSelectedItems } from 'remirror/extensions'
import { wrappingInputRule } from 'prosemirror-inputrules'
import { assertGet } from '@remirror/core-helpers'
import { InputRule } from '@remirror/pm/inputrules'
import { findParentNodeOfType, isElementDomNode } from '@remirror/core-utils'

export class IdeaListExtension extends NodeExtension {
  get name() {
    return 'ideaList'
  }

  createTags (): ExtensionTagType[] {
    return [ExtensionTag.Block, ExtensionTag.ListContainerNode]
  }

  createNodeSpec (extra: ApplySchemaAttributes, override: NodeSpecOverride): NodeExtensionSpec {
    return {
      content: 'ideaListItem+',
      ...override,
      attrs: extra.defaults(),
      parseDOM: [
        {
          tag: "ul[data-idea-list]",
          getAttrs: extra.parse,
          // Make sure it has higher priority then BulletListExtension's parseDOM by default
          priority: ExtensionPriority.Medium
        },
        ...override.parseDOM ?? []
      ],
      toDOM: (node) => ["ul", { ...extra.dom(node), "data-idea-list": "" }, 0]
    }
  }

  createExtensions (): AnyExtension[] {
    return [new IdeaListItemExtension({})]
  }
}

export interface IdeaListItemOptions {}
@extension<IdeaListItemOptions>({ defaultOptions: {} })
export class IdeaListItemExtension extends NodeExtension<IdeaListItemOptions> {
  get name() {
    return 'ideaListItem' as const;
  }

  createTags (): ExtensionTagType[] {
    return [ExtensionTag.ListItemNode]
  }

  createNodeSpec (extra: ApplySchemaAttributes, override: NodeSpecOverride): NodeExtensionSpec {
    return {
      content: "paragraph block*",
      defining: true,
      draggable: false,
      ...override,
      attrs: {
        ...extra.defaults(),
        ideaType: { default: 'i' }
      },
      parseDOM: [
        {
          tag: 'li[data-idea-list-item]',
          getAttrs: (node) => {
            return {
              ideaType: isElementDomNode(node) ? node.getAttribute("data-idea-type") : 'i',
              ...extra.parse(node)
            };
          },
          priority: ExtensionPriority.Highest
        },
        ...override.parseDOM ?? []
      ],
      // @ts-ignore
      toDOM: node => {
        let dom = document.createElement('div')

        ReactDOM.render(<IdeaNode type={node.attrs.ideaType}/>, dom)

        return [
          'li',
          {
            ...extra.dom(node),
            'data-idea-list-item': '',
            'data-idea-type': node.attrs.ideaType ?? 'i',
            class: 'flex-column flex items-start gap-2'
          },
          dom,
          [
            'span',
            0
          ]
        ];
      }
    }
  }

  createExtensions(): AnyExtension[] {
    return [new ListItemSharedExtension()];
  }

  createInputRules (): InputRule[] {
    const regexp = /^[*\-.+]*\s*(\[(i?|I|k|l|\?|!|"|\*|\$|<3|p|m|w|h)]\s)$/;
    return [
      wrappingInputRule(regexp, this.type, (match) => {
        return { ideaType: getMatchString(match, 2) }
      }),
      new InputRule(regexp, (state, match, start, end) => {
        const tr = state.tr;
        tr.deleteRange(start, end);
        const canUpdate = wrapSelectedItems({
          listType: assertGet(this.store.schema.nodes, "ideaList"),
          itemType: this.type,
          tr
        });
        if (!canUpdate) {
          return null;
        }
        const ideaType = getMatchString(match, 2);
        const found = findParentNodeOfType({ selection: tr.selection, types: this.type });
        if (found) { // todo: answer what is this doing?
          tr.setNodeMarkup(found.pos, void 0, { ideaType });
        }
        return tr;
      })
    ];
  }


}