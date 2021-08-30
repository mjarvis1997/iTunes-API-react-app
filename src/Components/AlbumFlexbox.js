import React from 'react';

// returns a flexbox populated with AlbumCover components
// props for each album come from api calls in parent component
class AlbumFlexbox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isAlbumSelected: 0,
		};
	}

	// call parent function from App component to report selected album
	// needs to be stored at a higher state so other components can access
	HandleClick = (event) => {
		this.props.HandleNewAlbumSelected(event.target.name);
		console.log("hello");
	}

	render() {
		// map album info from array in props
		// results in list of img elements
		let individualAlbumElements = this.props.albumInfo.map((currentAlbum) =>
			<div>
		      <img key={currentAlbum.collectionId}  onClick={this.HandleClick} name={currentAlbum.collectionName} src={currentAlbum.artworkUrl100} />
			</div>
		);

		return (
		  <div class="albumFlexbox">
			{individualAlbumElements}
		  </div>
		);
	}
}
 export default AlbumFlexbox;


