import React from 'react';
import ReactDOM from 'react-dom';
import Dropzone from 'react-dropzone'
import axios from 'axios';
import { Button, FormControl, ControlLabel, FormGroup, Checkbox, Radio, Input, Well, Label, InputGroup } from 'react-bootstrap';

class CreatePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      instruments: [],
      customInstrument: '',
      musicsheet: '',
      sendable: {},
      availableInstruments: ['guitar', 'drums']
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
      var data = this.state.sendable;
      axios.post('/forum', data)
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
    } else if(instrument.length) {
      instruments.push(instrument);
    }
    this.setState({instruments: instruments}, () => {
      var availableInstruments = this.state.availableInstruments;
      indexToRemove = availableInstruments.indexOf(instrument);
      if (indexToRemove >= 0) {
        availableInstruments.splice(indexToRemove, 1);
      } else if(instrument.length){
        availableInstruments.push(instrument);
      }
      this.setState({availableInstruments: availableInstruments}, () => console.log(this.state.instruments))
 
    });
  }
  onDrop(accepted, rejected){
    console.log(accepted[0].preview)
    this.setState({musicsheet: accepted[0].preview}, () => {
      console.log('accepted: ', this.state.musicsheet);
    });
  }

  render() {
    

    return (
      <form>
        <Button bsStyle='default' style={exit} onClick={()=> this.props.closePopup()}>
          X
        </Button>
        
        <br/>
        <FormGroup>
          <ControlLabel>
            title
          </ControlLabel>
          <FormControl type="text" placeholder="your title..." onKeyUp={(e)=> this.setInput(e, 'title')}> 

          </FormControl>
            <ControlLabel>
              message
            </ControlLabel>
            <FormControl type='text' placeholder='your message...' onKeyUp={(e)=>this.setInput(e, 'description')}>
            </FormControl>
        </FormGroup>
       
        <Well>
          <FormGroup>
            <ControlLabel>
              Click to add/remove instrument
            </ControlLabel>
            <br/>
              {
                this.state.availableInstruments.map((instrument) => 
                  <Checkbox inline onClick={()=> this.addInstrument(instrument)}>
                    {instrument}
                  </Checkbox>
                )
              }

  
            <br/>
            <Well>
              <ControlLabel>added instrument(s)...</ControlLabel>
              <br/>
              <ControlLabel>
                {this.state.instruments.map((instrument, key) => <Radio onChange={(e)=>console.log(e)} onClick={(e)=>{this.addInstrument(instrument)}} inline checked> {  instrument + ' '} </Radio>)}
              </ControlLabel>
            </Well>
  
          </FormGroup>

          <FormGroup>
            <InputGroup>
              <InputGroup.Button>
                <Button bsStyle='primary' onClick={()=> this.addInstrument() }>select</Button>
              </InputGroup.Button>
              <FormControl type="text" placeholder='custom instrument to add/remove...' onKeyUp={(e)=> this.setInput(e, 'customInstrument')}/>
            </InputGroup>
          </FormGroup>
        </Well>
         

          <Dropzone onDrop={this.onDrop.bind(this)}> Click to upload musicsheet
          </Dropzone>
    
          

          <div style={exit}>
            <Label bsStyle='info'>
              sheet uploaded ->
            </Label>
            {' '}
            <img style={musicSheet} src={`${this.state.musicsheet}`}/>
          </div>

        <br/>
        <Button bsSize='large' bsStyle='success' onClick={this.constructPost.bind(this)}>
         Post to thread
        </Button>
       

      </form>
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
