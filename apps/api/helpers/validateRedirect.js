export const validateRedirect = (redirect) =>
  redirect?.startsWith("/") && !redirect.startsWith("//") && redirect.length <= 200
    ? redirect
    : null;
