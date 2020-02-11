import React, { useState, useEffect } from "react";
import { withService } from "../hoc-helpers/withService";

const FilterBar = ({
  tracks,
  values,
  handleChange,
  getPossibleFilterOptions
}) => {
  const [filterOptions, setFilterOptions] = useState([]);
  useEffect(() => {
    const filterOptions = getPossibleFilterOptions(tracks);
    setFilterOptions(filterOptions);
  }, [tracks, getPossibleFilterOptions]);

  return (
    <div className="p-2">
      {filterOptions.map((option, idx) => {
        return (
          <div key={idx}>
            <label
              htmlFor={option.type}
              key={option.type}
              className="text-secondary mt-2"
            >
              {`${option.label}:`}
            </label>
            <select
              onChange={e => handleChange(e)}
              value={values[option.type] || "All"}
              name={option.type || "All"}
              id={option.type}
              key={option.type + idx}
              className="custom-select custom-select-sm"
            >
              <option key={idx + "All"} value="All">
                All
              </option>
              {option.data.sort().map((item, indx) => {
                return (
                  <option key={indx + Math.random() + item} value={item}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>
        );
      })}
    </div>
  );
};

const MapMethodsToProps = service => {
  return {
    getPossibleFilterOptions: service.getPossibleFilterOptions
  };
};

export default withService(FilterBar, MapMethodsToProps);
