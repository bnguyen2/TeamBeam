import React from 'react';
import Thread from './Thread.jsx';
import $ from "jquery";
const axios = require('axios');
const threads_data = require('../data/threads_data.js');//Dummy threads data

export default class Forum extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      threads: [],
      searchText: ''
    }
  }

  componentDidMount() {
    axios.get('/forum')
    .then((results) => {
      let newState = Object.assign({}, this.state);
      newState.threads = results.data;
      console.log(newState.threads);
      this.setState(newState);
    }, (err) => {
      console.log('Error loading threads', err);
    })
  }

  render() {
    return(
      <div>
        <form>
          <input type="text" />
          <input type="submit" value="Search" />
        </form>
        <a href="#">Create new post</a>

        <div className="threads">
          {this.state.threads.map((thread) => {
            return <Thread
              threadData={thread}
              key={thread.id}
            />
          })}
        </div>
      </div>
    );
  }
}
