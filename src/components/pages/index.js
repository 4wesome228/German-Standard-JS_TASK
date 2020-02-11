import React from "react";
import MusicTable from "../music-table";
import FilterBar from "../filter-bar";
import "./musicPage.css";

const MusicPage = ({
  currentTracks,
  onSortOptionChanged,
  tracks,
  values,
  handleChange
}) => {
  const renderTableRow = trackDetails => {
    let tableFields = [];
    for (let key in trackDetails) {
      if (key !== "id") {
        tableFields.push(
          <td key={key + "-" + trackDetails.id}>{trackDetails[key]}</td>
        );
      }
    }
    return tableFields;
  };

  return (
    <>
      <MusicTable
        renderTableRow={renderTableRow}
        tracks={currentTracks}
        onSortOptionChanged={onSortOptionChanged}
      />
      <FilterBar tracks={tracks} values={values} handleChange={handleChange} />
    </>
  );
};

export default MusicPage;
