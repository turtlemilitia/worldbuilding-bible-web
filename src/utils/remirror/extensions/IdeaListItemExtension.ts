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
import { AnyExtension, DOMCompatibleAttributes } from 'remirror'
import { ComponentType } from 'react'
import { NodeViewComponentProps } from '@remirror/react'
import IdeaNode from '../nodes/IdeaNode'
import { ListItemSharedExtension, wrapSelectedItems } from 'remirror/extensions'
import { wrappingInputRule } from 'prosemirror-inputrules'
import { assertGet } from '@remirror/core-helpers'
import { InputRule } from '@remirror/pm/inputrules'

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

  ReactComponent: ComponentType<NodeViewComponentProps> = IdeaNode;

  createNodeSpec (extra: ApplySchemaAttributes, override: NodeSpecOverride): NodeExtensionSpec {
    return {
      content: "paragraph block*",
      defining: true,
      draggable: false,
      ...override,
      attrs: {
        ...extra.defaults(),
        closed: { default: false },
        nested: { default: false }
      },
      parseDOM: [
        {
          tag: 'li[data-idea-list-item]',
          getAttrs: extra.parse,
          priority: ExtensionPriority.Highest
        },
        ...override.parseDOM ?? []
      ],
      toDOM: node => {
        return ['span', {...extra.dom(node)}, 0];
      }
    }
  }

  createExtensions(): AnyExtension[] {
    return [new ListItemSharedExtension()];
  }

  createInputRules (): InputRule[] {
    const regexp = /^\s*(\[i]\s)$/;
    return [
      wrappingInputRule(regexp, this.type),
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
        return tr;
      })
    ];
  }


}