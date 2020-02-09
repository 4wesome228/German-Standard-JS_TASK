import React, { Component } from "react";

class MusicTable extends Component {
  componentDidMount() {}

  renderTableBody = items => {
    const { renderTableRow } = this.props;
    return items.map(item => {
      const { id } = item.id;
      const tableRow = renderTableRow(item);
      return <tr key={id}>{tableRow}</tr>;
    });
  };

  render() {
    const { data } = this.props;
    if (!data) return null;
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Singer</th>
            <th scope="col">Song</th>
            <th scope="col">Genre</th>
            <th scope="col">Year</th>
          </tr>
        </thead>
        <tbody>{this.renderTableBody(data)}</tbody>
      </table>
    );
  }
}

export default MusicTable;
