import React from "react";

const MusicTable = ({ tracks, onSortOptionChanged, renderTableRow }) => {
  const createTableTitle = (title, onOptionChanged) => {
    let loweCaseTitle = title.toLowerCase();
    return (
      <th scope="col" key={title}>
        {title}
        <i
          onClick={() => onOptionChanged(loweCaseTitle)}
          className="fa fa-sort pl-2 align-middle text-secondary btn"
          title="Sort"
        ></i>
      </th>
    );
  };

  const titles = [
    createTableTitle("Singer", onSortOptionChanged),
    createTableTitle("Song", onSortOptionChanged),
    createTableTitle("Genre", onSortOptionChanged),
    createTableTitle("Year", onSortOptionChanged)
  ];

  const fields = tracks.map(track => {
    const { id } = track;
    const tableRow = renderTableRow(track);
    return <tr key={id}>{tableRow}</tr>;
  });

  if (!tracks.length)
    return (
      <table className="table table-striped">
        <tbody>
          <tr className="text-center text-primary">
            <td>No such tracks</td>
          </tr>
        </tbody>
      </table>
    );
  return (
    <table className="table table-striped table-bordered">
      <thead>
        <tr>{titles}</tr>
      </thead>
      <tbody>{fields}</tbody>
    </table>
  );
};

export default MusicTable;
