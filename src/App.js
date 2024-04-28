import React, {Component} from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ParticlesBg from 'particles-bg'

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: ''
    }
  }

  returnClarifaiRequestOptions(imgUrl) {
    const PAT = '';
    const USER_ID = '';
    const APP_ID = '';
    // const MODEL_ID = 'face-detection';
    const IMAGE_URL = imgUrl;

    const raw = JSON.stringify({
      "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
      },
      "inputs": [
        {
          "data": {
            "image": {
              "url": IMAGE_URL
            }
          }
        }
      ]
    });

    return {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
      },
      body: raw
    };
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input}, () => {
      const requestOptions = this.returnClarifaiRequestOptions(this.state.imageUrl);
      fetch(
        "https://api.clarifai.com/v2/models/" +
        'face-detection' +
        "/outputs",
        requestOptions
      )
        .then(response => response.json())
        .then((response) => {
            console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
            // do something with response
          },
        //   function (err) {
        //     console.log('error: ', err)
        //     // there was an error
        //   }
        )
        .catch(err => console.log(err))
    });
  }


  render() {
    return (
      <div>
        <Navigation/>
        <Logo/>
        <Rank/>
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition imageUrl={this.state.imageUrl}/>
        <ParticlesBg type="cobweb" bg={true}/>
      </div>
    );
  }
}

export default App;
