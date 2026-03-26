const TTL_MS = 24 * 60 * 60 * 1000;

export function createCache() {
  let store = null;
  let expiresAt = null;

  return {
    get: () => store,
    set: (value) => {
      store = value;
      expiresAt = Date.now() + TTL_MS;
    },
    clear: () => {
      store = null;
      expiresAt = null;
    },
    has: () => store !== null && Date.now() < expiresAt,
  };
}
