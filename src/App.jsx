import { useState } from "react";
import { Button } from "@/components/ui/button";

const BOARD_SIZE = 15;

export default function Gomoku() {
  const [board, setBoard] = useState(
    Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(0))
  );
  const [player, setPlayer] = useState(1);

  const handleClick = async (x, y) => {
    if (board[x][y] !== 0) return;
    
    let newBoard = board.map(row => [...row]);
    newBoard[x][y] = player;
    setBoard(newBoard);

    // Gửi nước đi lên server để AI phản hồi
    const response = await fetch("/api/move", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ board: newBoard }),
    });
    const data = await response.json();

    if (data.ai_move) {
      newBoard[data.ai_move[0]][data.ai_move[1]] = -1;
      setBoard(newBoard);
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Gomoku AI</h1>
      <div className="grid grid-cols-15 gap-1 border-2 border-black">
        {board.map((row, x) =>
          row.map((cell, y) => (
            <Button
              key={`${x}-${y}`}
              className="w-10 h-10 border border-gray-600 text-lg"
              onClick={() => handleClick(x, y)}
            >
              {cell === 1 ? "X" : cell === -1 ? "O" : ""}
            </Button>
          ))
        )}
      </div>
    </div>
  );
}
