import SearchBar from "../../components/SearchBar";


const HomePage = () => {
  return (
    <main>
      <div className="content-container relative top-1/4 md:top-1/3">
        <SearchBar className="max-w-screen-md mx-auto" />
      </div>
    </main>
  );
};

export default HomePage;
