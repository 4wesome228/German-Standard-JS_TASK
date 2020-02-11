import React, { useState, useEffect } from "react";
import "./navigation.css";

const Navigation = ({
  tracksAmount,
  onTracksPerPageClicked,
  tracksPerPage,
  currentPage,
  onPageClicked,
  setCurrentPage
}) => {
  const step = 10;

  const pagesCount = Math.ceil(tracksAmount / tracksPerPage);

  const [pagesRange, setPagesRange] = useState({
    start: currentPage,
    end: step
  });

  //rerennder if tracksPerPage was changed so currentPage is 1 but i need to change the range
  useEffect(() => {
    setPagesRange({
      start: 1,
      end: step
    });
  }, [tracksPerPage]);

  const onChangePageRangeClicked = (direction, page) => {
    switch (direction) {
      case "next":
        //enable auto return to the 1st page
        if (page === pagesCount) {
          setPagesRange({
            start: 1,
            end: step
          });
          setCurrentPage(1);
          return;
        }
        // less then 10
        if (pagesCount - page < step) {
          setPagesRange({
            start: page + 1,
            end: pagesCount
          });
        } else {
          setPagesRange({
            start: page + 1,
            end: page + step
          });
        }
        break;
      case "prev":
        setPagesRange({
          start: page - step,
          end: page - 1
        });
        break;
      default:
        break;
    }
  };

  const createNavigationPageWrapper = (start, end, pages) => {
    const isPrevAvailable = start > 10;
    return (
      <>
        {isPrevAvailable && (
          <i
            className="fa fa-arrow-left arrow mr-1"
            title="Back"
            onClick={() => onChangePageRangeClicked("prev", start)}
          ></i>
        )}
        {pages}
        <i
          className="fa fa-arrow-right arrow ml-1"
          title="Next"
          onClick={() => onChangePageRangeClicked("next", end)}
        ></i>
      </>
    );
  };

  const createTracksPerPage = (count, className) => {
    return (
      <span
        key={count + "-" + className + Math.random()}
        className={className}
        onClick={() => onTracksPerPageClicked(count)}
      >
        {count}
      </span>
    );
  };

  const createNavigationPage = (page, className) => {
    return (
      <span
        key={page}
        className={className}
        onClick={() => onPageClicked(page)}
      >
        {page}
      </span>
    );
  };

  //i was trying to make the same as on the layout
  const renderTracksPerPage = (tracksAmount, tracksPerPage) => {
    let tableItems = [];
    let className = "";
    for (let count = 5; count <= tracksAmount; count *= 2) {
      if (count === 20) count = 25;
      count === tracksPerPage
        ? (className = "pr-1 active")
        : (className = "pr-1");

      tableItems.push(createTracksPerPage(count, className));

      if (count * 2 > tracksAmount) {
        tracksAmount === tracksPerPage
          ? (className = "pr-1 active")
          : (className = "pr-1");

        tableItems.push(createTracksPerPage(tracksAmount, className));
        return tableItems;
      }
    }

    return tableItems;
  };

  const renderPagesCount = ({ start, end }) => {
    let pages = [];
    let className = "";
    if (pagesCount > 10) {
      for (let page = start; page <= end; page++) {
        page === currentPage
          ? (className = "pr-1 active")
          : (className = "pr-1");
        pages.push(createNavigationPage(page, className));
      }

      const pagesWrapper = createNavigationPageWrapper(start, end, pages);

      return pagesWrapper;
    }

    for (let page = 1; page <= pagesCount; page++) {
      page === currentPage ? (className = "pr-1 active") : (className = "pr-1");
      pages.push(createNavigationPage(page, className));
    }
    return pages;
  };

  return (
    <footer className="footer d-flex justify-content-between p-1">
      <div>{renderPagesCount(pagesRange)}</div>
      <div>{renderTracksPerPage(tracksAmount, tracksPerPage)}</div>
    </footer>
  );
};

export default Navigation;
