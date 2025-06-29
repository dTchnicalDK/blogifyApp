import React from "react";
import { Input } from "./ui/input";

const SearchBar = () => {
  return (
    <div>
      <Input
        type={"search"}
        placeholder={"search here.."}
        className="rounded-full w-2xl text-center bg-slate-50 border-0 "
      />
    </div>
  );
};

export default SearchBar;
