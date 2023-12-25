import { useState, useEffect } from "react";
import { Plus, X } from "react-feather";
import ReactModal from "react-modal";
import { v4 } from "uuid";

export default function UpdateCardModal({ setIsUpdateCardModalVisible, showUpdateCard, setCards, currentCardInfo}) {
  const [cardNameInput, setCardNameInput] = useState(currentCardInfo?.title)
  const [cardDescriptionInput, setCardDescriptionInput] = useState(currentCardInfo?.description)

  const [cardLabelInput, setCardLabelInput] = useState("");
  const [currentLabelColor, setCurrentLabelColor] = useState("");
  const [cardLabelsArr, setCardLabelsArr] = useState(currentCardInfo?.labels);
  useEffect(()=>{
    setCardNameInput(currentCardInfo?.title)
    setCardDescriptionInput(currentCardInfo?.description)
    setCardLabelsArr(currentCardInfo?.labels)
  },[currentCardInfo])
  function handleCardModalClose() {
    setIsUpdateCardModalVisible((prev) => !prev);
    setCardDescriptionInput("");
    setCardNameInput("");
    setCardLabelInput("")
setCurrentLabelColor("")
setCardLabelsArr([])
  }
  function handleUpdateCard() {
    setCards((prev) => {
      const currentCardIndex = prev.findIndex(
        (card) => card.cardId === currentCardInfo?.cardId
      );
      const newCard = {
        ...currentCardInfo,
        description: cardDescriptionInput,
        title: cardNameInput,
        labels: cardLabelsArr,
      };
      return prev.toSpliced(currentCardIndex, 1, newCard);
    });
    handleCardModalClose();
    setCardDescriptionInput("");
    setCardNameInput("");
    setCardDescriptionInput("");
    setCardNameInput("");
    setCardLabelInput("")
setCurrentLabelColor("")
setCardLabelsArr([])
  }
  return (
    <ReactModal
      isOpen={showUpdateCard}
      contentLabel="onRequestClose Example"
      onRequestClose={handleCardModalClose}
      className="Modal p-5 w-[500px] shadow-xl"
      overlayClassName="Overlay"
    >
      <div className="flex flex-nowrap mb-4">
        <h1 className="text-xl font-bold">Update Card</h1>
        <button onClick={handleCardModalClose} className="block ml-auto">
          {<X />}
        </button>
      </div>
      <div className="flex flex-col justify-between gap-5">
        <input
          type="text"
          onChange={(e) => setCardNameInput(e.target.value)}
          // value={cardNameInput}
          value={cardNameInput}
          className="bg-gray-200 rounded-md p-4 w-full placeholder:text-lg text-lg outline-none"
          placeholder="Enter Board Name"
        />
        <textarea
          className="
        h-[90%]
        bg-gray-200 rounded-md p-4 w-full placeholder:text-lg text-lg outline-none
        "
          // value={cardDescriptionInput}
          value={cardDescriptionInput}
          placeholder="Description here"
          onChange={(e) => setCardDescriptionInput(e.target.value)}
        />
        <div>
        <div className="flex flex-wrap gap-2 my-3">
            {cardLabelsArr?.map((label) => (
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
            <button onClick={()=>setCurrentLabelColor("bg-blue-500")} className={`w-10 h-10 rounded-full p-5 bg-blue-500`}></button>
            <button onClick={()=>setCurrentLabelColor("bg-red-500")} className={`w-10 h-10 rounded-full p-5 bg-red-500`}></button>
            <button onClick={()=>setCurrentLabelColor("bg-green-500")} className={`w-10 h-10 rounded-full p-5 bg-green-500`}></button>
            <button onClick={()=>setCurrentLabelColor("bg-gray-500")} className={`w-10 h-10 rounded-full p-5 bg-gray-500`}></button>
            <button onClick={()=>setCurrentLabelColor("bg-yellow-500")} className={`w-10 h-10 rounded-full p-5 bg-yellow-500`}></button>
          </div>
          </div>
        <button
          type="button"
          onClick={handleUpdateCard}
          className="flex gap-5 ml-auto w-fit rounded-md text-white bg-gray-800 font-bold px-5 py-3"
        >
          {<Plus />} <span>Update</span>
        </button>
      </div>
    </ReactModal>
  );
}
