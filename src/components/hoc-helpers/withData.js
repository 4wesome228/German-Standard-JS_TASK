import React, { Component } from "react";
//import Spinner from "../spinner/spinner";

export const withData = Comp => {
  return class extends Component {
    state = {
      data: null
    };

    componentDidMount() {
      const data = this.props.getData();
      this.setState({ data });
    }

    render() {
      const { data } = this.state;
      if (!data) return null;
      return <Comp {...this.props} data={data} />;
    }
  };
};
