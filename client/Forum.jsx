import React from 'react';
import Thread from './Thread.jsx';
import $ from "jquery";
const threads_data = require('../data/threads_data.js');//Dummy threads data

export default class Forum extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      threads: threads_data,
      searchText: ''
    }
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
