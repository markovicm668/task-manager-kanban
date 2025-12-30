import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
import { getBoards, createBoard } from "../services/api";

function Boards() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [boards, setBoards] = useState([]);

    useEffect(() => {
        getBoards().then(setBoards);
    })

    const handleAddBoard = async () => {
        if (!name.trim()) return;

        const newBoard = await createBoard(name);
        setBoards((prev) => [...prev, newBoard]);
        setName("");
    }

    return (
        <div>
            <h2>
                Boards
            </h2>

            <div style={{ marginBottom: "12px" }}>
                <Input
                    value={name}
                    onChange={setName}
                    placeholder="Board name"
                />
                <Button onClick={handleAddBoard}>Add Board</Button>
            </div>

            {boards.map((b) => (
                <Card
                    key={b.id}
                    onClick={() => navigate(`/boards/${b.id}`)}
                >
                    <span>{b.name}</span>
                </Card>
            ))}

        </div>
    );
}

export default Boards;