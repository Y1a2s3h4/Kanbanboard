import { v4 as uuidv4 } from "uuid";
import Label from "./Label";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Edit, Trash } from "react-feather";
export default function Card({ card, deleteCard, setIsUpdateCardModalVisible, setCurrentCardInfo }) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: card.cardId,
    data: {
      type: "Card",
      card,
    },
    // disabled: editMode,
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
            opacity-30
          p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl border-2 border-white cursor-grab relative
          "
      />
    );
  }
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white text-black my-4 rounded-md p-3 cursor-grab"
    >
      
        <div className="flex justify-between mb-5" data-no-dnd="true">
          <h3 className="text-2xl self-center">{card.title}</h3>
          <div className="flex">
            <button 
              onClick={() => {
                setCurrentCardInfo(card)
                setIsUpdateCardModalVisible(true)
              }}
              className="self-center transition-all duration-300 flex justify-center items-center text-black p-2 w-10 h-10 rounded-full hover:bg-gray-100"
            >
              {<Edit />}
            </button>
            <button 
              onClick={() => {
                deleteCard(card.cardId);
              }}
              className="self-center transition-all duration-300 flex justify-center items-center text-black p-2 w-10 h-10 rounded-full hover:bg-gray-100"
            >
              {<Trash />}
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {card?.labels?.map((label) => (
            <Label key={label.id} title={label.labelText} color={label.labelColor} />
          ))}
        </div>
    </div>
  );
}
