import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';

import SearchBar from './components/search-bar';
import VideoList from './components/video-list';
import VideoDetail from './components/video-details';
const API_KEY = 'AIzaSyDQi00UYrNEZNJyAcLvj_WR2_r2VI5oJ08';



// Create a component . This component should produce some HTML.
class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            videos: [],
            selectedVideo: null

        };

        this.videoSearch('badminton');




    }

    videoSearch(term) {
        YTSearch({ key: API_KEY, term: term }, (videos) => {

            this.setState({
                videos: videos,
                selectedVideo: videos[0]
            });
        });
    }

    render() {
        
        const videoSearch = _.debounce((term)=>{this.videoSearch(term)},300);

        return (<div>
            <SearchBar
             onSearchInput ={videoSearch}
             />
            <VideoDetail video={this.state.selectedVideo} />
            <VideoList
                onVideoSelect={selectedVideo => this.setState({ selectedVideo })}
                videos={this.state.videos} />
        </div>);

    }
}

// Take this component's generated HTML and put this on the page (in the DOM)
ReactDOM.render(<App />, document.querySelector('.container'));