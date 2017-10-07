import React from 'react';
import Thread from './Thread.jsx';
import $ from "jquery";
import Modal from 'react-modal';
import CreatePost from './CreatePost.jsx'


const axios = require('axios');
const threads_data = require('../data/threads_data.js');//Dummy threads data

export default class Forum extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      threads: [],
      searchText: '',
      popupIsOpen: false
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

  openPopup() {
    var state = Object.assign({}, this.state);
    state.popupIsOpen = true;
    this.setState(state);
  }
  closePopup() {
    var state = Object.assign({}, this.state);
    state.popupIsOpen = false;
    this.setState(state);
  }

  render() {
    return(
      <div>
        <form>
          <input type="text" />
          <input type="submit" value="Search" />
        </form>
        <a href="#" onClick={this.openPopup.bind(this)}>
          Create new post
        </a>

        <Modal 
          isOpen={this.state.popupIsOpen}  
          onRequestClose={this.closePopup.bind(this)}
          contentLabel="ThreadPopup"
        >
          <CreatePost closePopup={this.closePopup.bind(this)}/>
        </Modal>
        

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
