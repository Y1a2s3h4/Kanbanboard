import { useState } from "react";
import { v4 } from "uuid";
import { Plus, X } from "react-feather";
import ReactModal from "react-modal";

export default function CardModal({
  setIsCardModalVisible,
  showCard,
  setCards,
  currentCardInfo,
}) {
  const [cardNameInput, setCardNameInput] = useState("");
  const [cardDescriptionInput, setCardDescriptionInput] = useState("");
  const [cardLabelInput, setCardLabelInput] = useState("");
  const [currentLabelColor, setCurrentLabelColor] = useState("");
  const [cardLabelsArr, setCardLabelsArr] = useState([]);
  function handleCardModalClose() {
    setIsCardModalVisible((prev) => !prev);
    setCardDescriptionInput("");
    setCardNameInput("");
    setCardLabelInput("")
setCurrentLabelColor("")
setCardLabelsArr([])
  }
  function handleCreateCard() {
    const newCard = {
      cardId: v4(),
      boardId: currentCardInfo?.currentCardBoardId,
      description: cardDescriptionInput,
      title: cardNameInput,
      labels: cardLabelsArr,
    };

    setCards((prev) => {
      return [...prev, newCard];
    });
    handleCardModalClose();
    setCardDescriptionInput("");
    setCardNameInput("");
    setCardLabelInput("")
setCurrentLabelColor("")
setCardLabelsArr([])
  }
  return (
    <ReactModal
      isOpen={showCard}
      contentLabel="onRequestClose Example"
      onRequestClose={handleCardModalClose}
      className="Modal p-5 w-[500px] shadow-xl"
      overlayClassName="Overlay"
    >
      <div className="flex flex-nowrap mb-4">
        <h1 className="text-xl font-bold">Add New Card</h1>
        <button onClick={handleCardModalClose} className="block ml-auto">
          {<X />}
        </button>
      </div>
      <div className="flex flex-col justify-between gap-5">
        <input
          type="text"
          onChange={(e) => setCardNameInput(e.target.value)}
          value={cardNameInput}
          className="bg-gray-200 rounded-md p-4 w-full placeholder:text-lg text-lg outline-none"
          placeholder="Enter Card Name"
        />
        <textarea
          className="
        h-[90%]
        bg-gray-200 rounded-md p-4 w-full placeholder:text-lg text-lg outline-none
        "
          value={cardDescriptionInput}
          placeholder="Description here"
          onChange={(e) => setCardDescriptionInput(e.target.value)}
        />
        <div>
        <div className="flex flex-wrap gap-2 my-3">
            {cardLabelsArr.map((label) => (
              <span key={v4()} className={`${label.labelColor} text-white rounded-full p-2 flex gap-1 `}>
                <h1>{label.labelText}</h1> 
          <button onClick={()=>{
            setCardLabelsArr((prev)=>prev.filter((item)=>item.id!==label.id))
          }}>{<X />}</button>
              </span>
            ))}
        </div>
          <div className="flex">
            <input
              type="text"
              onChange={(e) => setCardLabelInput(e.target.value)}
              value={cardLabelInput}
              className="bg-gray-200 rounded-md p-4 w-full placeholder:text-lg text-lg outline-none"
              placeholder="Enter Label"
            />
              <button
                type="button"
                onClick={()=>{
                  setCardLabelsArr((prev)=>[...prev, {id: v4(), labelText: cardLabelInput, labelColor: currentLabelColor || "bg-gray-500"}])
                  setCardLabelInput("")
                }}
                className="flex justify-center items-center  w-fit rounded-md text-white bg-gray-800 font-bold px-5 py-3"
              >
              {<Plus />}
              </button>
          </div>
          <h1 className="text-2xl font-bold mt-5 ">Select Color:</h1>
          <div className="flex gap-6 mt-3">
            <button onClick={()=>setCurrentLabelColor("bg-blue-500")} className={`w-10 h-10 focus:ring-2 focus:ring-blue-500 focus:ring-offset-4  rounded-full p-5 bg-blue-500`}></button>
            <button onClick={()=>setCurrentLabelColor("bg-red-500")} className={`w-10 h-10 focus:ring-2 focus:ring-red-500 focus:ring-offset-4  rounded-full p-5 bg-red-500`}></button>
            <button onClick={()=>setCurrentLabelColor("bg-green-500")} className={`w-10 h-10 focus:ring-2 focus:ring-green-500 focus:ring-offset-4  rounded-full p-5 bg-green-500`}></button>
            <button onClick={()=>setCurrentLabelColor("bg-gray-500")} className={`w-10 h-10 focus:ring-2 focus:ring-gray-500 focus:ring-offset-4  rounded-full p-5 bg-gray-500`}></button>
            <button onClick={()=>setCurrentLabelColor("bg-yellow-500")} className={`w-10 h-10 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-4  rounded-full p-5 bg-yellow-500`}></button>
          </div>
          </div>
          
        <button
          type="button"
          onClick={handleCreateCard}
          className="flex gap-5 ml-auto w-fit rounded-md text-white bg-gray-800 font-bold px-5 py-3"
        >
          {<Plus />} <span>Add Card</span>
        </button>
      </div>
    </ReactModal>
  );
}
