export const api = process.env.NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_API_URL
    : 'http://localhost:4000/';
