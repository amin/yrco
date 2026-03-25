export const filterBySearch = (users, query) => {
  const q = query.toLowerCase();
  return users.filter((u) =>
    u.username?.toLowerCase().includes(q) ||
    u.firstName?.toLowerCase().includes(q) ||
    u.lastName?.toLowerCase().includes(q) ||
    `${u.firstName} ${u.lastName}`.toLowerCase().includes(q) ||
    u.organizationName?.toLowerCase().includes(q)
  );
};
