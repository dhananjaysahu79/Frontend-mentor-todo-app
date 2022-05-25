import { useState} from 'react';
import './App.css';
import bgDesktopDark from '../src/images/bg-desktop-dark.jpg';
import iconSun from '../src/images/icon-sun.svg'
import iconMoon from '../src/images/icon-moon.svg'
import iconClose from '../src/images/icon-cross.svg'


function App() {
  const [todoList, setTodoList] = useState([
    'Complete online JavaScript course',
    'Jog around the park 3x',
    '10 minutes meditation',
    'Read for 1 hour',
    'Pick up groceries',
    'Complete Todo App on Frontend Mentor'
  ]);
  const [todoStatus, setTodoStatus] = useState({
    'Complete online JavaScript course' : true,
    'Jog around the park 3x': false,
    '10 minutes meditation': false,
    'Read for 1 hour': false,
    'Pick up groceries': false,
    'Complete Todo App on Frontend Mentor' : false
  })

  const [input, setInput] = useState('');
  const [darkMode, setDarkMode] = useState(true);
  const [curr, setCurr] = useState(1);
  const [activeCount, setActiveCount] = useState(5);

  const handleAddTodo = e => {
    var code = e.keyCode || e.which;
    if(code == 13) {
      e.preventDefault();

      // add it to the todo list
      var temp = [...todoList, input];
      setTodoList(temp);

      // add it to the todoStatus and set it status to false(false means not completed)
      var temp = {...todoStatus};
      temp[input] = false;
      setTodoStatus(temp);

      // now clear the text field.
      setInput('');

      // increment the active count
      setActiveCount(activeCount + 1);
    }
  }

  const handleCheckClick = (todo) => {
    if (todoStatus[todo]) {
      setActiveCount(activeCount + 1);
    }
    else {
      setActiveCount(activeCount - 1);
    }
    var temp = {...todoStatus}
    temp[todo] = !(temp[todo]);
    setTodoStatus(temp);
  }


  const handleDarkMode = () => {
    setDarkMode(!darkMode);
  }
  const handleChange = e => {
    setInput(e.target.value);
  }



  const handleCurrList = (value) => {
     setCurr(value);
  }

  var selectedStyle1 = {
    textDecoration: "line-through",
    color: "hsl(233, 14%, 35%)",
  }

  var selectedStyle2 = {
    color: "hsl(220, 98%, 61%)"
  }


  return (
    <div className="App">
      <img src = {bgDesktopDark} className="top-background-image" alt="" />
      <header className="App-header">

        <div className = 'heading-theme-icon-wrapper'>
          <h1 className = 'todo-heading'>TODO</h1>
          <img className = 'sun-icon' onClick={handleDarkMode}
            src = {darkMode ? iconSun : iconMoon}>
          </img>
        </div>

        <div className = 'todo-input-wrapper'
        >
          <div className = 'radio-container'>
            <input  
            className = 'check' 
            type = 'checkbox'></input>
          </div>
          <input type = 'text'
          onKeyDown={handleAddTodo}
          value={input}
          onChange = {handleChange}
          className = 'text-field' placeholder = 'Create a new todo..'></input>
        </div>

        <div className = 'sized-box'></div>

       {
          todoList
          .map((todo, index) => {
            if (curr === 1 || (curr === 3 && todoStatus[todo]) || (curr === 2 && !todoStatus[todo]))
             return (
               <>
                <div className = 'todo-input-wrapper'>
                  <div className = 'radio-container'>
                    <input 
                    checked = {todoStatus[todo]}
                    onClick={() => handleCheckClick(todo)}
                    className = 'check' type = 'checkbox'></input>
                  </div>

                  <p style = {todoStatus[todo] && curr === 1? selectedStyle1: {}}
                  className='todo-text'>{todo}</p>
                  <img className = 'close-icon' src = {iconClose}></img>
                </div>
                <div className = 'divider'></div>
              </>
             );
          })
       }

       <div className='todo-input-wrapper' id = 'container2'>
          <p className = 'item-left-text'>{activeCount} items left</p>
          <div className='button-container' id = 'button-container1'>
          <p 
            className='functionality-text'
            style={curr === 1 ? selectedStyle2 : {}}
            onClick = {() => handleCurrList(1)}>All</p>
          <p 
            className='functionality-text'
            style={curr === 2 ? selectedStyle2 : {}}
            onClick = {() => handleCurrList(2)}>Active</p>
          <p 
            className='functionality-text'
            style={curr === 3 ? selectedStyle2 : {}}
            onClick = {() => handleCurrList(3)}>Completed</p>
          </div>
          <p className='clear-completed-text'>Clear Completed</p>
       </div>

       <div className = 'sized-box'></div>
       <div className='todo-input-wrapper' id = 'mobile-card'>
          <div className='button-container'>
          <p 
            className='functionality-text'
            style={curr === 1 ? selectedStyle2 : {}}
            onClick = {() => handleCurrList(1)}>All</p>
          <p 
            className='functionality-text'
            style={curr === 2 ? selectedStyle2 : {}}
            onClick = {() => handleCurrList(2)}>Active</p>
          <p 
            className='functionality-text'
            style={curr === 3 ? selectedStyle2 : {}}
            onClick = {() => handleCurrList(3)}>Completed</p>
          </div>
       </div>

       <p className = 'item-left-text'>Drag and drop to reorder list</p>
       <div className = 'sized-box'></div>
       <div class="attribution">
          Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>   |
          Coded by <a href="https://github.com/dhananjaysahu79">Dhananjay Sahu</a>
        </div>
      <div className = 'sized-box'></div>
      </header>
    </div>
  );
}

export default App;
