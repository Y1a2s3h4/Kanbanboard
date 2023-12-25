import ReactModal from "react-modal";
import { Plus, X } from "react-feather";
import { useState } from "react";

export default function Modal({ setIsBoardModalVisible, show, setBoards }) {
  const [boardNameInput, setBoardNameInput] = useState("");

  function handleBoardModalClose() {
    setIsBoardModalVisible((prev) => !prev);
    setBoardNameInput("")
  }

  function handleCreateBoard() {
    setBoards((prev) => [
      ...prev,
      { name: boardNameInput, boardId: boardNameInput },
    ]);
    handleBoardModalClose();
    setBoardNameInput("")
  }

  return (
    <>
      <ReactModal
        isOpen={show}
        contentLabel="onRequestClose Example"
        onRequestClose={handleBoardModalClose}
        className="Modal p-5 w-[500px] shadow-xl"
        overlayClassName="Overlay"
      >
        <div className="flex flex-nowrap mb-4">
          <h1 className="text-xl font-bold">Add New Board</h1>
          <button onClick={handleBoardModalClose} className="block ml-auto">
            {<X />}
          </button>
        </div>
        <div className="flex flex-col justify-between gap-5">
          <input
            type="text"
            onChange={(e) => setBoardNameInput(e.target.value)}
            value={boardNameInput}
            autoFocus
            className="bg-gray-200 rounded-md p-4 w-full placeholder:text-lg text-lg outline-none"
            placeholder="Enter Board Name"
          />
          <button
            type="button"
            onClick={handleCreateBoard}
            className="flex gap-5 ml-auto w-fit rounded-md text-white bg-gray-800 font-bold px-5 py-3"
          >
            {<Plus />} <span>Add Board</span>
          </button>
        </div>
      </ReactModal>
    </>
  );
}
