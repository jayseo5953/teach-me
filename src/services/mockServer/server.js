import {
  belongsTo,
  createServer,
  hasMany,
  Model,
  Factory,
  Response,
} from 'miragejs';
import seeds from '@/services/mockServer/seeds';

const API_URL = import.meta.env.VITE_API_URL;

/**
 * For more information about routing and data layer of mirage.js
 * See: https://miragejs.com/docs/main-concepts/route-handlers
 */

const HARD_CODED_PASSWORD = 'password';
export default function createMockServer() {
  const server = createServer({
    logging: true,

    // models enables using schema and relaltionship
    models: {
      user: Model.extend({ movies: hasMany() }),
      movie: Model.extend({ user: belongsTo() }),
    },

    // for creating dynamic mock content
    factories: {
      movie: Factory.extend({
        // could use faker.js for contenteww
        title: (i) => `Movi Title ${i + 1}`,
        content: (i) => `Content for movie ${i + 1}`,
      }),
    },

    // use server.create and assign models to another model to create relationship instead of setting ids in the seeds file to avoid typos
    seeds(server) {
      const user1 = server.create('user', seeds.users[0]);
      const user2 = server.create('user', seeds.users[1]);

      server.createList('movie', 2, { user: user1 });
      server.createList('movie', 2, { user: user2 });
    },

    routes() {
      this.urlPrefix = API_URL;

      // auth
      this.post('/auth/login', (schema, { requestBody }) => {
        const { email, password } = JSON.parse(requestBody);
        const userFound = schema.users.findBy({ email });
        const isPasswordMatch = password === HARD_CODED_PASSWORD;

        if (!userFound || !isPasswordMatch) {
          return new Response(
            401,
            { 'Content-Type': 'application/json' },
            { error: 'Invalid username or password' }
          );
        }

        return userFound;
      });

      // users
      this.resource('users'); // shorthands for below if need to customize one (adding filters), uncomment it
      // this.get('/users');
      // this.get('/users/:id');
      // this.post('/users');
      // this.patch('/users/:id');
      // this.put('/users/:id');
      // this.del('/users/:id');

      // movies
      this.resource('movies');

      // nested routes need to be created separately
      this.get('/users/:userId/movies', (schema, request) => {
        const { userId } = request.params;
        const user = schema.users.find(userId);
        return user ? user.movies : [];
      });
    },
  });

  return server;
}
