import React from 'react';
import ReactDOM from 'react-dom';
import Dropzone from 'react-dropzone'
import axios from 'axios';

class CreatePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      instruments: [],
      customInstrument: '',
      musicsheet: '',
      sendable: {}
    };
  }
  constructPost(e) {
    e.preventDefault();
    var sendable = {
      title: this.state.title,
      instruments: this.state.instruments,
      description: this.state.message,
      musicsheet: this.state.musicsheet
    }
    this.setState({sendable: sendable}, ()=> {
      axios.post('/forum', {data: this.state.sendable})
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    })
  }
  setInput(e, input) {
    var state = {};
    state[input] = e.target.value;
    this.setState(state);
  }
  addInstrument(instrument) {
    var instruments = this.state.instruments;
    instrument ? instrument = instrument : instrument = this.state.customInstrument;
    var indexToRemove = instruments.indexOf(instrument);

    if (indexToRemove >= 0) {
      instruments.splice(indexToRemove, 1);
    } else {
      instruments.push(instrument);
    }
    this.setState({instruments: instruments});
  }
  onDrop(accepted, rejected){
    console.log(accepted[0].preview)
    this.setState({musicsheet: accepted[0].preview}, () => {
      console.log('accepted: ', this.state.musicsheet);
    });
  }

  render() {
    return (
      <div>
        POST to thread:
        <br/>
        <button style={exit} onClick={()=> this.props.closePopup()}>
          X
        </button>
        <br/>
        <input placeholder='title' rows='3' onKeyUp={(e)=> this.setInput(e, 'title')}/>
        <br/>
        <textarea placeholder='your message...' onKeyUp={(e)=>this.setInput(e, 'description')}>
        </textarea>
        <br/>
        <div>
          Add Instruments...
          <br/>
          <input type='checkbox' onClick={()=> this.addInstrument('guitar')}/>
            guitar
          <input type='checkbox' onClick={()=> this.addInstrument('drums')}/>
            drums
          <br/>

          instruments added ->
            <div>
            {this.state.instruments.map((instrument, key) => <span key={key}> {instrument + ', '} </span>)}
            </div>
          <br/>
         
          <input placeholder='custom instrument...' onKeyUp={(e)=> this.setInput(e, 'customInstrument')}/>
          <button onClick={()=> this.addInstrument()}>
          add/remove
          </button>
        </div>

        <br/>

        <Dropzone onDrop={this.onDrop.bind(this)}> Click to upload musicsheet
        </Dropzone>
        <div style={exit}>
          uploaded Sheet ->
          <img style={musicSheet} src={`${this.state.musicsheet}`}/>
        </div>
        <br/>
        <button onClick={this.constructPost.bind(this)}>
         Post message
        </button>
       

      </div>
    )
  }
}
const musicSheet = {
  width: 100,
  height: 100,
  mode: 'fit'
}
const exit = {
  float: 'right'
}

export default CreatePost;
