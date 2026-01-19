import { useEffect, useState } from "react";
import * as api from "../services/api";
import "../styles/app.scss"

function Calendar() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        // Load ALL tasks (simplest version)
        api.getBoardTasks(1).then(setTasks);
        // ⬆️ If you want per-board later, we can improve this
    }, []);

    // Group tasks by date
    const tasksByDate = tasks.reduce((acc, task) => {
        if (!task.due_date) return acc;

        acc[task.due_date] = acc[task.due_date] || [];
        acc[task.due_date].push(task);

        return acc;
    }, {});

    const sortedDates = Object.keys(tasksByDate).sort();

    return (
        <div className="calendar-page">
            <h1>Calendar</h1>

            {sortedDates.length === 0 && <p>No scheduled tasks</p>}

            {sortedDates.map(date => (
                <div key={date} className="calendar-day">
                    <h3>{date}</h3>

                    <ul>
                        {tasksByDate[date].map(task => (
                            <li key={task.id}>
                                <strong>{task.title}</strong>
                                {task.category && ` (${task.category.name})`}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default Calendar;
