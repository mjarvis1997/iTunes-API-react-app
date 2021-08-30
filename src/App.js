/* references
 https://reactjs.org/docs/components-and-props.html
 https://reactjs.org/docs/thinking-in-react.html
 https://create-react-app.dev/docs/getting-started
 https://reactjs.org/docs/forms.html
 https://levelup.gitconnected.com/all-possible-ways-of-making-an-api-call-in-plain-javascript-c0dee3c11b8b
*/
// dependencies
import React from 'react';

// css
import './App.css';
import './Components/SearchBar.css';
import './Components/AlbumFlexbox.css';
import './Components/AlbumDetails.css';

// components
import SearchBar from './Components/SearchBar';
import AlbumFlexbox from './Components/AlbumFlexbox';
import AlbumDetails from './Components/AlbumDetails';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInput: '',
            albumInfo: [],
            currentAlbumIndex: -1,
            resultCount: 0
		};
	}

    // retrieve album data from iTunes API
    GetAlbumsFromAPI = async (artist) => {
	    let response = await fetch("https://itunes.apple.com/search?entity=album&term=" + artist);
	    let data = await response.json();
	    return data;
    }

    // receive albumName from AlbumFlexbox when an album is clicked
    // store index of the selected album in state
    HandleNewAlbumSelected = (albumName) => {
        let tempName = '';

        for(let i = 0; i < this.state.albumInfo.length; ++i)
        {
            tempName = this.state.albumInfo[i].collectionName;
            if(tempName === albumName){
                this.setState({currentAlbumIndex: i});
		    }
		}

        window.scrollTo(0,0);
	}

    // adjust state when input changes
    HandleUserInputChange = async (val) => {
        
        // reset selected album index
        this.setState({currentAlbumIndex: -1});

        // store user input in state
        this.setState({userInput: val});

        // get albums from API and store result count in state
        let response = await this.GetAlbumsFromAPI(val);
        this.setState({resultCount: response.resultCount});

        // check if search returned anything valid
        if(this.state.resultCount === 0)
        {
            // there are no results
            this.setState({albumInfo: []});
		} 
        else {

            // init needed variables
            let numOfAlbums = this.state.resultCount;
            let albumData = [];

            // iterate through API response and store data on albums
            for(let i = 0; i < numOfAlbums; ++i)
            {
                // add album info to state level array
                albumData.push({
                    collectionType: response.results[i].collectionType,
                    collectionName: response.results[i].collectionName,
                    collectionViewUrl: response.results[i].collectionViewUrl,
                    artworkUrl100: response.results[i].artworkUrl100,
                    releaseDate: response.results[i].releaseDate,
                    trackCount: response.results[i].trackCount,
                    artistName: response.results[i].artistName,
                    collectionId: response.results[i].collectionId,
                    collectionViewUrl: response.results[i].collectionViewUrl
                });
		    }

            // store array of album data in the state
            this.setState({albumInfo: albumData});
        } 
	}

    render () {
        return (
          <div className={this.state.resultCount > 4 ? "app full" : "app" }>
            <div className="title">iTunes Album Lookup</div>
            <div className="header">
              <div className="searchBarDiv">
                <SearchBar artistName={this.state.userInput} HandleUserInputChange={this.HandleUserInputChange} />
              </div>
              <div className="albumInfoDiv">
                <AlbumDetails albumInfo={this.state.albumInfo} currentAlbumIndex={this.state.currentAlbumIndex} />
              </div>
            </div>
            <AlbumFlexbox artistName={this.state.userInput} albumInfo={this.state.albumInfo} HandleNewAlbumSelected={this.HandleNewAlbumSelected} />
          </div>
        );
	}
}

export default App;
