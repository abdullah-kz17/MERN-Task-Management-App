const express = require("express")
const router = express.Router()
const {
    createTask,
    getAllTasks,
    getTaskById,
    updateTaskById,
    deleteTaskById,
    getSortedTasks
} = require("../controllers/taskController")
const protect = require("../middlewares/authMiddleware")

router.post("/",protect,createTask)
router.get("/",protect,getAllTasks)
router.get("/:id",protect,getTaskById)
router.put("/:id",protect,updateTaskById)
router.delete("/:id",protect,deleteTaskById)
router.get("/sorted",protect,getSortedTasks)

module.exports = router