import { createServer } from "miragejs";

const API_URL = import.meta.env.VITE_API_URL;

const mockUsers = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
  },
];

export default function createMockServer() {
  createServer({
    routes() {
      this.urlPrefix = API_URL;

      // auth
      this.post("/auth/login", (/* _schema, { requestBody } */) => {
        // const { email, password } = JSON.parse(requestBody);
        // TODO: use the provided input to authenticate

        return mockUsers[0];
      });

      // users
      this.get("/users", () => {
        return {
          users: mockUsers,
        };
      });
    },
  });
}
