import api from '@/services/api/apiClient';

const END_POINT = '/users';
export async function getUsers(params) {
  return api.get(END_POINT, params);
}

export async function getUser(userId, params) {
  return api.get([END_POINT, userId].join('/'), params);
}
