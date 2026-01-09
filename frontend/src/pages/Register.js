import { useState } from "react";
import { registerUser } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("external");
    const [error, setError] = useState(null);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async () => {
        setError(null);

        try {
            const res = await registerUser({
                name,
                email,
                password,
                role,
            });

            login(res.user, res.token);
            navigate("/boards");
        } catch (err) {
            console.error(err);
            setError(err.message);
        }
    };


    return (
        <div className="board-container auth-page">
            <h2>Register</h2>

            {error && <p className="error">{error}</p>}

            <input
                placeholder="Name"
                value={name}
                onChange={e => setName(e.target.value)}
            />

            <input
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />

            <select value={role} onChange={e => setRole(e.target.value)}>
                <option value="external">External</option>
                <option value="developer">Developer</option>
                <option value="product_owner">Product Owner</option>
            </select>

            <button onClick={handleSubmit}>Register</button>

            <p>
                Already have an account?{" "}
                <Link to="/login">Login</Link>
            </p>
        </div>
    );
}

export default Register;
