// import logo from './logo.svg';
import { useState } from 'react';
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

  const [darkMode, setDarkMode] = useState(true);

  const handleDarkMode = () => {
    setDarkMode(!darkMode);
  }


  return (
    <div className="App">
      <img src = {bgDesktopDark} className="top-background-image" alt="" />
      <header className="App-header">
      {/* <img src = {bgDesktopDark} className="top-background-image" alt="" /> */}

        <div className = 'heading-theme-icon-wrapper'>
          <h1 className = 'todo-heading'>TODO</h1>
          <img className = 'sun-icon' onClick={handleDarkMode}
            src = {darkMode ? iconSun : iconMoon}>
          </img>
        </div>

        <div className = 'todo-input-wrapper'>
          <div className = 'radio-container'>
            <input className = 'check' type = 'checkbox'></input>
          </div>
          <input type = 'text' className = 'text-field' placeholder = 'Create a new todo..'></input>
        </div>

        <div className = 'sized-box'></div>
       
       {
          todoList.map((todo, index) => {
             return (
               <>
                <div className = 'todo-input-wrapper'>
                  <div className = 'radio-container'>
                    <input className = 'check' type = 'checkbox'></input>
                  </div>
                  <p className='todo-text'>{todo}</p>
                  <img className = 'close-icon' src = {iconClose}></img>
                </div>
                <div className = 'divider'></div>
              </>
             );
          })
       }

       <div className='todo-input-wrapper' id = 'container2'>
          <p className = 'item-left-text'>5 items left</p>
          <div className='button-container' id = 'button-container1'>
            <a>All</a>
            <a>Active</a>
            <a>Completed</a>
          </div>
          <p className='clear-completed-text'>Clear Completed</p>
       </div>

       <div className = 'sized-box'></div>
       <div className='todo-input-wrapper' id = 'mobile-card'>
          <div className='button-container'>
            <a>All</a>
            <a>Active</a>
            <a>Completed</a>
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
