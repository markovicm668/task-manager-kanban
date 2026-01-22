import { useAuth } from "../context/AuthContext";

function Notifications({ tasks }) {
    const { user } = useAuth();

    if (!user) return null;

    const today = new Date().toISOString().split("T")[0];
    const notifications = [];

    tasks.forEach(task => {
        if (task.user_id === user.id) {
            notifications.push({
                id: `assign-${task.id}`,
                text: `You are assigned to "${task.title}"`,
            });
        }

        if (task.due_date) {
            if (task.due_date < today) {
                notifications.push({
                    id: `overdue-${task.id}`,
                    text: `"${task.title}" is overdue`,
                });
            } else if (task.due_date === today) {
                notifications.push({
                    id: `due-${task.id}`,
                    text: `"${task.title}" is due today`,
                });
            }
        }
    });

    if (notifications.length === 0) return null;

    return (
        <div className="notifications">
            <h4>Notifications</h4>
            <ul>
                {notifications.map(n => (
                    <li key={n.id}>{n.text}</li>
                ))}
            </ul>
        </div>
    );
}

export default Notifications;
