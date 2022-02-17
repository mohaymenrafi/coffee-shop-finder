export const isEmpty = (obj) => obj && Object.keys(obj).length === 0;

export const fetcher = (url) => fetch(url).then((res) => res.json());
