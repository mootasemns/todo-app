import { useState, useEffect } from "react";
import { faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./App.css";

export default function App() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState(null); // Start with null to ensure loading
  const [theme, setTheme] = useState(
    localStorage.getItem("savedTheme") || "standard"
  );

  // Load todos from localStorage on initial render
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(savedTodos); // Set todos after localStorage has been fetched
  }, []);

  // Save todos to localStorage whenever todos state changes (including empty array)
  useEffect(() => {
    if (todos !== null) {
      // Only save if todos are initialized
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  // Save theme to localStorage when theme state changes
  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("savedTheme", theme);
  }, [theme]);

  const handleInputChange = (e) => setInputValue(e.target.value);

  const addTodo = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) {
      alert("You must write something!");
      return;
    }
    setTodos([...todos, { text: inputValue, completed: false }]);
    setInputValue("");
  };

  const toggleComplete = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const changeTheme = (newTheme) => setTheme(newTheme);

  return (
    <>
      <header id="header">
        <div className="flexrow-container">
          <div
            className="standard-theme theme-selector"
            onClick={() => changeTheme("standard")}
          ></div>
          <div
            className="light-theme theme-selector"
            onClick={() => changeTheme("light")}
          ></div>
          <div
            className="darker-theme theme-selector"
            onClick={() => changeTheme("darker")}
          ></div>
        </div>
        <h1 id="title">
          Just do it.<div id="border"></div>
        </h1>
      </header>

      <div id="form">
        <form onSubmit={addTodo}>
          <input
            className={`todo-input ${theme}-input`}
            type="text"
            placeholder="Add a task."
            value={inputValue}
            onChange={handleInputChange}
          />
          <button type="submit" className={`todo-btn ${theme}-button`}>
            I Got This!
          </button>
        </form>
      </div>

      <div className="version">
        <div className="demo version-section">
          <a href="https://github.com/mootasemns" className="github-corner">
            <svg
              width="80"
              height="80"
              viewBox="0 0 250 250"
              style={{
                fill: "#151513",
                color: "#fff",
                position: "absolute",
                top: 0,
                border: 0,
                left: 0,
                transform: "scale(-1, 1)",
              }}
            >
              <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
              <path
                d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
                fill="currentColor"
                style={{ transformOrigin: "130px 106px" }}
                className="octo-arm"
              ></path>
              <path
                d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
                fill="currentColor"
                className="octo-body"
              ></path>
            </svg>
          </a>
        </div>
        <p>
          <span id="datetime">{new Date().toLocaleString()}</span>
        </p>
      </div>

      {todos !== null ? (
        <ul className="todo-list">
          {todos.map((todo, index) => (
            <div
              key={index}
              className={`todo ${theme}-todo ${
                todo.completed ? "completed" : ""
              }`}
            >
              <li className="todo-item">{todo.text}</li>
              <button
                className={`check-btn ${theme}-button`}
                onClick={() => toggleComplete(index)}
              >
                <FontAwesomeIcon icon={faCheck} />
              </button>
              <button
                className={`delete-btn ${theme}-button`}
                onClick={() => deleteTodo(index)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          ))}
        </ul>
      ) : (
        <p>Loading todos...</p>
      )}
    </>
  );
}
