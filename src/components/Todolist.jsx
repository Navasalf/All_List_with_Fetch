import React, { useState, useEffect } from 'react';

export function Listado() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

  function handleTask(event) {
    setInputValue(event.target.value);
  }

  async function handleTaskList(event) {
    if (event.key === "Enter") {
      if (inputValue.trim() !== "") {
        const newTask = { label: inputValue, done: false };
        const updatedTodos = [...todos, newTask];
        setTodos(updatedTodos);
        setInputValue("");

        try {
          // Enviar la nueva tarea a la API usando POST
          await updateTodoList(updatedTodos);
        } catch (error) {
          console.error('Error:', error);
        }
      }
    }
  }

  async function eliminarItem(index) {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);

    try {
      // Enviar la lista actualizada a la API usando PUT
      await updateTodoList(updatedTodos);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async function updateTodoList(updatedTodos) {
    try {
      const response = await fetch(
        "https://playground.4geeks.com/apis/fake/todos/user/alfredo123",
        {
          method: 'PUT',
          body: JSON.stringify(updatedTodos),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        throw new Error('Error al actualizar la lista en la API');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async function buttonClear() {
    setTodos([]);

    try {
      // Enviar la lista vacía a la API usando POST
      await updateTodoList([]);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    async function fetchTodoList() {
      try {
        const response = await fetch(
          "https://playground.4geeks.com/apis/fake/todos/user/alfredo123"
        );
        const data = await response.json();
        console.log("Todo list:", data);
        setTodos(data);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchTodoList();
  }, []);

  return (
    <div className="container">
      <div><h1> Todos</h1></div>
      <div className="list-group">
        <ul>
          <li className='list-group-item'>
            <input
              type="text"
              maxLength="38"
              onChange={handleTask}
              value={inputValue}
              onKeyDown={handleTaskList}

            />
          </li>
          {todos.length > 0 && todos.map((item, index) => (
            <li className="list-group-item" key={index}>
              {item.label}

              <button class="delete-button" onClick={() => eliminarItem(index)}>X</button>

            </li>
          ))}
          <li class="list-group-item">
            <div>{todos.length} Item</div>
          </li>
        </ul>


        <div className='one'></div>

        <div className='two'></div>

        <div className='three'></div>
      </div>
      <button className="deleteButton" onClick={buttonClear}>Clear</button>
    </div>

  );
};

export default Listado;