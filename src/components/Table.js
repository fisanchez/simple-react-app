import React from "react";
import { fetchPopularRepos } from "../utils/api";

const Item = (props) => {
  return <p className="col">{props.value}</p>;
};

const ItemList = (props) => {
  const results = props.results;
  const resultList = results.map((result) => {
    return <Item key={result.id} value={result.full_name} />;
  });
  return <div>{resultList}</div>;
};

export default class Table extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: "",
      results: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.keyPress = this.keyPress.bind(this);
  }

  handleChange(e) {
    this.setState({ searchValue: e.target.value });
  }

  keyPress(e) {
    // Search term and clear on pressing Enter key
    if (e.keyCode === 13) {
      fetchPopularRepos(this.state.searchValue).then((res) =>
        this.setState({ results: res })
      );
    }
  }

  isLoading() {
    return this.state.results === null;
  }

  render() {
    return (
      <div>
        <h1> Most popular repos </h1>
        <label> Language </label>
        <input
          value={this.state.searchValue}
          onKeyDown={this.keyPress}
          onChange={this.handleChange}
        />
        {!this.isLoading() && <ItemList results={this.state.results} />}
      </div>
    );
  }
}
