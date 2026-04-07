export const queryKeys = {
  me: ['me'],
  user: (username) => ['user', username],
  users: (search) => ['users', search],
  traits: ['traits'],
  connections: ['connections'],
}
