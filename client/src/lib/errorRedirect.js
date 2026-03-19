export function redirectToError(message = "Something went wrong") {
  localStorage.setItem("errorMessage", message);
  window.location.href = "/error";
}
