
import './App.css';
import Hola from './components/Hola';

function App() {
  let text="hola mundo";
  return (
    <div className="App">
      <Hola props={text}></Hola>
    </div>
  );
}

export default App;
