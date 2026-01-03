import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card";
import { getBoard, getBoardTasks, createTask } from "../services/api";
import Input from "../components/Input";
import Button from "../components/Button";


function SingleBoard() {
    const { id } = useParams();
    const [board, setBoard] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [name, setName] = useState("");

    useEffect(() => {
        getBoard(id).then(setBoard);
        getBoardTasks(id).then(setTasks);
    }, [id]);

    const handleAddTask = async () => {
        if (!name.trim()) return;

        try {
            const newTask = await createTask(name, id);

            setName("");
            setTasks([newTask, ...tasks]);
        } catch (err) {
            console.error("Failed to create task:", err);
        }
    };

    if (!board) return <p>Loading board...</p>;

    return (
        <div>
            <h1>SINGLE BOARD PAGE</h1>
            <h2>{board.name}</h2>

            <div>
                <Input
                    value={name}
                    onChange={setName}
                    placeholder="Task name"
                />
                <Button onClick={handleAddTask}> Add task </Button>
            </div>
            <h3>Tasks</h3>

            {tasks.length === 0 && <p>No tasks yet.</p>}

            {tasks.map((task) => (
                <Card key={task.id}>
                    <strong>{task.title}</strong>
                    <div>Status: {task.status}</div>
                </Card>
            ))}
        </div>
    );
}

export default SingleBoard;
