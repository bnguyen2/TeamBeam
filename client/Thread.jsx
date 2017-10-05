import React from 'react';
import Modal from 'react-modal';
const RB = require('react-bootstrap');

const axios = require('axios');

export default class Thread extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popupIsOpen: false,
      posts: []
    }
    this.openPopup = this.openPopup.bind(this);
    this.closePopup = this.closePopup.bind(this);
    this.handleReply = this.handleReply.bind(this);
    this.deletePosts = this.deletePosts.bind(this);
  }
  closePopup() {
    let newState = Object.assign({}, this.state);
    newState.popupIsOpen = false;
    this.setState(newState);
  }
  openPopup() {
    let newState = Object.assign({}, this.state);
    newState.popupIsOpen = true;
    this.setState(newState);
  }

  componentDidMount() {
    let newState = Object.assign({}, this.state);
    axios.get(`/forum/${this.props.threadData.id}/posts`)
    .then((results) => {
      newState.posts = results.data;
      this.setState(newState);
    });
  }


  handleReply(e) {
    e.preventDefault();
    console.log('replied!!');
    axios.post(`/forum/${this.props.threadData.id}/posts`, {
      message: e.target['reply-text'].value,
      user_id: 1  //Change the hard-coded user id later when authentication is implemented
    })
    .then((results) => {
    }, (err) => {
    });
  }

  deletePosts(index) {
    axios.delete(`/forum/${this.props.threadData.id}/posts/${this.state.posts[index].id}`)
    .then(results => {
      this.setState({
        posts: results.data
      })
    }, (err) => {
    });
  }

  render() {
    return(
      <div>
        <div className="thread-summary" onClick={this.openPopup}>
          <h3>{this.props.threadData.title}</h3>
          <p>{this.props.threadData.description}</p>
        </div>
        <Modal
          isOpen={this.state.popupIsOpen}
          onRequestClose={this.closePopup}
          contentLabel="ThreadPopup"
        >
          <RB.Row>
            <RB.Col xs={1} xsOffset={11}>
              <RB.Button onClick={this.closePopup} bsSize="small">X</RB.Button>
            </RB.Col>
            <RB.Col xs={10}>
              <RB.PageHeader>{this.props.threadData.title}</RB.PageHeader>
            </RB.Col>
          </RB.Row>
          <p>{this.props.threadData.description}</p>
          <RB.Row>
            <RB.Col xs={4}>
              <RB.Table bordered responsive>
                <thead>
                  <tr><th>Instruments</th></tr>
                </thead>
                <tbody>
                  {JSON.parse(this.props.threadData.instruments).map((instrument) => {
                    return <tr><th>{instrument}</th></tr>
                  })}
                </tbody>
              </RB.Table>
            </RB.Col>
          </RB.Row>
          <RB.Row>
            <RB.Col>
              <RB.ListGroup>
                {this.state.posts.map((post) => {
                  return (
                    <RB.ListGroupItem>
                      <span>User id: {post.user_id}</span> <span>{post.created_at}</span>
                      <p>{post.message}</p>
                    </RB.ListGroupItem>
                  )
                })}
              </RB.ListGroup>
            </RB.Col>
          </RB.Row>


          <img src={this.props.threadData.musicSheet}></img>
          <button onClick={this.closePopup}>Close</button>
          <div className="posts">
            {this.state.posts.map((post, index) => {
              return (
                <div>
                  <p onClick={(e) => this.deletePosts(index)}>{post.message}</p>
                </div>
              )
            })}
            <form onSubmit={(e) => this.handleReply(e)}>
              <textarea name="reply-text"></textarea>
              <input type="submit" value="Reply"></input>
            </form>
          </div>
        </Modal>
      </div>
    );
  }
}
