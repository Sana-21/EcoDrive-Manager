import React, { useState, useRef, useEffect } from "react";
import "./list.css";
import searchIcon from "../../assets/images/search-icon.png";
import crossMark from "../../assets/images/cross-mark.png"; // Ensure the path is correct
import ListItem from "../ListItem/ListItem";
import SecondaryButton from "../SecondaryButton/SecondaryButton";
function List({ title, quantity, placeholder }) {
  const [searchActive, setSearchActive] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchActive(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="list-holder">
      <div className="list-header">
        <span className="list-title">
          {title}({quantity})
        </span>
        {searchActive ? (
          <div className="search-container" ref={searchRef}>
            <input
              type="text"
              className="search-input"
              placeholder={placeholder}
              autoFocus
            />
            <img
              src={crossMark}
              className="cross-mark-icon"
              alt="Clear search"
              onClick={() => setSearchActive(false)}
            />
          </div>
        ) : (
          <img
            src={searchIcon}
            className="search-icon"
            alt="search"
            onClick={() => setSearchActive(true)}
          />
        )}
        <SecondaryButton text="Add User" backgroundColor="#92e3a9" /> 
      </div>
      <div className="list-body">
        <div className="list-items">
          <ListItem />
          <ListItem />
          <ListItem />
          <ListItem />
          <ListItem />
          <ListItem />
          <ListItem />
          <ListItem />
          <ListItem />
          <ListItem />
          <ListItem />
          <ListItem />
          <ListItem />
          <ListItem />
          <ListItem />
        </div>
      </div>
    </div>
  );
}

export default List;