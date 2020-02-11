import data from "./mockdata";

class MusicService {
  getTrackList(offset, amount) {
    return data.slice(offset, amount);
  }

  getTracksAmount() {
    return data.length;
  }

  getCurrentSingers(data) {
    return [...new Set(data.map(item => item.singer))];
  }

  getCurrentGenres(data) {
    return [...new Set(data.map(item => item.genre))];
  }

  getCurrentYears(data) {
    return [...new Set(data.map(item => item.year))];
  }

  getCurrentSum(data) {
    return [...new Set(data.map(item => item.some))];
  }

  /*if i will be needed to create another field 1) i can fetch new object ( {someField:"someField",label:"someFieldLabel",data:this.getCurrentSomeField(tracks)})
    2)in MusicTable component use createTableTitle("someField", onSortOptionChanged) 
    This field will be added to table ,and i can sort and filter it
  */
  getPossibleFilterOptions = tracks => {
    return [
      {
        type: "singer",
        label: "Singer",
        data: this.getCurrentSingers(tracks)
      },
      {
        type: "genre",
        label: "Genre",
        data: this.getCurrentGenres(tracks)
      },
      {
        type: "year",
        label: "Year",
        data: this.getCurrentYears(tracks)
      }
    ];
  };
}

export { MusicService };
