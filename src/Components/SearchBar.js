import React, { Component } from 'react';

class SearchBar extends React.Component {
	constructor(props) {
		super(props);

		// bind change and submit function for user input
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	// call parent function from App component to store user input
	// needs to be stored at a higher state so other components can access
	handleChange(event) {
		this.props.HandleUserInputChange(event.target.value);
	}

	// prevents default response to input submission
	handleSubmit = (event) => {
		event.preventDefault();
	}

	// return simple form with input textbox
	render() {
		return (
		  <form class="searchBar" onSubmit={this.handleSubmit}>
            <label>
              Enter artist name here:
            </label>
			<input type="text" onChange={this.handleChange} />
            <input class="hidden" type="submit" value="Submit" />
          </form>
		);
	}
}

export default SearchBar;