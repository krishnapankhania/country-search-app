import React, { useState } from "react";
import StateProvider, { useStateContext } from "./state";
import Results from "./components/Results";
import Pagination from "./components/Pagination";
import Search from "./components/Search";

const Wrapper: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const recordsPerPage: number = 10;
  const { countries } = useStateContext();
  const totalPages = Math.ceil(countries.length / recordsPerPage);
  return (
    <>
      <header>
        <h1>Country Search App</h1>
      </header>
      <section>
        <Search />
        <Results currentPage={currentPage} recordsPerPage={recordsPerPage} />
        {countries.length > 0 && totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </section>
      <footer>
        {" "}
        <p>Developed by Krishna Pankhania</p>
      </footer>
    </>
  );
};

const App: React.FC = () => {
  return (
    <StateProvider>
      <Wrapper />
    </StateProvider>
  );
};

export default App;
