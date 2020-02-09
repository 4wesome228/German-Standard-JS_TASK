import React, { Fragment, useState } from "react";
import MusicTable from "../music-table";
import Navigation from "../navigation";
import { withService } from "../hoc-helpers/withService";
import { withData } from "../hoc-helpers/withData";

const MusicPage = ({ match, data }) => {
  const [pageElementsCount, setPageElementsCount] = useState(5);
  const [activeItemNumber, setActiveItemNumber] = useState(5);
  const id = parseInt(match.params.id) || 1;
  const maxPageElementsCount = data.length || 5;
  const pagesCount = Math.ceil(data.length / pageElementsCount);

  const onItemCountClicked = item => {
    setActiveItemNumber(item);
    setPageElementsCount(item);
  };

  const setTableView = activeItemNumber => {
    return data.slice(0, activeItemNumber);
  };

  return (
    <Fragment>
      <MusicTable
        renderTableRow={item => {
          let tableFields = [];
          for (let key in item) {
            if (key !== "id") {
              tableFields.push(<td>{item[key]}</td>);
            }
          }
          return tableFields;
        }}
        data={setTableView(activeItemNumber)}
      />
      <Navigation
        pagesCount={pagesCount}
        activePage={id}
        maxTableItemsCount={maxPageElementsCount}
        onItemCountClicked={onItemCountClicked}
        activeItemNumber={parseInt(activeItemNumber)}
      />
    </Fragment>
  );
};

const mapMethodsToProps = service => {
  return {
    getData: service.getTrackList
  };
};

export default withService(withData(MusicPage), mapMethodsToProps);
