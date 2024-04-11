import React, { useState, useRef, useEffect } from "react";
import { useStateContext } from "../state";

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { fetchCountries } = useStateContext();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      fetchCountries(event.target.value);
    }, 500); // Adjust the delay duration as needed
  };

  let debounceTimer: NodeJS.Timeout;

  const handleKeyPress = (event: KeyboardEvent) => {
    if ((event.metaKey || event.ctrlKey) && event.key === "k") {
      inputRef.current?.focus();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div className="search">
      <input
        ref={inputRef}
        type="text"
        placeholder="Search for a country..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default Search;
