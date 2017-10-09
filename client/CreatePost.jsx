import React from 'react';
import ReactDOM from 'react-dom';
import Dropzone from 'react-dropzone'
import axios from 'axios';
import { Button, FormControl, ControlLabel, FormGroup, Checkbox, Radio, Input, Well, Label, InputGroup } from 'react-bootstrap';
const request = require('superagent');

class CreatePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      instruments: [],
      customInstrument: '',
      musicsheet: '',
      musicsheetprev: '',
      sendable: {},
      availableInstruments: ['guitar', 'drums']
    };
  }
  constructPost(e) {
    e.preventDefault();
    var sendable = {
      user_id: this.props.user.id,
      title: this.state.title,
      instruments: JSON.stringify(this.state.instruments),
      description: this.state.description,
      musicsheet: this.state.musicsheet,
      created_at: new Date(),
      updated_at: new Date()
    }
    this.setState({sendable: sendable}, ()=> {
      var data = this.state.sendable;
      const req = request.post('/forum');
      req.attach(this.state.musicsheet[0].name, this.state.musicsheet[0]);
      for(let key in sendable) {
        req.field(key, sendable[key]);
      }
      req.end(() => {
        console.log('onDrop done');
      });

      // for(let key in sendable) {
      //   .attach(key, JSON.stringify(sendable[key]));
      //   console.log(key, sendable[key])
      //   console.log(req)
      // }
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
    this.setState({
      musicsheet: accepted,
      musicsheetprev: accepted[0].preview
    }, () => {
      console.log('accepted: ', this.state.musicsheetprev);
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
            <FormControl componentClass="textarea" placeholder='your message...' onKeyUp={(e)=>this.setInput(e, 'description')}>
            </FormControl>
        </FormGroup>

        <Well>
          <FormGroup>
            <InputGroup>
              <InputGroup.Button>
                <Button bsStyle='primary' onClick={()=> this.addInstrument() }>select</Button>
              </InputGroup.Button>
              <FormControl type="text" placeholder='custom instrument to add/remove...' onKeyUp={(e)=> this.setInput(e, 'customInstrument')}/>
            </InputGroup>
            <br/>
            <ControlLabel>
              Click instrument to add/remove
            </ControlLabel>
            <br/>
              {
                this.state.availableInstruments.map((instrument) =>
                  <Checkbox style={checkbox} inline onClick={()=> this.addInstrument(instrument)}>
                    {instrument}
                  </Checkbox>
                )
              }
          </FormGroup>

          <Well>
            <ControlLabel>Listed instruments in your post...(click to remove)</ControlLabel>
            <br/>
            <ControlLabel>
              {this.state.instruments.map((instrument, key) =>
                <Radio style={checkbox} onChange={(e)=>console.log(e)} onClick={(e)=>{this.addInstrument(instrument)}} inline checked>
                 <Well>
                  {  instrument + ' '}
                </Well>
                </Radio>
              )}
            </ControlLabel>
          </Well>
        </Well>

        <div style={imgs}>
          <div style={dropzone}>
            <Dropzone onDrop={this.onDrop.bind(this)}> Click to upload musicsheet
            </Dropzone>
          </div>

          <div style={sheetWrapper}>
            <Label bsStyle='info'>
              {'sheet uploaded'}
            </Label>
            <br/>
            {' '}
            <img style={musicSheet} src={`${this.state.musicsheetprev}`}/>
          </div>

          <br/>
          <Button bsSize='large' bsStyle='success' onClick={this.constructPost.bind(this)}>
           Post to thread
          </Button>
        </div>

      </form>
    )
  }
}
const imgs = {
  marginRight: '30px'
}
const dropzone = {
  'marginTop': '-10px'
}
const sheetWrapper = {
  marginTop: '-125px',
  marginLeft: '4px'
}
const musicSheet = {
  width: 100,
  height: 100,
  mode: 'fit'
}
const exit = {
  float: 'right'
}
const checkbox = {
  'text-shadow': '1px 1px grey'
}


export default CreatePost;
