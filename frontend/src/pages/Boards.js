import { useState, useEffect } from "react";
import Card from "../components/Card";
import { getBoards, createBoard } from "../services/api";

function Boards() {

    const [boards, setBoards] = useState();

    useEffect(() => {
        getBoards().then(setBoards);
    })

    return (
        <div>
            <h2>
                Boards
            </h2>

            {boards.map((b) => (
                <Card key={b.id}>{b.name}</Card>
            ))}

        </div>
    );
}

export default Boards;