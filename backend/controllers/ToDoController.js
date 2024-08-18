const ToDoModel = require("../models/ToDoModel");

module.exports.getToDo = async (req, res) => {
  const toDo = await ToDoModel.find();
  res.send(toDo);
};

module.exports.saveToDo = async (req, res) => {
  const { text } = req.body;
  ToDoModel.create({ text }).then((data) => {
    console.log("Added Successfully");
    console.log(data);
    res.send(data);
  });
};

module.exports.updateToDo = async (req, res) => {
  const { _id, text } = req.body;
  ToDoModel.findByIdAndUpdate(_id, { text })
    .then(() => {
      res.send("Updated Successfully...");
    })
    .catch((err) => console.log(err));
};

module.exports.taskStatusUpdate = async (req, res) => {
  const { _id } = req.body;

  // Find the current value of the 'completed' field
  ToDoModel.findById(_id)
    .then((task) => {
      if (!task) {
        res.status(404).send("Task not found");
      } else {
        // Toggle the 'completed' field value
        const updatedCompletedValue = !task.completed;

        // Update the 'completed' field with the new value
        ToDoModel.findByIdAndUpdate(_id, { completed: updatedCompletedValue })
          .then(() => {
            res.send(
              `Task Status Updated Successfully. New value: ${updatedCompletedValue}`
            );
          })
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Internal Server Error");
    });
};

module.exports.deleteToDo = async (req, res) => {
  const { _id } = req.body;
  ToDoModel.findByIdAndDelete(_id)
    .then(() => {
      res.send("Deleted Successfully...");
    })
    .catch((err) => console.log(err));
};

module.exports.getTotalRecordsCount = async (req, res) => {
  try {
    const totalCount = await ToDoModel.countDocuments();
    res.json({ totalCount });
  } catch (error) {
    console.error("Error getting total records count:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports.getCompletedRecordsCount = async (req, res) => {
  try {
    const completedCount = await ToDoModel.countDocuments({ completed: true });
    res.json({ completedCount });
  } catch (error) {
    console.error("Error getting completed records count:", error);
    res.status(500).send("Internal Server Error");
  }
};
