import React from 'react'

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
    // Enter key
    if(e.keyCode === 13){
      this.setState({ searchValue: ''})
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
        { !this.isLoading() && <h1> Loaded </h1> }
      </div>
    )
  }
}
