import logo from './logo.svg';
import './App.css';
import SimpleGen from 'service/SimpleGen';
import IteratedGen from 'service/IteratedGen'
import HeaderView from 'view/HeaderView'
import QuestionView from 'view/QuestionView'

let gen = new SimpleGen();
let iterGen = new IteratedGen();

function App() {

  let questions = []
  for (let i = 0; i < 10; i++) {
    questions.push([
      iterGen.generate(0, 20, 2).toDisplayString(true),
      iterGen.generate(0, 20, 2).toDisplayString(true),
      iterGen.generate(0, 20, 2).toDisplayString(true),
      iterGen.generate(0, 20, 2).toDisplayString(true)
    ])
  }
  
  return (
    
    <div className="App">
      <HeaderView />
      <QuestionView />
      
    </div>
  ); 
}

export default App;
