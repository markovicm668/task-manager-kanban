import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card";
import * as api from "../services/api";
import Input from "../components/Input";
import Button from "../components/Button";
import Notifications from "../components/Notifications";

function SingleBoard() {
    const { id } = useParams();
    const [board, setBoard] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [name, setName] = useState("");
    const [users, setUsers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState("");
    const [dueDate, setDueDate] = useState("");

    useEffect(() => {
        api.getBoard(id).then(setBoard);
        api.getBoardTasks(id).then(setTasks);
        api.getUsers().then(setUsers);
        api.fetchCategories().then(setCategories);
    }, [id]);

    const COLUMNS = [
        { key: "todo", title: "To Do" },
        { key: "doing", title: "Doing" },
        { key: "done", title: "Done" },
    ];

    const handleAddTask = async () => {
        if (!name.trim()) return;

        try {
            const newTask = await api.createTask(
                name,
                id,
                categoryId || null,
                dueDate || null
            );

            setName("");
            setTasks([...tasks, newTask]);
            setCategoryId("");
            setDueDate("");
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
        const updatedTask = await api.updateTask(taskId, { status });

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

    const assignUser = async (taskId, userId) => {
        const value = userId === "" ? null : Number(userId);

        const updatedTask = await api.updateTask(taskId, { user_id: value });

        setTasks(prev =>
            prev.map(t =>
                t.id === taskId ? updatedTask : t
            )
        );
    };

    if (!board) return <p>Loading board...</p>;

    return (
        <div className="board-container">

            <h1>{board.name}</h1>

            <Notifications tasks={tasks} />

            <div>
                <Input
                    value={name}
                    onChange={setName}
                    placeholder="Task name"
                />

                <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                >
                    <option value="">No category</option>
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>

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

                                <div className="task-header">
                                    <div className="task-title">{task.title}</div>


                                    <select
                                        value={task.user_id || ""}
                                        onChange={(e) => assignUser(task.id, e.target.value)}
                                    >
                                        <option value="">Unassigned</option>
                                        {users.map(u => (
                                            <option key={u.id} value={u.id}>
                                                {u.name} ({u.role})
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="task-controls">
                                    <select
                                        value={task.category_id || ""}
                                        onChange={(e) => {
                                            const value = e.target.value || null;

                                            api.updateTask(task.id, { category_id: value })
                                                .then(updated => {
                                                    setTasks(prev =>
                                                        prev.map(t =>
                                                            t.id === task.id ? updated : t
                                                        )
                                                    );
                                                });
                                        }}
                                    >
                                        <option value="">No category</option>
                                        {categories.map(cat => (
                                            <option key={cat.id} value={cat.id}>
                                                {cat.name}
                                            </option>
                                        ))}
                                    </select>

                                    <input
                                        type="date"
                                        value={task.due_date || ""}
                                        onChange={(e) => {
                                            const value = e.target.value || null;

                                            api.updateTask(task.id, { due_date: value })
                                                .then(updated => {
                                                    setTasks(prev =>
                                                        prev.map(t =>
                                                            t.id === task.id ? updated : t
                                                        )
                                                    );
                                                });
                                        }}
                                    />
                                </div>

                                <div className="task-actions">
                                    <div className="status-actions">
                                        <Button onClick={() => moveTask(task.id, "todo")} className="primary">To Do</Button>
                                        <Button onClick={() => moveTask(task.id, "doing")} className="primary">Doing</Button>
                                        <Button onClick={() => moveTask(task.id, "done")} className="primary">Done</Button>
                                    </div>

                                    <Button
                                        onClick={() => handleDeleteTask(task.id)}
                                        className="danger"
                                    >
                                        Delete
                                    </Button>
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
