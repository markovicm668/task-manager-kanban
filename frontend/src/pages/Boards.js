import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
import { getBoards, createBoard } from "../services/api";
import { useAuth } from "../context/AuthContext";
import "../styles/app.scss"

function Boards() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [name, setName] = useState("");
    const [boards, setBoards] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        getBoards().then(setBoards);
    }, [])

    const handleAddBoard = async () => {
        if (!name.trim()) return;

        try {
            setError("");
            const newBoard = await createBoard(name);
            setBoards((prev) => [...prev, newBoard]);
            setName("");
        } catch (err) {
            setError("Failed to create board. Only Product Owners can create boards.");
        }
    }

    const isProductOwner = user?.role === 'product_owner';

    return (
        <div className="board-container">
            <h1>Boards</h1>

            {isProductOwner && (
                <div className="board-form">
                    <Input
                        value={name}
                        onChange={setName}
                        placeholder="Board name"
                    />
                    <Button onClick={handleAddBoard} className="primary">
                        Add Board
                    </Button>
                </div>
            )}

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {boards.length === 0 && <p>No boards yet.</p>}

            <div className="boards-grid">
                {boards.map((b) => (
                    <Card
                        key={b.id}
                        className="board-card"
                        onClick={() => navigate(`/boards/${b.id}`)}
                    >
                        <strong>{b.name}</strong>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default Boards;