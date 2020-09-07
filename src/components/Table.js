import React from "react";
import PropTypes from "prop-types";
import { fetchPopularRepos } from "../utils/api";

const Item = ({ result }) => {
  return (
    <div className="column">
      <p> {result.full_name} </p>
      <img src={result.owner.avatar_url} alt="language" width="200px" />
    </div>
  );
};

Item.propTypes = {
  result: PropTypes.object.isRequired,
};

const ItemList = ({ results }) => {
  const resultList = results.map((result) => {
    return <Item key={result.full_name} result={result} />;
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
        <h1 className="title is-1"> Most popular repos </h1>
        <label> Language </label>
        <input
          className="input"
          value={this.state.searchValue}
          onKeyDown={this.keyPress}
          onChange={this.handleChange}
        />
        {!this.isLoading() && (
          <ItemList results={this.state.results} className="columns" />
        )}
      </div>
    );
  }
}
