import React from 'react';
import ReactDOM from 'react-dom';
import Dropzone from 'react-dropzone';
import axios from 'axios';

class UploadImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: []
    }
  }

  onDrop(accepted, rejected){
    this.setState({files: accepted}, () => {
      console.log('accepted: ', this.state.files);
      axios.post('/signup/:picture', {
        files: this.state.files
      })
      .then(res => console.log(res))
      .catch(err => console.log('err', err));
    });
  }

  render(props) {
    return (
      <div>
        <Dropzone onDrop={this.onDrop.bind(this)}>
          -upload your profile picture-
        </Dropzone>
      </div>
    )
  }
}
export default UploadImage;
