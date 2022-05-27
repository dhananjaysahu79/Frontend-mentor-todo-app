import { useState } from 'react';
import './App.css';
import bgDarkDesktop from '../src/images/bg-desktop-dark.jpg';
import bgLightDesktop from '../src/images/bg-desktop-light.jpg';
import bgLightMobile from '../src/images/bg-mobile-light.jpg';
import bgDarkMobile from '../src/images/bg-mobile-dark.jpg';
import iconSun from '../src/images/icon-sun.svg'
import iconMoon from '../src/images/icon-moon.svg'
import iconClose from '../src/images/icon-cross.svg'


function App() {

  const [ismobile, setIsMobile] = useState(false);
  window.addEventListener('resize', () => { 
    setIsMobile(window.innerWidth < 768);
  });

  const [todoList, setTodoList] = useState([
    'Complete online JavaScript course',
    'Jog around the park 3x',
    '10 minutes meditation',
    'Read for 1 hour',
    'Pick up groceries',
    'Complete Todo App on Frontend Mentor'
  ]);
  const [todoStatus, setTodoStatus] = useState({
    'Complete online JavaScript course': true,
    'Jog around the park 3x': false,
    '10 minutes meditation': false,
    'Read for 1 hour': false,
    'Pick up groceries': false,
    'Complete Todo App on Frontend Mentor': false
  })

  const [input, setInput] = useState('');
  const [darkMode, setDarkMode] = useState(true);
  const [curr, setCurr] = useState(1);
  const [activeCount, setActiveCount] = useState(5);

  const handleAddTodo = e => {
    var code = e.keyCode || e.which;
    if (code === 13 && input !== '') {
      e.preventDefault();

      var textFieldCheck = document.getElementById('text-field-checkbox').checked;
      // add it to the todo list
      var temp = [...todoList, input];
      setTodoList(temp);

      // add it to the todoStatus and set it status to false(false means not completed)
      temp = { ...todoStatus };
      temp[input] = textFieldCheck;
      setTodoStatus(temp);

      // now clear the text field.
      setInput('');

      // increment the active count
      setActiveCount(activeCount + (textFieldCheck ? 0 : 1));
    }
  }

  const handleCheckClick = (todo) => {
    if (todoStatus[todo]) {
      setActiveCount(activeCount + 1);
    }
    else {
      setActiveCount(activeCount - 1);
    }
    var temp = { ...todoStatus }
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

  const handleClearCompleted = () => {
    var tempTodoList = [];
    var tempTodoStatus = {};
    for (var i = 0; i < todoList.length; i++) {
      if (!todoStatus[todoList[i]]) {
        tempTodoList.push(todoList[i]);
        tempTodoStatus[todoList[i]] = false;
      }
    }
    setTodoList(tempTodoList);
    setTodoStatus(tempTodoStatus);
  }

  const handleDelete = (todo) => {
    if(!todoStatus[todo]){
      setActiveCount(activeCount - 1);
    }
    var tempTodoList = [...todoList];
    var tempTodoStatus = {...todoStatus};
    tempTodoList.splice(tempTodoList.indexOf(todo), 1);
    delete tempTodoStatus[todo];
    setTodoList(tempTodoList);
    setTodoStatus(tempTodoStatus);
  }
  

  var selectedStyle2 = {
    color: "hsl(220, 98%, 61%)"
  }
  var lightBackground = {
    background: 'hsl(0, 0%, 98%)'
  }
  var lightCard = {
    background: 'hsl(0, 0%, 98%)',
    color: "hsl(235, 19%, 35%)",
  }

  var lightDivider = {
    color: "hsl(236, 33%, 92%)"
  }

  var darkBackground = {
    background: 'hsl(235, 21%, 11%)'
  }

  var darkCard = {
    background: 'hsl(235, 24%, 19%)',
    color: "hsl(234, 39%, 85%)"
  }

  var darkDivider = {
    color: "hsl(233, 14%, 35%)"
  }



  return (
    <main style={darkMode ? darkBackground : lightBackground} className="App">
      <img src={darkMode ? 
          (ismobile ? bgDarkMobile : bgDarkDesktop) : 
          (ismobile ? bgLightMobile : bgLightDesktop)
        } 
        className="top-background-image" alt="" />
      <header className="App-header">

        <div className='heading-theme-icon-wrapper'>
          <h1 className='todo-heading'>TODO</h1>
          <img alt='' className='sun-icon' onClick={handleDarkMode}
            src={darkMode ? iconSun : iconMoon}>
          </img>
        </div>

        <div className='todo-input-wrapper'
          style={darkMode ? darkCard : lightCard}
        >
          <div className='radio-container'
            style={darkMode ? darkCard : lightCard}
          >
            <input
              style={
                darkMode ? darkDivider : lightDivider
              }
              className='check'
              id = 'text-field-checkbox'
              type='checkbox'></input>
          </div>
          <input type='text'
            onKeyDown={handleAddTodo}
            value={input}
            onChange={handleChange}
            style={
              darkMode ? darkCard : lightCard
            }
            className='text-field' placeholder='Create a new todo..'></input>
        </div>

        <div className='sized-box'></div>

        {
          todoList
            .map((todo, index) => {
              if (curr === 1 || (curr === 3 && todoStatus[todo]) || (curr === 2 && !todoStatus[todo]))
                return (
                  <>
                    <div className='todo-input-wrapper'
                      style={darkMode ? darkCard : lightCard}
                    >
                      <div className='radio-container'
                        style={darkMode ? darkCard : lightCard}
                      >
                        <input
                          style={
                            darkMode ? darkDivider : lightDivider
                          }
                          checked={todoStatus[todo]}
                          onClick={() => handleCheckClick(todo)}
                          className='check' type='checkbox'></input>
                      </div>

                      <p style={
                        darkMode ? {
                          color: todoStatus[todo] && curr === 1? "hsl(234, 11%, 52%)" : "hsl(234, 39%, 85%)",
                          textDecoration: todoStatus[todo] && curr === 1? "line-through" : "none",
                        } : {
                          color: todoStatus[todo] && curr === 1? "hsl(233, 11%, 84%)" : "hsl(235, 19%, 35%)",
                          textDecoration: todoStatus[todo] && curr === 1? "line-through" : "none",
                        }
                      }
                        className='todo-text'>{todo}</p>
                      <img 
                      onClick={() => handleDelete(todo)}
                      alt='' className='close-icon' src={iconClose}></img>
                    </div>
                    <div style={
                      darkMode ? darkDivider : lightDivider
                    } className='divider'></div>
                  </>
                );

              else return null;
            })
        }

        <div className='todo-input-wrapper'
          style={darkMode ? darkCard : lightCard}
          id='container2'>
          <p className='item-left-text'>{activeCount} items left</p>
          <div className='button-container' id='button-container1'>
            <p
              className='functionality-text'
              style={curr === 1 ? selectedStyle2 : {}}
              onClick={() => handleCurrList(1)}>All</p>
            <p
              className='functionality-text'
              style={curr === 2 ? selectedStyle2 : {}}
              onClick={() => handleCurrList(2)}>Active</p>
            <p
              className='functionality-text'
              style={curr === 3 ? selectedStyle2 : {}}
              onClick={() => handleCurrList(3)}>Completed</p>
          </div>
          <p 
           onClick={handleClearCompleted} className='clear-completed-text'>Clear Completed</p>
        </div>

        <div className='sized-box'></div>
        <div className='todo-input-wrapper'
          style={darkMode ? darkCard : lightCard}
          id='mobile-card'>
          <div className='button-container'>
            <p
              className='functionality-text'
              style={curr === 1 ? selectedStyle2 : {}}
              onClick={() => handleCurrList(1)}>All</p>
            <p
              className='functionality-text'
              style={curr === 2 ? selectedStyle2 : {}}
              onClick={() => handleCurrList(2)}>Active</p>
            <p
              className='functionality-text'
              style={curr === 3 ? selectedStyle2 : {}}
              onClick={() => handleCurrList(3)}>Completed</p>
          </div>
        </div>

        <p className='item-left-text'>Drag and drop to reorder list</p>
        <div className='sized-box'></div>
        <div class="attribution">
          Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="">Frontend Mentor</a>   |
          Coded by <a href="https://github.com/dhananjaysahu79">Dhananjay Sahu</a>
        </div>
        <div className='sized-box'></div>
      </header>
    </main>
  );
}

export default App;
