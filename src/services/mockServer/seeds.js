const seeds = {
  users: [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
    },
  ],
  movies: [
    { title: 'Interstellar', userId: 1 },
    { title: 'Inception', userId: 1 },
    { title: 'Dunkirk', userId: 2 },
  ],
};
export default seeds;
