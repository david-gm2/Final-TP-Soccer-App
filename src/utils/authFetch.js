import { ACCESS_TOKEN_KEY } from "../constants/auth.js";

const getAccessToken = () => sessionStorage.getItem(ACCESS_TOKEN_KEY);

export const authFetch = (input, options = {}, tokenOverride) => {
  const token = tokenOverride ?? getAccessToken();
  const headers = new Headers(options.headers || {});

  if (token) headers.set("Authorization", `Bearer ${token}`);

  return fetch(input, { ...options, headers });
};

export { getAccessToken };
