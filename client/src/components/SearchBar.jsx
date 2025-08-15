import React, { useState } from "react";
import { Input } from "./ui/input";
import { useNavigate } from "react-router";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setQuery(e.target.value);
    // console.log("handleChange", query);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    console.log("serch triggered", query);
    navigate(`search?q=${query}`);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <Input
          name={"q"}
          type={"search"}
          placeholder={"search here.."}
          className="rounded-full w-2xl text-center bg-slate-50 border-0 "
          onInput={handleChange}
        />
      </form>
    </div>
  );
};

export default SearchBar;
