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
    this.setState(state, ()=> {
    });
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
    this.setState({instruments: instruments}, () => console.log(this.state.instruments));
  }
  onDrop(accepted, rejected){
    this.setState({files: accepted[0].preview}, () => {
      console.log('accepted: ', this.state.file);
    });
  }

  render() {
    return (
      <div> 
        
        <input placeholder='title' rows='3' onKeyUp={(e)=> this.setInput(e, 'title')}/>
        <br/>
        <div>
          instruments added ->
            <div>
            {this.state.instruments.map((instrument, key) => <span key={key}> {instrument + ', '} </span>)}
            </div>
          <br/>
          <input type='checkbox' onClick={()=> this.addInstrument('guitar')}/> 
          guitar
          <input type='checkbox' onClick={()=> this.addInstrument('drums')}/> 
          drums
          <br/>
          <input placeholder='custom instrument...' onKeyUp={(e)=> this.setInput(e, 'customInstrument')}/>
          <button onClick={()=> this.addInstrument()}>
          add/remove custom
          </button>
        </div>
          
        <br/>
        <textarea placeholder='your message...' onKeyUp={(e)=>this.setInput(e, 'description')}></textarea>
        <Dropzone onDrop={this.onDrop.bind(this)}> Click to add musicsheet
        </Dropzone>
        <button onClick={this.constructPost.bind(this)}>
         Post message
        </button>

      </div>
    )
  }
}
export default CreatePost;