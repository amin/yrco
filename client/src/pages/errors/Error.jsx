import { useEffect, useState } from "react";

export default function Error() {
  const [message, setMessage] = useState("Something went wrong");

  useEffect(() => {
    const stored = localStorage.getItem("errorMessage");
    const param = new URLSearchParams(window.location.search).get("message");

    if (stored) {
      setMessage(stored);
      localStorage.removeItem("errorMessage");
    } else if (param) {
      setMessage(decodeURIComponent(param));
    }
  }, []);

  return (
    <div>
      <p>{message}</p>
      <button onClick={() => window.history.back()}>Try again</button>
    </div>
  );
}
