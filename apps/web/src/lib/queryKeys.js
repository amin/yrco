export const queryKeys = {
  me: ['me'],
  user: (username) => ['users', username],
  users: (search) => ['users', search],
  traits: ['traits'],
}
