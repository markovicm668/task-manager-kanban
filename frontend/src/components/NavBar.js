import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../services/api";

function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    if (!user) return null; // hide navbar if not logged in

    const handleLogout = async () => {
        try {
            await logoutUser();
        } catch (e) {
            // even if backend fails, clear frontend auth
        } finally {
            logout();
            navigate("/login");
        }
    };

    return (
        <div className="navbar">
            <div className="navbar-left">
                <strong className="logo" onClick={() => navigate("/boards")}>
                    Kanban
                </strong>
            </div>

            <div className="navbar-right">
                <span className="user-info">
                    {user.name} ({user.role})
                </span>

                <button className="danger" onClick={handleLogout}>
                    Logout
                </button>

                <button onClick={() => navigate("/calendar")}>
                    Calendar
                </button>

            </div>
        </div>
    );
}

export default Navbar;
