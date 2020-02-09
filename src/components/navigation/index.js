import React from "react";
import "./index.css";
import { NavLink } from "react-router-dom";

const Navigation = ({
  pagesCount,
  tableItemsCount,
  activePage,
  maxTableItemsCount,
  onItemCountClicked,
  activeItemNumber
}) => {
  const renderPagesCount = pagesCount => {
    let pages = [];
    for (let page = 1; page <= pagesCount; page++) {
      pages.push(
        <NavLink
          key={page}
          className="pr-1"
          to={`/page/${page}`}
          activeStyle={{
            color: "red"
          }}
          isActive={() => (page === activePage ? true : false)}
        >
          {page}
        </NavLink>
      );
    }
    return pages;
  };

  //TO CHANGE,LESS COPYPASTE
  const renderItemsCount = (maxTableItemsCount, activeItemNumber) => {
    let tableItems = [];
    let className = "";
    for (let count = 5; count <= maxTableItemsCount; count *= 2) {
      if (count === 20) count = 25;
      count === activeItemNumber
        ? (className = "pr-1 active")
        : (className = "pr-1");

      tableItems.push(
        <span
          key={count}
          className={className}
          onClick={() => onItemCountClicked(count)}
        >
          {count}
        </span>
      );
      if (count * 2 > maxTableItemsCount) {
        maxTableItemsCount === activeItemNumber
          ? (className = "pr-1 active")
          : (className = "pr-1");
        tableItems.push(
          <span
            key={maxTableItemsCount}
            className={className}
            onClick={() => onItemCountClicked(maxTableItemsCount)}
          >
            {maxTableItemsCount}
          </span>
        );
        return tableItems;
      }
    }
    return tableItems;
  };

  return (
    <footer className="footer d-flex justify-content-between">
      <div>{renderPagesCount(pagesCount)}</div>
      <div>{renderItemsCount(maxTableItemsCount, activeItemNumber)}</div>
    </footer>
  );
};
export default Navigation;
