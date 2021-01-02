import logo from './logo.svg';
import './App.css';
import SimpleGen from 'service/SimpleGen';
import IteratedGen from 'service/IteratedGen'

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
      <header className="App-header">
        
        
      <table style={{width : '100%'}}>
      {questions.map(q => 
          <tr>
          <td>{q[0]}<br />&nbsp;</td>
          <td>{q[1]}<br />&nbsp;</td>
          <td>{q[2]}<br />&nbsp;</td>
          {/* <td>{q[3]}<br />&nbsp;</td> */}
          </tr>
        )}
     

      </table>
      
        
      </header>
      
    </div>
  ); 
}

export default App;
