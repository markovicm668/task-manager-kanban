import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { getBoards, createBoard } from "../services/api";

function Boards() {
    const navigate = useNavigate();
    const [boards, setBoards] = useState([]);

    useEffect(() => {
        getBoards().then(setBoards);
    })

    return (
        <div>
            <h2>
                Boards
            </h2>

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