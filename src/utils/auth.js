import { handleServerResponse } from "../utils/api";

const baseURL = "http://localhost:3001";

export function signUp(email, password, name, avatarURL) {
  return fetch(`${baseURL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name, avatar: avatarURL }),
  }).then(handleServerResponse);
}

export function signIn(email, password) {
  return fetch(`${baseURL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(handleServerResponse);
}

export function verifyUser(token) {
  return fetch(`${baseURL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(handleServerResponse);
}

// export default auth;
