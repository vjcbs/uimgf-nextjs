import Link from 'next/link'
import React from 'react'
import Router from 'next/router'

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    if (this.state.inputValue.length <= 50) {
      this.setState({inputValue: event.target.value})
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.inputValue.length > 0) {
      Router.push('/result?keyword='+this.state.inputValue)
    }
  }

  render() {

    const searchBarStyle = this.props.asSearchBar ? {
      position: "fixed",
      top: "0",
      left: "0",
      zIndex: "1",
      minHeight: "100px",
      height: "120px",
    } : {}

    const searchResultsNumber = this.props.total ? (<span className="search__result-number">"{`${this.props.keyword}`}": found {this.props.total} images</span>) : ''

    return (
      <form onSubmit={this.handleSubmit} className="search" method="get"
      style={searchBarStyle}>
      <div className="search__wrapper">
        <input className="search__input" type="text" placeholder="Search images..."
            value={this.state.inputValue} maxLength="50" onChange={this.handleChange}/>
        <input className="search__submit" type="submit"
        onClick={this.handleSubmit} value="" autoFocus/>
      </div>
        {searchResultsNumber}
      </form>
    )
  }
}
