/** Authenticated API calls — always send session cookies. */
export function authedFetch(input: RequestInfo | URL, init?: RequestInit) {
  return fetch(input, { credentials: "include", ...init });
}
