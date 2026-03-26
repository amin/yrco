export const buildPostAuthRedirect = (setupComplete, username, postAuthRedirect) => {
  if (!setupComplete)
    return postAuthRedirect ? `/setup?redirect=${encodeURIComponent(postAuthRedirect)}` : "/setup";
  return postAuthRedirect || `/@${username}`;
};
