import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import { useAuth } from "../context/AuthContext";
import Input from "../components/Input";
import Button from "../components/Button";

function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Clear previous errors
        setLoading(true);

        try {
            const result = await loginUser({ email, password });
            login(result.user, result.token);
            navigate("/boards");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="board-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                {error && (
                    <div style={{
                        color: 'red',
                        marginBottom: '10px',
                        padding: '10px',
                        backgroundColor: '#ffebee',
                        borderRadius: '4px'
                    }}>
                        {error}
                    </div>
                )}

                <Input
                    type="email"
                    value={email}
                    onChange={setEmail}
                    placeholder="Email"
                    required
                />

                <Input
                    type="password"
                    value={password}
                    onChange={setPassword}
                    placeholder="Password"
                    required
                />

                <Button
                    type="submit"
                    className="primary"
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Login"}
                </Button>
            </form>

            <p>
                Don't have an account?{" "}
                <a href="/register">Register here</a>
            </p>
        </div>
    );
}

export default Login;