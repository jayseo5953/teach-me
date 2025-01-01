import { useAuth } from '@/contexts/AuthContext';
import { getMoviesByUser } from '@/services/api/movies';
import { useEffect, useState } from 'react';

function Dashboard() {
  const { user } = useAuth();
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    (async function () {
      const { data } = await getMoviesByUser(user.id);
      setMovies(data.movies);
    })();
  }, [user.id]);

  return (
    <>
      <h1>This is Dashboard</h1>
      <h2>Hello, {user.firstName}</h2>

      <h3>User movies</h3>
      {movies.map((movie) => (
        <div key={movie.id}>{movie.title}</div>
      ))}
    </>
  );
}

export default Dashboard;
