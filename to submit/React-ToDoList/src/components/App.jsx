import { useEffect, useState } from "react"
import { NewForm } from "./NewForm"
import { ToDoList } from "./ToDoList"
import "./styles.css"

// Kick off the program by rendering the App component into the root HTML element
function App() {

  // To keep track of the list of items that the user has added
  const [toDoItems, updateToDoItems] = useState([])

  // To store the list of items in the browser's local storage
  // useEffect(() => {
  //   localStorage.setItem("ITEMS", JSON.stringify(toDoItems))
  // }, [toDoItems]

  // The function to update/add the new item to the list of items 
  const addToDo = (itemTitle) => {
    updateToDoItems(currentToDoItems => {
      return[...currentToDoItems, { id: crypto.randomUUID(), itemTitle, completed: false}];
    });
  }
    
  // The function to update the completed status of a specific item in the list
  function toggleToDo(id, completed){
    addToDoItems(currentToDoItems => {
      return currentToDoItems.map(toDoItems => {
        if (toDoItems.id === id) {
          return Object.assign({}, toDoItems, {completed});
        } else {
          return toDoItems;
        }
      });
    });   
  };

  // To delete an item from the list
  function deleteToDo(id) {
    updateToDoItems(currentToDoItems => {

      // To check each to-do item in the array and keeps only those that do not match the id of the item to be deleted
      return currentToDoItems.filter(todo => todo.id !== id)
    });
  };

  return(
    <>
      {/* Render the component by assigning the addToDoList function */}
      <NewForm onSubmit={addToDoItems} />

      <h1 className="header">To-Do List</h1>

      {/* Render the component by assigning the toDoItems, toggleToDo and deleteToDo functions */}
      <ToDoList toDoItems={toDoItems} toggleToDo={toggleToDo} deleteToDo={deleteToDo} />

    </>
  )
}

export default App;

