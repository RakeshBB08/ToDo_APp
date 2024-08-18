import { useEffect, useState } from "react";
import ToDoBox from "./components/ToDo";
import GreetingSystem from "./components/GreetingSystem";

import {
  addToDo,
  updateToDo,
  deleteToDo,
  getAllToDo,
  getTotalRecordsCount,
  getCompletedRecordsCount,
} from "./utils/HandleApi";

function App() {
  const [toDo, setToDo] = useState([]);
  const [text, setText] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [toDoId, setToDoId] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    getAllToDo(setToDo);
    getTotalRecordsCount(setTotalCount);
    getCompletedRecordsCount(setCompletedCount);
  }, []);

  const updateMode = (_id, text) => {
    setIsUpdating(true);
    setText(text);
    setToDoId(_id);
  };

  const handleEnterKeyPress = () => {
    if (isUpdating) {
      updateToDo(toDoId, text, setToDo, setText, setIsUpdating);
    } else if (text.trim() !== "") {
      addToDo(text, setText, setToDo);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-indigo-100">
      <h1 className="text-violet-600 font-bold text-4xl md:text-6xl text-center my-6">
        Enhanced Todo List
      </h1>
      <GreetingSystem totalCount={totalCount} completedCount={completedCount} />
      <div className="bg-white p-4 rounded-lg shadow-lg mb-8 w-full md:w-[60%] lg:w-[50%] xl:w-[40%]">
        <input
          type="text"
          placeholder="Add a new task ..."
          value={text}
          className="border border-gray-300 rounded-lg p-2 w-full mb-4"
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleEnterKeyPress();
            }
          }}
        />
        <button
          className="bg-purple-500 text-black text-2xl font-semibold rounded-lg p-2 w-full"
          onClick={
            isUpdating
              ? () => updateToDo(toDoId, text, setToDo, setText, setIsUpdating)
              : () => addToDo(text, setText, setToDo)
          }
        >
          {isUpdating ? "Update Task" : "Add Task"}
        </button>
      </div>
      {/* <div className="flex flex-col items-center justify-center bg-orange-700 w-full md:w-[60%] lg:w-[50%] xl:w-[40%]"> */}
      {toDo.map((item) => (
        <ToDoBox
          key={item._id}
          text={item.text}
          completed={item.completed || false}
          updateMode={() => {
            updateMode(item._id, item.text);
          }}
          deleteToDo={() => {
            deleteToDo(item._id, setToDo);
          }}
          taskId={item._id}
          setToDo={setToDo}
          setCompletedCount={setCompletedCount}
        />
      ))}
      {/* </div> */}
    </div>
  );
}

export default App;
