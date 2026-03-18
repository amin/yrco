import { useSearchParams } from "react-router-dom";

export default function Error() {
  const [searchParams] = useSearchParams();
  const message = searchParams.get("message") ?? "Something went wrong";

  return (
    <div>
      <p>{message}</p>
      <a href="/">Try again</a>
    </div>
  );
}
