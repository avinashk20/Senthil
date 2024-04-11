import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RouteLayout from "./pages/RouteLayout";

import HomePage from "./pages/Home/HomePage";
import SearchResultsPage from "./pages/SearchResults/SearchResultsPage";
import searchResultsLoader from "./pages/SearchResults/loader";
import MoviePage from "./pages/Movie/MoviePage";
import movieDataLoader from "./pages/Movie/loader";

import { action as searchAction } from "./components/SearchBar";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RouteLayout />,
      action: searchAction,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: "search/:query",
          element: <SearchResultsPage />,
          loader: searchResultsLoader,
        },
        { path: "movie/:id", element: <MoviePage />, loader: movieDataLoader },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
