import React, { useState } from "react";
import us_flag from "../../assets/home/us_flag.png";
import vn_flag from "../../assets/home/vn_flag.png";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

const LanguageDropDown = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("English EN");
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropDown = () => setIsOpen(!isOpen);

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button onClick={toggleDropDown} className="pr-4">
          <img
            src={selectedLanguage === "English EN" ? us_flag : vn_flag}
            className="w-4 h-4 float-left m-1"
          ></img>
          {selectedLanguage}
          <ChevronDownIcon className="h-4 w-4 transform ml-2 float-right mt-1" />
        </button>
      </div>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <button
              onClick={() => handleLanguageChange("English EN")}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              <img src={us_flag} alt="UK Flag" className="w-5 h-5 mr-2" />
              English (EN)
            </button>
            <button
              onClick={() => handleLanguageChange("Vietnamese VI")}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              <img src={vn_flag} alt="US Flag" className="w-5 h-5 mr-2" />
              Vietnamese (VI)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageDropDown;
