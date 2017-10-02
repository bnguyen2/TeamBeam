import React from 'react';
import Modal from 'react-modal';

export default class Thread extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popupIsOpen: false
    }
    this.openPopup = this.openPopup.bind(this);
    this.closePopup = this.closePopup.bind(this);
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
          <h3>{this.props.threadData.title}</h3>
          <p>{this.props.threadData.description}</p>
          <ul>
            {this.props.threadData.instruments.map((instrument) => {
              return <li>{instrument}</li>
            })}
          </ul>
          <img src={this.props.threadData.musicSheet}></img>
          <button onClick={this.closePopup}>Close</button>
        </Modal>
      </div>
    );
  }
}
