import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
import { getBoards, createBoard } from "../services/api";
import "../styles/app.scss"

function Boards() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [boards, setBoards] = useState([]);

    useEffect(() => {
        getBoards().then(setBoards);
    }, [])

    const handleAddBoard = async () => {
        if (!name.trim()) return;

        const newBoard = await createBoard(name);
        setBoards((prev) => [...prev, newBoard]);
        setName("");
    }

    return (
        <div className="board-container">
            <h1>Boards</h1>

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