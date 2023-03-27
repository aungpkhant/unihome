const BACKEND_URL =
  process.env.NODE_ENV === 'production'
    ? (process.env.BACKEND_URL as string)
    : 'http://localhost:8080';

export { BACKEND_URL };
