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
          <RB.Well>
            <p>{this.props.threadData.description}</p>
          </RB.Well>
        </div>

        <Modal
          isOpen={this.state.popupIsOpen}
          onRequestClose={this.closePopup}
          contentLabel="ThreadPopup"
        >
          <RB.Row>
              <RB.PageHeader>{this.props.threadData.title}</RB.PageHeader>
              <RB.Col xs={1} xsOffset={11}>
                <RB.Button onClick={this.closePopup} bsSize="small" className="thread-exit">
                  <RB.Glyphicon glyph="remove" />
                </RB.Button>
              </RB.Col>
          </RB.Row>
          <RB.Row>
            <p>{this.props.threadData.description}</p>
          </RB.Row>
          <RB.Row>
            <RB.Image src={this.props.threadData.musicsheet} responsive />
          </RB.Row>
          <RB.Row>
            <h4>Instruments</h4>
            <ul type="disc">
              {JSON.parse(this.props.threadData.instruments).map((instrument) => {
                return <li>{instrument}</li>
              })}
            </ul>
          </RB.Row>
          <RB.Row>
            <RB.ListGroup className="posts">
              {this.state.posts.map((post, index) => {
                return (
                  <RB.ListGroupItem>
                    <RB.Row>
                      User id: {post.user_id} {post.created_at}
                      <RB.Col xs={1} xsOffset={11}>
                        <RB.Button onClick={(e) => this.deletePosts(index)} bsSize="xsmall">
                          <RB.Glyphicon glyph="remove" />
                        </RB.Button>
                      </RB.Col>
                    </RB.Row>
                    <RB.Row>
                      {post.message}
                    </RB.Row>
                  </RB.ListGroupItem>
                )
              })}
            </RB.ListGroup>
          </RB.Row>

          <form onSubmit={(e) => this.handleReply(e)}>
            <RB.FormGroup>
              <RB.FormControl componentClass="textarea" name="reply-text"/>
            </RB.FormGroup>
            <RB.Button type="submit">Reply</RB.Button>
          </form>
        </Modal>
      </div>
    );
  }
}
