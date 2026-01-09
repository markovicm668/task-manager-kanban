import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card";
import * as api from "../services/api";
import Input from "../components/Input";
import Button from "../components/Button";


function SingleBoard() {
    const { id } = useParams();
    const [board, setBoard] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [name, setName] = useState("");

    useEffect(() => {
        api.getBoard(id).then(setBoard);
        api.getBoardTasks(id).then(setTasks);
    }, [id]);

    const COLUMNS = [
        { key: "todo", title: "To Do" },
        { key: "doing", title: "Doing" },
        { key: "done", title: "Done" },
    ];

    const handleAddTask = async () => {
        if (!name.trim()) return;

        try {
            const newTask = await api.createTask(name, id);

            setName("");
            setTasks([...tasks, newTask]);
        } catch (err) {
            console.error("Failed to create task:", err);
        }
    };

    const tasksByStatus = {
        todo: tasks.filter(t => t.status === "todo"),
        doing: tasks.filter(t => t.status === "doing"),
        done: tasks.filter(t => t.status === "done"),
    };

    const moveTask = async (taskId, status) => {
        const updatedTask = await api.updateTaskStatus(taskId, status);

        setTasks(tasks.map(t =>
            t.id === taskId ? updatedTask : t
        ));
    };

    const handleDeleteTask = async (taskId) => {
        try {
            await api.deleteTask(taskId);

            setTasks(tasks => tasks.filter(t => t.id !== taskId));
        } catch (error) {
            console.log("Failed to delete task", error);

        }

    }


    if (!board) return <p>Loading board...</p>;

    return (
        <div className="board-container">
            <h1>{board.name}</h1>

            <div>
                <Input
                    value={name}
                    onChange={setName}
                    placeholder="Task name"
                />
                <Button onClick={handleAddTask}> Add task </Button>
            </div>
            <h3>Tasks</h3>

            <div className="kanban">
                {COLUMNS.map(column => (
                    <div className={`column ${column.key}`} key={column.key}>

                        <h3>{column.title}</h3>

                        {tasksByStatus[column.key].length === 0 && (
                            <p>No tasks</p>
                        )}

                        {tasksByStatus[column.key].map(task => (
                            <Card className="card" key={task.id}>
                                <strong>{task.title}</strong>

                                <div className="actions">
                                    <Button onClick={() => moveTask(task.id, "todo")} className="primary">To Do</Button>
                                    <Button onClick={() => moveTask(task.id, "doing")} className="primary">Doing</Button>
                                    <Button onClick={() => moveTask(task.id, "done")} className="primary">Done</Button>
                                    <Button onClick={() => handleDeleteTask(task.id)} className="danger">DELETE</Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                ))}
            </div>

        </div>


    );
}

export default SingleBoard;
