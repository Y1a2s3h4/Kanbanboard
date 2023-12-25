import { Plus } from "react-feather";
import { useMemo, useState, useEffect } from "react";
import BoardModal from "./Modal/BoardModal";
import { initialBoard, initialCards } from "../data";
import { MouseSensor } from "./CustomSensors";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  // MouseSensor,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import Board from "./Boards";
import { createPortal } from "react-dom";
import Card from "./Card";
import CardModal from "./Modal/CardModal";
import UpdateCardModal from "./Modal/UpdateCardModal";
import ReactModal from "react-modal";
import UpdateBoardModal from "./Modal/UpdateBoardModal";
ReactModal.setAppElement("#portal");
export default function KanbanBoard() {
  const [isBoardModalVisible, setIsBoardModalVisible] = useState(false);
  const [isCardModalVisible, setIsCardModalVisible] = useState(false);
  const [isUpdateCardModalVisible, setIsUpdateCardModalVisible] =
    useState(false);
  const [isUpdateBoardModalVisible, setIsUpdateBoardModalVisible] =
    useState(false);

  const savedBoards = JSON.parse(localStorage.getItem("boards"));
  const savedCards = JSON.parse(localStorage.getItem("cards"));

  const [boards, setBoards] = useState(savedBoards || initialBoard);
  const [cards, setCards] = useState(savedCards || initialCards);
  const [currentCardInfo, setCurrentCardInfo] = useState({});
  const [currentBoardInfo, setCurrentBoardInfo] = useState({});

  useEffect(() => {
    localStorage.setItem("boards", JSON.stringify(boards));
    localStorage.setItem("cards", JSON.stringify(cards));
  }, [boards, cards]);

  const boardsArrOfIds = useMemo(
    () => boards.map((board) => board.boardId),
    [boards]
  );
  const [activeTask, setActiveTask] = useState(null);
  const [activeColumn, setActiveColumn] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );
  function onDragStart(event) {
    if (event.active.data.current?.type === "Board") {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === "Card") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }
  function onDragEnd(event) {
    setActiveColumn(null);
    setActiveTask(null);
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveABoard = active.data.current?.type === "Board";
    if (!isActiveABoard) return;

    console.log("DRAG END", event);

    setBoards((prevBoards) => {
      const activeBoardIndex = prevBoards.findIndex(
        (board) => board.boardId === activeId
      );

      const overBoardIndex = prevBoards.findIndex(
        (board) => board.boardId === overId
      );
      console.log(activeBoardIndex, overBoardIndex);
      return arrayMove(prevBoards, activeBoardIndex, overBoardIndex);
    });
  }
  function onDragOver(event) {
    const { active, over } = event;
    if (!over) return;
    console.log(active, over);
    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveACard = active.data.current?.type === "Card";
    const isOverACard = over.data.current?.type === "Card";

    if (!isActiveACard) return;

    if (isActiveACard && isOverACard) {
      setCards((cards) => {
        const activeIndex = cards.findIndex((card) => card.cardId === activeId);
        const overIndex = cards.findIndex((card) => card.cardId === overId);

        if (cards[activeIndex].boardId != cards[overIndex].boardId) {
          cards[activeIndex].boardId = cards[overIndex].boardId;
          return arrayMove(cards, activeIndex, overIndex - 1);
        }

        return arrayMove(cards, activeIndex, overIndex);
      });
    }

    const isOverABoard = over.data.current?.type === "Board";

    console.log(over, active);
    if (isActiveACard && isOverABoard) {
      setCards((cards) => {
        const activeIndex = cards.findIndex((card) => card.cardId === activeId);
        console.log("DROPPING TASK OVER COLUMN", { activeIndex });
        cards[activeIndex].boardId = overId;
        return arrayMove(cards, activeIndex, activeIndex);
      });
    }
  }
  function deleteBoard(boardId) {
    const newBoards = boards.filter((board) => board.boardId !== boardId);
    setBoards(newBoards);

    const newCards = cards.filter((card) => card.boardId !== boardId);
    setCards(newCards);
  }
  function deleteCard(cardId) {
    const newCards = cards.filter((card) => card.cardId !== cardId);
    setCards(newCards);
  }
  return (
    <div className="flex overflow-y-auto gap-7 mt-10">
      <BoardModal
        show={isBoardModalVisible}
        setBoards={setBoards}
        setIsBoardModalVisible={setIsBoardModalVisible}
      />
      <UpdateBoardModal
        setIsUpdateBoardModalVisible={setIsUpdateBoardModalVisible}
        showUpdateBoardModal={isUpdateBoardModalVisible}
        currentBoardInfo={currentBoardInfo}
        setBoards={setBoards}
      />
      <CardModal
        showCard={isCardModalVisible}
        setCards={setCards}
        setIsCardModalVisible={setIsCardModalVisible}
        currentCardInfo={currentCardInfo}
      />
      <UpdateCardModal
        showUpdateCard={isUpdateCardModalVisible}
        setCards={setCards}
        setIsUpdateCardModalVisible={setIsUpdateCardModalVisible}
        currentCardInfo={currentCardInfo}
      />
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <SortableContext items={boardsArrOfIds}>
          {boards.map((board) => (
            <Board
              key={board.boardId}
              board={board}
              deleteBoard={deleteBoard}
              setBoards={setBoards}
              deleteCard={deleteCard}
              setIsCardModalVisible={setIsCardModalVisible}
              setIsUpdateCardModalVisible={setIsUpdateCardModalVisible}
              setIsUpdateBoardModalVisible={setIsUpdateBoardModalVisible}
              cards={cards.filter((card) => card.boardId === board.boardId)}
              setCurrentCardInfo={setCurrentCardInfo}
              setCurrentBoardInfo={setCurrentBoardInfo}
            />
          ))}
        </SortableContext>
        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <Board
                board={activeColumn}
                deleteBoard={deleteBoard}
                deleteCard={deleteCard}
                cards={cards.filter(
                  (card) => card.boardId === activeColumn.boardId
                )}
              />
            )}
            {activeTask && <Card card={activeTask} deleteCard={deleteCard} />}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
      <div>
        <button
          type="button"
          onClick={() => setIsBoardModalVisible(true)}
          className="flex gap-5 w-max rounded-md text-white bg-gray-800 font-bold px-5 py-3"
        >
          {<Plus />} <span>Add Board</span>
        </button>
      </div>
    </div>
  );
}
