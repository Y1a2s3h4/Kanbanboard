import ReactModal from "react-modal";
import { Plus, X } from "react-feather";
import { useState, useEffect } from "react";

export default function UpdateBoardModal({ setIsUpdateBoardModalVisible, showUpdateBoardModal, setBoards, currentBoardInfo }) {
  const [boardNameInput, setBoardNameInput] = useState(currentBoardInfo?.name);
  useEffect(() => {
    setBoardNameInput(currentBoardInfo?.name)
  }, [currentBoardInfo])
  
  function handleBoardModalClose() {
    setIsUpdateBoardModalVisible((prev) => !prev);
    setBoardNameInput("")
  }

  function handleUpdateBoard() {
    setBoards((prev) => {
      const newBoards = [...prev]
      // update the name value for the current board

      const currentBoardIndex = newBoards.findIndex(
        (board) => board.boardId === currentBoardInfo?.boardId
      );
      newBoards[currentBoardIndex].name = boardNameInput
      return newBoards
    });
    handleBoardModalClose();
    setBoardNameInput("")
  }

  return (
    <>
      <ReactModal
        isOpen={showUpdateBoardModal}
        contentLabel="onRequestClose Example"
        onRequestClose={handleBoardModalClose}
        className="Modal p-5 w-[500px] shadow-xl"
        overlayClassName="Overlay"
      >
        <div className="flex flex-nowrap mb-4">
          <h1 className="text-xl font-bold">Update Board</h1>
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
            onClick={handleUpdateBoard}
            className="flex gap-5 ml-auto w-fit rounded-md text-white bg-gray-800 font-bold px-5 py-3"
          >
            {<Plus />} <span>Update Board</span>
          </button>
        </div>
      </ReactModal>
    </>
  );
}
