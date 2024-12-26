import { createServer } from "miragejs";

const API_URL = import.meta.env.VITE_API_URL;

export default function createMockServer() {
  createServer({
    routes() {
      this.urlPrefix = API_URL;

      this.get("/users", () => {
        return {
          users: [
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
          ],
        };
      });
    },
  });
}
