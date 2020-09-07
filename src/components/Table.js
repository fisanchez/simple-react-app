import React from 'react'
import { fetchPopularRepos } from '../utils/api'

export default class Table extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      searchValue: '',
      results: null
    }

    this.handleChange = this.handleChange.bind(this)
    this.keyPress = this.keyPress.bind(this)
  }

  handleChange(e){
    console.log('NEW VALUE', e.target.value)
    this.setState({ searchValue: e.target.value });
  }

  keyPress(e){
    // Search term and clear on pressing Enter key
    if(e.keyCode === 13){
      fetchPopularRepos(this.state.searchValue).then((res) => this.setState({results: res}))
    }
  }

  isLoading() {
    return this.state.results === null
  }

  render() {
    return(
      <div>
        < input 
            value={this.state.searchValue} 
            onKeyDown={this.keyPress} 
            onChange={this.handleChange} 
        />
        { this.isLoading() && <h1> Loading </h1> }
        { !this.isLoading() && <p> { JSON.stringify(this.state.results) }</p>}
      </div>
    )
  }
}
