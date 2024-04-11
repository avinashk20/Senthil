import { json } from "react-router-dom";

export default async function loader({ params }) {
  const query = params.query;

  const response = await fetch("http://localhost:8000/search?query=" + query);
  if (!response.ok) {
    throw json("failed to fetch data", { status: 500 });
  }
  return response;
}

