import { useState } from "react";
import { loginUser } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const res = await loginUser({ email, password });
        login(res.user, res.token);
        navigate("/boards");
    };

    return (
        <div className="board-container">
            <h2>Login</h2>
            <input value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            <button onClick={handleSubmit}>Login</button>

            <p>
                Already have an account?{" "}
                <Link to="/register">Register</Link>
            </p>
        </div>
    );
}

export default Login;
