const express = require("express");
const router = express.Router();
const {
  getToDo,
  saveToDo,
  updateToDo,
  deleteToDo,
  taskStatusUpdate,
  getTotalRecordsCount,
  getCompletedRecordsCount,
} = require("../controllers/ToDoController");

router.get("/", getToDo);
router.get("/total-count", getTotalRecordsCount);
router.get("/completed-count", getCompletedRecordsCount);
router.post("/save", saveToDo);
router.put("/update", updateToDo);
router.put("/status", taskStatusUpdate);
router.delete("/delete", deleteToDo);

// router.get("/", (req, res) => {
//   res.json({
//     message: "success",
//   });
// });

module.exports = router;
