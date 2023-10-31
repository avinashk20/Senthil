import { json } from "react-router-dom";

export default async function loader({ params }) {
  const movieId = params.id;
  const response = await fetch("http://localhost:8000/movie/" + movieId);
  if (!response.ok) {
    throw json("failed to fetch data", { status: 500 });
  }
  return response;
}
