import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React from "react";

const SearchBar = () => {
  return (
    <div className="flex flex-wrap -mx-3 mb-4 h-12">
      <div className="w-full flex items-center px-3">
        <input
          id="search"
          name="search"
          type="search"
          className={"form-input w-full text-gray-800 rounded-r-none"}
          placeholder="Search for a blog post"
          required
        />
        <button
          type="submit"
          className="w-14 h-full flex items-center justify-center rounded-r rounded-l-none text-white bg-green-600 hover:bg-green-700 "
        >
          <MagnifyingGlassIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
