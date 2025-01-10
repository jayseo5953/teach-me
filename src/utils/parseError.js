export function parseError(e) {
  let message =
    e.response?.data?.message || e.response?.data?.error || e.message;
  message = message.replaceAll('_', ' ');
  return message;
}
