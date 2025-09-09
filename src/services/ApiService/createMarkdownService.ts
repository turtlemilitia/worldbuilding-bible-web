import api from '@/api'

export type TMarkdownApi = {
  markdown: {
    export: (id: number) => any
  }
}

export const createMarkdownService = (pluralName: string): TMarkdownApi => ({
  markdown: {
    export: async (id: number) => {
      try {
        const response = await api.get(`/api/${pluralName}/${id}/markdown`, {
          responseType: 'blob',
        });

        // Create a URL for the blob object and directly open it
        const blob = new Blob([response.data], {type: 'text/plain'});
        const blobUrl = window.URL.createObjectURL(blob);

        // Use `window.open` to trigger the download
        window.open(blobUrl);
      } catch (error) {
        console.error('Error downloading the file', error);
      }
    }
  },
})