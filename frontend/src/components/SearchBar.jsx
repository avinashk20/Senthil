import PropTypes from "prop-types";
import { Form, redirect } from "react-router-dom";

import searchIcon from "../assets/search-icon.svg";

const SearchBar = (props) => {
  return (
    <Form
      action="/"
      method="post"
      className={
        props.className +
        ` flex dark:bg-skeleton rounded-full max-h-14 shadow-md hover:shadow-lg duration-200 focus-within:ring-2 ring-accent/50`
      }
    >
      <input
        type="text"
        name="query"
        id="search-bar"
        placeholder="search for a movie..."
        className="bg-transparent focus:outline-none w-0 flex-1 px-6 rounded-l-full text-lg"
      />
      <button type="submit" className="px-4 py-3 rounded-full opacity-80">
        <img src={searchIcon} alt="search icon" width="24" />
      </button>
    </Form>
  );
};

SearchBar.propTypes = {
  className: PropTypes.string,
};

export async function action({ request }) {
  const data = await request.formData();
  const query = data.get("query").trim();
  console.log(query);
  return redirect(`/search/${query}`);
}

export default SearchBar;
