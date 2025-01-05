import { createServer } from 'miragejs';

const API_URL = import.meta.env.VITE_API_URL;

/**
 * For more information about routing and data layer of mirage.js
 * See: https://miragejs.com/docs/main-concepts/route-handlers
 */

export default function createMockServer() {
  const server = createServer({
    // logging: true,

    routes() {
      this.urlPrefix = API_URL;
      this.timing = 1000;
      this.namespace = 'api';

      // auth
      this.post('/texts/analyze-subject-text', (schema, { requestBody }) => {
        const { subjectText } = JSON.parse(requestBody);

        const htmlTopics = [
          'Syntax',
          'Tags',
          'Attributes',
          'Headings',
          'Paragraphs',
          'Comments',
          'Lists',
          'Links',
          'Images',
          'Tables',
          'Forms',
          'Buttons',
          'Entities',
          'Formatting',
          'Colors',
          'Styles',
          'Semantics',
          'CSS',
          'Boilerplate',
          'Doctype',
          'Head',
          'Meta',
          'Title',
          'Body',
          'Inputs',
          'Select',
          'Checkbox',
          'Textarea',
          'Div',
          'Flexbox',
          'Grid',
          'Responsive',
          'Tables',
          'Spanning',
          'SEO',
          'Accessibility',
          'Storage',
          'Drag Drop',
          'Geolocation',
          'WebSockets',
          'Sitemap',
          'Security',
        ];

        return { subject: subjectText, topics: htmlTopics };
      });
    },
  });

  return server;
}
