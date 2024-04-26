import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';

function App() {
  return (
    <div style={{display: 'flex', justifyContent: 'flex-end'}}>
      <Navigation />
      <Logo/>
      {/*  <ImageLinkForm />*/}
      {/*  <FaceRecognition />}*/}
    </div>
  );
}

export default App;
