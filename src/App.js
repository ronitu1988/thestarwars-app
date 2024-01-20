import Modal from 'react-modal';
import './App.css';
import Home from './components/Home';

Modal.setAppElement('#root');  // Set the app element here

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Home />
      </header>
    </div>
  );
}

export default App;
