import React, { useState, useEffect } from "react";
import { compare } from "../../utils/compare";
import MusicPage from "../../components/pages";
import Navigation from "../../components/navigation";
import { withService } from "../../components/hoc-helpers/withService";

const MusicPageContainer = ({ tracksAmount, getTracks }) => {
  const [tracks, setTracks] = useState([]);
  const [tracksPerPage, setTracksPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [values, setValues] = useState({});

  //this object will contain each field and its sortType(asc||desc) , for example {singer:"asc"}
  const [sortOptions, setSortOptions] = useState({});

  const [activeSortField, setActiveSortField] = useState("");

  const indexOfLastTrack = currentPage * tracksPerPage;
  const indexOfFirstTrack = indexOfLastTrack - tracksPerPage;

  //when user change page or tracks per page i should fetch data
  useEffect(() => {
    const tracks = getTracks(indexOfFirstTrack, indexOfLastTrack);
    setTracks(tracks);
    // clear last fetch if user quickly pressed on different pages/tracksPerPage  return ()=>
  }, [indexOfFirstTrack, indexOfLastTrack, getTracks]);

  const onSortOptionChanged = sortColumn => {
    //block sort if fields of this sortColumn are the same,this if means that if i pressed sort  and sortColumn equlas to filter
    //then fields are the same and i dont need to sort by this column
    if (values[sortColumn] !== "All" && values[sortColumn]) return;
    setSortOptions(prevState => {
      const sortType = prevState[sortColumn] === "asc" ? "desc" : "asc";
      return {
        ...prevState,
        [sortColumn]: sortType
      };
    });
    setActiveSortField(sortColumn);
  };

  const onSortByField = (items, field, type) => {
    //if filed is empty it means that its first render and activeField is empty
    if (!field) return items;
    return items.sort(compare(type, field));
  };

  const handleChange = e => {
    const value = e.target.name === "year" ? +e.target.value : e.target.value;
    setValues({
      ...values,
      [e.target.name]: value
    });
  };

  const onTracksPerPageClicked = item => {
    setTracksPerPage(item);
    setActiveSortField("");
    setValues({});
    setCurrentPage(1);
  };

  const onPageClicked = page => {
    setCurrentPage(page);
    setActiveSortField("");
    setValues({});
  };

  const filter = (items, values) => {
    let filtered = items;
    for (let key in values) {
      if (values[key] && values[key] !== "All") {
        filtered = filtered.filter(item => item[key] === values[key]);
      } else if (values[key] === "All") {
        filtered = filtered.filter(item => item[key] !== "");
      }
    }
    return filtered;
  };

  const currentTracks = onSortByField(
    filter(tracks, values),
    activeSortField,
    sortOptions[activeSortField]
  );

  return (
    <>
      <main className="d-flex justify-content-between wrapper">
        <MusicPage
          tracks={tracks}
          values={values}
          handleChange={handleChange}
          currentTracks={currentTracks}
          onSortOptionChanged={onSortOptionChanged}
        />
      </main>
      <Navigation
        tracksAmount={tracksAmount}
        onTracksPerPageClicked={onTracksPerPageClicked}
        currentPage={currentPage}
        onPageClicked={onPageClicked}
        tracksPerPage={tracksPerPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

const mapMethodsToProps = service => {
  return {
    tracksAmount: service.getTracksAmount(),
    getTracks: service.getTrackList
  };
};

export default withService(MusicPageContainer, mapMethodsToProps);
