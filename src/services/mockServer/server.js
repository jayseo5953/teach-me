import { belongsTo, createServer, hasMany, Model } from 'miragejs';
import seeds from '@/services/mockServer/seeds';

const API_URL = import.meta.env.VITE_API_URL;

export default function createMockServer() {
  const server = createServer({
    seeds(server) {
      server.db.loadData(seeds);
    },

    routes() {
      this.urlPrefix = API_URL;

      // auth
      this.post('/auth/login', (/* _schema, { requestBody } */) => {
        // const { email, password } = JSON.parse(requestBody);
        // TODO: use the provided input to authenticate

        return true;
      });

      // users
      this.get('/users', (schema, _request) => {
        return schema.db.users;
      });
      this.get('/users/:id', (schema, request) => {
        const id = request.params.id;
        return schema.db.users.find(id);
      });
      this.post('/users', (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        return schema.db.users.insert(attrs);
      });
    },
  });

  return server;
}
