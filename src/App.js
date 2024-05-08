import React, {Component} from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import ParticlesBg from 'particles-bg'

class App extends Component {
    constructor() {
        super();
        this.state = {
            input: '',
            imageUrl: '',
            box: {},
            route: 'signin',
            isSignedIn: false,
        }
    }

    calculateFaceLocation = (data) => {
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('inputimage');
        const width = Number(image.width);
        const height = Number(image.height);

        return {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - (clarifaiFace.right_col * width),
            bottomRow: height - (clarifaiFace.bottom_row * height),
        }
    }

    displayFaceBox = (box) => {
        this.setState({box: box});
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
                .then((response) => this.displayFaceBox(this.calculateFaceLocation(response)))
                .catch(err => console.log(err))
        });
    }

    onRouteChange = (route) => {
        if (route === 'signin') {
            this.setState({isSignedIn: false});
        } else if (route === 'home') {
            this.setState({isSignedIn: true});
        }
        this.setState({route: route});
    }

    render() {
        const {isSignedIn, imageUrl, route, box} = this.state;
        return (
            <div>
                <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
                {this.state.route === 'home'
                    ? <div>
                        <Logo/>
                        <Rank/>
                        <ImageLinkForm
                            onInputChange={this.onInputChange}
                            onButtonSubmit={this.onButtonSubmit}
                        />
                        <FaceRecognition box={box} imageUrl={imageUrl}/>
                    </div>
                    : (
                        route === 'signin'
                            ? <Signin onRouteChange={this.onRouteChange}/>
                            : <Register onRouteChange={this.onRouteChange}/>
                    )
                }
                <ParticlesBg type="cobweb" bg={true}/>
            </div>
        );
    }
}

export default App;
