export function createCache() {
  let store = null;

  return {
    get: () => store,
    set: (value) => { store = value; },
    clear: () => { store = null; },
    has: () => store !== null,
  };
}
