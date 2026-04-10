export function redirectToError(message = 'Something went wrong') {
  window.location.href = `/error?message=${encodeURIComponent(message)}`
}
