import React, { useState, useRef, useEffect } from "react";
import "./list.css";
import searchIcon from "../../assets/images/search-icon.png";
import crossMark from "../../assets/images/cross-mark.png"; // Ensure the path is correct
import ListItem from "../ListItem/ListItem";
import SecondaryButton from "../SecondaryButton/SecondaryButton";

function List({title, quantity,items, onStatusChange }) {
  const [searchActive, setSearchActive] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);
  const searchRef = useRef(null);

  // Handle search input change
  const handleSearchChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = items.filter((item) =>
      item.toLowerCase().includes(searchTerm)
    );
    setFilteredItems(filtered);
  };

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
              placeholder= "search"
              autoFocus
              onChange={handleSearchChange}
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
      </div>
      <div className="list-body">
        <div className="list-items">
          {items.length > 0 ? (
            items.map((item, index) => (
              <ListItem
              key={index}
              item={item} 
              onStatusChange={onStatusChange}
             />
            ))
          ) : (
            <div className="no-items">No items found</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default List;
