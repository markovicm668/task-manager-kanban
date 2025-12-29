import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card";

const API_URL = "http://127.0.0.1:8000/api";

function SingleBoard() {
    const { id } = useParams();
    const [board, setBoard] = useState(null);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch(`${API_URL}/boards/${id}`)
            .then((res) => res.json())
            .then(setBoard);

        fetch(`${API_URL}/boards/${id}/tasks`)
            .then((res) => res.json())
            .then(setTasks);
    }, [id]);

    if (!board) return <p>Loading board...</p>;

    return (
        <div>
            <h1>SINGLE BOARD PAGE</h1>
            <h2>{board.name}</h2>

            <h3>Tasks</h3>

            {tasks.length === 0 && <p>No tasks yet.</p>}

            {tasks.map((task) => (
                <Card key={task.id}>
                    <strong>{task.title}</strong>
                    <div>Status: {task.status}</div>
                    <div>Priority: {task.priority}</div>
                </Card>
            ))}
        </div>
    );
}

export default SingleBoard;
