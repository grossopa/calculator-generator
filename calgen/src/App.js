import logo from './logo.svg';
import './App.css';
import SimpleGen from 'service/SimpleGen';
import IteratedGen from 'service/IteratedGen'

function App() {
  let gen = new SimpleGen();
  let iterGen = new IteratedGen();
  return (
    <div className="App">
      <header className="App-header">
         {gen.generateAdd(0, 20, 0).toDisplayString()}<div>
         {iterGen.generate(0, 20, 2).toDisplayString(true)}
      </div>
        
      </header>
      
    </div>
  ); 
}

export default App;
