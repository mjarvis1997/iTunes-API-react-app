import React from 'react';

// returns a div populated with details of the current album
class AlbumDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            index: -1
		};
	}

	render() {
		
		let currentAlbumIndex = this.props.currentAlbumIndex;

		// return populated album info
		if(currentAlbumIndex !== -1)
		{
			// format date for display
			let releaseDate = this.props.albumInfo[currentAlbumIndex].releaseDate.substring(0,4); 

			return (
				<div class="albumDetails">
				  <p className="label">Album Name: </p>
				  <p className="output">{this.props.albumInfo[currentAlbumIndex].collectionName}</p>
				  <p className="label">Artist Name: </p>
				  <p className="output">{this.props.albumInfo[currentAlbumIndex].artistName}</p>
				  <p className="label year">Year Released: </p>
				  <p className="output year">{releaseDate}</p>
				  <a href={this.props.albumInfo[currentAlbumIndex].collectionViewUrl} className="url" target="_blank"> View in iTunes</a>
				</div>
			);
		} else {
		// return empty album info
			return (
				<div class="albumDetails">
				  <p className="label">Album Name: </p>
				  <p className="output">Click an album for more info</p>
				  <p className="label">Artist Name: </p>
				  <p className="output">-</p>
				  <p className="label year">Year Released: </p>
				  <p className="output year">-</p>
				</div>
			);
		}
		
	}
}
 export default AlbumDetails;
