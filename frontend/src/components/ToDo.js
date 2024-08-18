import React from "react";
import { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { IoTrashSharp } from "react-icons/io5";
import { ImCheckboxUnchecked, ImCheckboxChecked } from "react-icons/im";
import { statusUpdateToDo } from "../utils/HandleApi";

const ToDoBox = ({
  text,
  updateMode,
  deleteToDo,
  taskId,
  setToDo,
  completed,
  setCompletedCount,
}) => {
  const [isChecked, setIsChecked] = useState(completed);
  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
    statusUpdateToDo(taskId, setToDo);
    setCompletedCount((prevCount) =>
      isChecked ? prevCount - 1 : prevCount + 1
    );
  };

  const textStyle = {
    textDecoration: isChecked ? "line-through" : "none",
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-violet-200 w-full rounded-md md:w-[60%] lg:w-[50%] xl:w-[40%]">
      <div className="flex items-center justify-between w-full m-4 p-2 border border-solid border-slate-600 rounded-md  bg-white shadow-md">
        <div className="m-6 flex items-center text-2xl font-semibold">
          <div className="mr-2">
            {isChecked ? (
              <ImCheckboxChecked
                className="cursor-pointe bg-lime-500"
                onClick={toggleCheckbox}
              />
            ) : (
              <ImCheckboxUnchecked
                className="cursor-pointer"
                onClick={toggleCheckbox}
              />
            )}
          </div>
          <span style={textStyle} className="text-xl md:text-2xl ">
            {text}
          </span>
        </div>
        <div className="m-6 flex items-center text-2xl">
          <BiEdit
            className="cursor-pointer mr-2 text-orange-400 font-semibold bg-black rounded-md"
            onClick={updateMode}
          />
          <IoTrashSharp
            className="cursor-pointer text-red-600 font-semibold bg-black rounded-sm"
            onClick={deleteToDo}
          />
        </div>
      </div>
    </div>
  );
};

export default ToDoBox;
