import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

const SearchHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSearch = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button onClick={toggleSearch} className="mx-2">
        <MagnifyingGlassIcon className="w-4 h-4 inline-block" />
      </button>
      {isOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white  rounded shadow-lg w-1/2 h-52 px-4">
            <button
              onClick={toggleSearch}
              className="mt-4 mb-8 px-4 py-2 bg-red-500 text-white rounded float-right "
            >
              X
            </button>
            <input
              type="text"
              placeholder="Type to search..."
              className="w-full px-4 py-2 border rounded focus:outline-none text-black "
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchHeader;
