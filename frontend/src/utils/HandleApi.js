import axios from "axios";
const baseUrl = "https://mernstack-todo-app-backend-wwr0.onrender.com";

const getAllToDo = (setToDo) => {
  axios.get(baseUrl).then(({ data }) => {
    console.log(`data--> ${data}`);
    setToDo(data);
  });
};

const getTotalRecordsCount = (setTotalCount) => {
  axios
    .get(`${baseUrl}/total-count`)
    .then(({ data }) => {
      console.log(data.totalCount);
      setTotalCount(data.totalCount);
    })
    .catch((error) => {
      console.log(error);
    });
};

const getCompletedRecordsCount = (setCompletedCount) => {
  axios
    .get(`${baseUrl}/completed-count`)
    .then(({ data }) => {
      console.log(data.completedCount);
      setCompletedCount(data.completedCount);
    })
    .catch((error) => {
      console.log(error);
    });
};

const addToDo = (text, setText, setToDo) => {
  text = text.trim();
  if (text === "") {
    alert("Task can't be empty");
  } else {
    axios
      .post(`${baseUrl}/save`, { text })
      .then((data) => {
        console.log(data);
        setText("");
        getAllToDo(setToDo);
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

const updateToDo = (toDoId, text, setToDo, setText, setIsUpdating) => {
  text = text.trim();
  if (text === "") {
    alert("Task can't be empty");
  } else {
    axios
      .put(`${baseUrl}/update`, { _id: toDoId, text: text })
      .then((data) => {
        console.log(data);
        setText("");
        setIsUpdating(false);
        getAllToDo(setToDo);
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

const statusUpdateToDo = (toDoId, setToDo) => {
  axios
    .put(`${baseUrl}/status`, { _id: toDoId })
    .then((data) => {
      console.log(data);
      getAllToDo(setToDo);
    })
    .catch((error) => {
      console.log(error);
    });
};

const deleteToDo = (toDoId, setToDo) => {
  axios
    .delete(`${baseUrl}/delete`, { data: { _id: toDoId } })
    .then((data) => {
      console.log(data);
      getAllToDo(setToDo);
    })
    .catch((error) => {
      console.log(error);
    });
};

export {
  getAllToDo,
  addToDo,
  updateToDo,
  deleteToDo,
  statusUpdateToDo,
  getTotalRecordsCount,
  getCompletedRecordsCount,
};
