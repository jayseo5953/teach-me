import api from '@/services/api/client';

const END_POINT = '/api/auth';

export async function login(email, password) {
  return api.post([END_POINT, 'login'].join('/'), { email, password });
}

export async function signup(email, password) {
  return api.post([END_POINT, 'register'].join('/'), { email, password });
}
