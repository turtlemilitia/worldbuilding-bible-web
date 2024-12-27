import { Plugin } from 'unified'
import { visit } from 'unist-util-visit'

const ideaListPlugin: Plugin = () => {
  return (tree) => {
    visit(tree, 'listItem', (node: any, index, parent) => {
      const firstChild = node.children[0];

      // Check if the first child is a paragraph and has text
      if (firstChild.type === 'paragraph' && firstChild.children[0] && firstChild.children[0].type === 'text') {
        const text = firstChild.children[0].value;

        // Regular expression to match your custom list markers
        const match = text.match(/^\[(d|D|e|h|i|I|k|l|L|m|p|P|r|s|S|w|\?|!|"|\*|\$|<3)]\s*(.*)$/);

        if (match) {
          if (parent && parent.type === 'list') {
            // Here you can modify the parent `ul` node
            // For example, adding a custom class
            parent.data = parent.data || {};
            parent.data.hProperties = parent.data.hProperties || {};
            parent.data.hProperties['data-idea-list'] = true;
          }

          // Remove the custom marker from the text
          firstChild.children[0].value = match[2];

          // Add a custom data attribute to the node
          node.data = node.data || {};
          node.data.hProperties = node.data.hProperties || {};
          node.data.hProperties['data-idea-list-item'] = true;
          node.data.hProperties['data-idea-type'] = match[1];

        }

        if (node.checked !== null) {
          if (parent && parent.type === 'list') {
            // Here you can modify the parent `ul` node
            // For example, adding a custom class
            parent.data = parent.data || {};
            parent.data.hProperties = parent.data.hProperties || {};
            parent.data.hProperties['data-task-list'] = true;
          }

          // Add a custom data attribute to the node
          node.data = node.data || {};
          node.data.hProperties = node.data.hProperties || {};
          node.data.hProperties['data-task-list-item'] = true;
          node.data.hProperties['data-checked'] = node.checked;

        }
      }
    });
  };
}

export default ideaListPlugin;