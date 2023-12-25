import Card from "./Card";
import { Edit, Plus, Trash } from "react-feather";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMemo } from "react";
import { useState } from "react";
import Modal from "./Modal/BoardModal";

export default function Board({ board, cards, deleteBoard, deleteCard, setIsCardModalVisible, setCurrentCardInfo, setIsUpdateCardModalVisible, setIsUpdateBoardModalVisible, setCurrentBoardInfo }) {
  const cardsArrOfIds = useMemo(
    () => cards.map((card) => card.cardId),
    [cards]
  );

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: board.boardId,
    data: {
      type: "Board",
      board,
    },
  });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="
      bg-gray-200
      opacity-40
      border-2
      border-gray-500
      w-[400px]
      h-[550px]
      max-h-[550px]
      rounded-md
      flex
      flex-col
      "
      ></div>
    );
  }
  return (
    <div
      key={board.boardId}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="text-white flex flex-col p-6 bg-gray-900 rounded-xl w-[400px] min-w-[400px] h-[550px] cursor-grab"
    >
      <div className="mb-5 flex justify-between">
        <h2 className="text-2xl font-semibold">
          {board.name} &nbsp;<span>{cards.length}</span>
        </h2>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => {
              setCurrentBoardInfo(board)
              setIsUpdateBoardModalVisible(true)
            }}
            className="self-center cursor-pointer transition ease-in-out duration-300 w-10 h-10 hover:bg-white bg-transparent border-2 border-white text-white rounded-full flex justify-center items-center hover:text-black"
          >
            {<Edit />}
          </button>
          <button
            type="button"
            onClick={() => deleteBoard(board.boardId)}
            className="self-center cursor-pointer transition ease-in-out duration-300 w-10 h-10 hover:bg-white bg-transparent border-2 border-white text-white rounded-full flex justify-center items-center hover:text-black"
          >
            {<Trash />}
          </button>
        </div>
      </div>
      <div className="custom-scroll flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
        <SortableContext items={cardsArrOfIds}>
          {cards.map((card) => (
            <div key={card.cardId} className="relative">
              <Card card={card} setIsCardModalVisible={setIsCardModalVisible} setIsUpdateCardModalVisible={setIsUpdateCardModalVisible} deleteCard={deleteCard} setCurrentCardInfo={setCurrentCardInfo}/>
            </div>
          ))}
        </SortableContext>
      </div>
      <button
        type="button"
        onClick={() => {
          setIsCardModalVisible(true)
          setCurrentCardInfo(prev=>({...prev, currentCardBoardId: board.boardId}))
        }}
        className="flex gap-5 w-full rounded-md bg-white text-black font-bold px-5 py-3 mt-5"
      >
        {<Plus />} <span>Add Card</span>
      </button>
      
    </div>
  );
}
