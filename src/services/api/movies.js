import api from '@/services/api/client';

const END_POINT = '/movies';
export async function getMovies(params) {
  return api.get(END_POINT, params);
}

export async function getMovie(movieId, params) {
  return api.get([END_POINT, movieId].join('/'), params);
}

export async function getMoviesByUser(userId, params) {
  return api.get(`/users/${userId}/movies`, params);
}
