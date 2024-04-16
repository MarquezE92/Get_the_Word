"use client";
import { useState, useEffect } from "react";
import { generate, count } from "random-words";
import Modal from "./components/Modal";
import ModalInfo from "./components/ModalInfo";


const alphabet = {
  A: "bg-gray-400",
  B: "bg-gray-400",
  C: "bg-gray-400",
  D: "bg-gray-400",
  E: "bg-gray-400",
  F: "bg-gray-400",
  G: "bg-gray-400",
  H: "bg-gray-400",
  I: "bg-gray-400",
  J: "bg-gray-400",
  K: "bg-gray-400",
  L: "bg-gray-400",
  M: "bg-gray-400",
  N: "bg-gray-400",
  O: "bg-gray-400",
  P: "bg-gray-400",
  Q: "bg-gray-400",
  R: "bg-gray-400",
  S: "bg-gray-400",
  T: "bg-gray-400",
  U: "bg-gray-400",
  V: "bg-gray-400",
  W: "bg-gray-400",
  X: "bg-gray-400",
  Y: "bg-gray-400",
  Z: "bg-gray-400",
}
const arrayAlphabet = Array.from({length: 26}, (_, i) => String.fromCharCode(i + 65));
let color = "bg-gray-400"

interface StateModal {
  show: boolean;
  state: "win" | "lose"
}
interface StateShowInfo {
  show: boolean
}

interface StateObject {
  colors:object;
  word: string[];
  counterTries: string;
  firstTry: string[];
  firstTryColors: string[];
  secondTryColors: string[];
  thirdTryColors: string[];
  fourthTryColors: string[];
  fifthTryColors: string[];
  sixthTryColors: string[];
  secondTry: string[];
  thirdTry: string[];
  fourthTry: string[];
  fifthTry: string[];
  sixthTry: string[];
}


export default function Home() {
  
  const [controlModal, setControlModal] = useState<StateModal>({
    show: false,
    state: "win"
  })
  const [controlModalInfo, setControlModalInfo] = useState<StateShowInfo>({
    show: false
  })
  
  const [selection, setSelection] = useState({
    "colors": alphabet,
    "word": ["p", "r", "u", "e", "b"],
    "counterTries": "firstTry",
    "firstTry": [" ", " ", " ", " ", " "],
    "firstTryColors": ["bg-gray-400", "bg-gray-400", "bg-gray-400", "bg-gray-400", "bg-gray-400"],
    "secondTryColors": ["bg-gray-400", "bg-gray-400", "bg-gray-400", "bg-gray-400", "bg-gray-400"],
    "thirdTryColors": ["bg-gray-400", "bg-gray-400", "bg-gray-400", "bg-gray-400", "bg-gray-400"],
    "fourthTryColors": ["bg-gray-400", "bg-gray-400", "bg-gray-400", "bg-gray-400", "bg-gray-400"],
    "fifthTryColors": ["bg-gray-400", "bg-gray-400", "bg-gray-400", "bg-gray-400", "bg-gray-400"],
    "sixthTryColors": ["bg-gray-400", "bg-gray-400", "bg-gray-400", "bg-gray-400", "bg-gray-400"],
    "secondTry": [" ", " ", " ", " ", " "],
    "thirdTry": [" ", " ", " ", " ", " "],
    "fourthTry": [" ", " ", " ", " ", " "],
    "fifthTry": [" ", " ", " ", " ", " "],
    "sixthTry": [" ", " ", " ", " ", " "]
  });

  const closeModal = ()=> {
    setControlModal(prevState=>({...prevState, show: false}))
  }
  const closeModalInfo = ()=> {
    setControlModalInfo({show: false})
  }

  const llamadoDic = async (word) => {
    try {
      const resp = await fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + word);
      if (resp.status === 200) {
        return true; // La palabra existe
      } else {
        return false; // La palabra no existe
      }
    } catch (error) {
      throw new Error("Oops, try again"); // Captura y lanza el error
    }
  }

  const handleReset = ()=> {
    setSelection(prevState => ({
      colors: alphabet,
      word: generate({ minLength: 5, maxLength: 5 }).toUpperCase().split(""),
      counterTries: "firstTry",
      "firstTry": [" ", " ", " ", " ", " "],
      firstTryColors: ["bg-gray-400", "bg-gray-400", "bg-gray-400", "bg-gray-400", "bg-gray-400"],
      secondTryColors: ["bg-gray-400", "bg-gray-400", "bg-gray-400", "bg-gray-400", "bg-gray-400"],
      thirdTryColors: ["bg-gray-400", "bg-gray-400", "bg-gray-400", "bg-gray-400", "bg-gray-400"],
      fourthTryColors: ["bg-gray-400", "bg-gray-400", "bg-gray-400", "bg-gray-400", "bg-gray-400"],
      fifthTryColors: ["bg-gray-400", "bg-gray-400", "bg-gray-400", "bg-gray-400", "bg-gray-400"],
      sixthTryColors: ["bg-gray-400", "bg-gray-400", "bg-gray-400", "bg-gray-400", "bg-gray-400"],
      "secondTry": [" ", " ", " ", " ", " "],
      "thirdTry": [" ", " ", " ", " ", " "],
      "fourthTry": [" ", " ", " ", " ", " "],
      "fifthTry": [" ", " ", " ", " ", " "],
      "sixthTry": [" ", " ", " ", " ", " "]
    }))
  }

  const tryTracker = {
    "firstTry":"secondTry",
    "secondTry":"thirdTry",
    "thirdTry":"fourthTry",
    "fourthTry": "fifthTry",
    "fifthTry":"sixthTry",
    "sixthTry": "No more tries"
  }

  const handleTry = ()=>{
    let updatedColors = { ...selection.colors };
    const selectedletters = selection[selection.counterTries]
    if(selectedletters[4] !== " "){
      for(let letter in selectedletters) {
        let char = selectedletters[letter]

        if(selection.word[letter] === char) {
          updatedColors[char] = "bg-green-400"
          setSelection(prevState => ({
            ...prevState,
            [`${selection.counterTries}Colors`]: [
              ...prevState[`${selection.counterTries}Colors`].slice(0, letter),
              "bg-green-400",
              ...prevState[`${selection.counterTries}Colors`].slice(letter + 1)
            ]
          }));
          
        } else if(selection.word.includes(char) ) {
          setSelection(prevState => ({
            ...prevState,
            [`${selection.counterTries}Colors`]: [
              ...prevState[`${selection.counterTries}Colors`].slice(0, letter),
              "bg-orange-400",
              ...prevState[`${selection.counterTries}Colors`].slice(letter + 1)
            ]
          }));

          if(updatedColors[char] !== "bg-green-400" ) {
            updatedColors[char] ="bg-orange-400"
          }
        
          } else {
            setSelection(prevState => ({
              ...prevState,
              [`${selection.counterTries}Colors`]: [
                ...prevState[`${selection.counterTries}Colors`].slice(0, letter),
                "bg-gray-600",
                ...prevState[`${selection.counterTries}Colors`].slice(letter + 1)
              ]
            }));
            updatedColors[char] ="bg-gray-600"
          }
        
      }
      
      setSelection(prevState=> ({
      ...prevState,
      counterTries: tryTracker[selection.counterTries],
      colors: updatedColors
    }))
  }
    if(selection[selection.counterTries].join("") === selection.word.join("")) {
      return setControlModal(prevState=>({...prevState, show: true}))
    } else if(selection.counterTries === "sixthTry") {
      return setControlModal(prevState=>({state:"lose", show: true}))
    }
  }

  const handleSelect = (key: string): void => {
    switch(selection.counterTries) {
      case "firstTry": {
        let position = selection.firstTry.indexOf(" ");
        
        if(key === "delete") {
          if(position === 0) return
          if(position === -1) {position = 5}
          setSelection(prevState => ({
            ...prevState,
            firstTry: [...prevState.firstTry.slice(0, position -1), " ", ...prevState.firstTry.slice(position)]
          }));
          break;
        }
        if(position === -1) return console.log('No más lugar')
        setSelection(prevState => ({
          ...prevState,
          firstTry: [...prevState.firstTry.slice(0, position), key, ...prevState.firstTry.slice(position+1)]
        }));
        break;
      };
      case "secondTry": {
        let position = selection.secondTry.indexOf(" ");
        
        if(key === "delete") {
          if(position === 0)return
          if(position === -1) {position = 5}
          setSelection(prevState => ({
            ...prevState,
            secondTry: [...prevState.secondTry.slice(0, position -1), " ", ...prevState.secondTry.slice(position)]
          }));
          break;
        }
        if(position === -1) return console.log('No más lugar')
        setSelection(prevState => ({
          ...prevState,
          secondTry: [...prevState.secondTry.slice(0, position), key, ...prevState.secondTry.slice(position+1)]
        }));
        break;
      };
      case "thirdTry": {
        let position = selection.thirdTry.indexOf(" ");
        
        if(key === "delete") {
          if(position === 0)return
          if(position === -1) {position = 5}
          setSelection(prevState => ({
            ...prevState,
            thirdTry: [...prevState.thirdTry.slice(0, position -1), " ", ...prevState.thirdTry.slice(position)]
          }));
          break;
        }
        if(position === -1) return console.log('No más lugar')
        setSelection(prevState => ({
          ...prevState,
          thirdTry: [...prevState.thirdTry.slice(0, position), key, ...prevState.thirdTry.slice(position+1)]
        }));
        break;
      };
      case "fourthTry": {
        let position = selection.fourthTry.indexOf(" ");
        if(key === "delete") {
          if(position === 0)return
          if(position === -1) {position = 5}
          setSelection(prevState => ({
            ...prevState,
            fourthTry: [...prevState.fourthTry.slice(0, position -1), " ", ...prevState.fourthTry.slice(position)]
          }));
          break;
        }
        if(position === -1) return console.log('No más lugar')
        setSelection(prevState => ({
          ...prevState,
          fourthTry: [...prevState.fourthTry.slice(0, position), key, ...prevState.fourthTry.slice(position+1)]
        }));
        break;
      };
      case "fifthTry": {
        let position = selection.fifthTry.indexOf(" ");
        if(key === "delete") {
          if(position === 0)return
          if(position === -1) {position = 5}
          setSelection(prevState => ({
            ...prevState,
            fifthTry: [...prevState.fifthTry.slice(0, position -1), " ", ...prevState.fifthTry.slice(position)]
          }));
          break;
        }
        if(position === -1) return console.log('No más lugar')
        setSelection(prevState => ({
          ...prevState,
          fifthTry: [...prevState.fifthTry.slice(0, position), key, ...prevState.fifthTry.slice(position+1)]
        }));
        break;
      };
      case "sixthTry": {
        let position = selection.sixthTry.indexOf(" ");
        if(key === "delete") {
          if(position === 0)return
          if(position === -1) {position = 5}
          setSelection(prevState => ({
            ...prevState,
            sixthTry: [...prevState.sixthTry.slice(0, position -1), " ", ...prevState.sixthTry.slice(position)]
          }));
          break;
        }
        if(position === -1) return console.log('No más lugar')
        setSelection(prevState => ({
          ...prevState,
          sixthTry: [...prevState.sixthTry.slice(0, position), key, ...prevState.sixthTry.slice(position+1)]
        }));
      };
      default:{
        console.log("The game is over")
      }
      }

    }

    useEffect(()=>{
      let firstWord = generate({ minLength: 5, maxLength: 5 }).toUpperCase().split("")
      console.log(firstWord)
      setSelection(prevState=> ({
        ...prevState,
        word: firstWord
      }))
    },[])

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-blue-500">Get the word <span onClick={()=>setControlModalInfo({show:true})}>?</span></h1>
      <div className="w-full h-full flex flex-col justify-center gap-3">
        <div className="w-full h-full flex justify-center gap-1">
          {
          selection.firstTry.map((character, index)=> (
            <div key={"first" + index} className={`w-10 h-10 flex items-center justify-center rounded-lg cursor-pointer ${selection.firstTryColors[index]}`}>
              <p >{character}</p>
            </div>
            ))
          }
        </div>
        <div className="w-full h-full flex justify-center gap-1">
          {
          selection.secondTry.map((character, index)=> (
            <div key={"second" + index} className={`w-10 h-10 flex items-center justify-center rounded-lg cursor-pointer ${selection.secondTryColors[index]}`}>
              <p >{character}</p>
            </div>
            ))
          }
        </div>
        <div className="w-full h-full flex justify-center gap-1">
          {
          selection.thirdTry.map((character, index)=> (
            <div key={"third" + index} className={`w-10 h-10 flex items-center justify-center rounded-lg cursor-pointer ${selection.thirdTryColors[index]}`}>
              <p >{character}</p>
            </div>
            ))
          }
        </div>
        <div className="w-full h-full flex justify-center gap-1">
          {
          selection.fourthTry.map((character, index)=> (
            <div key={"fourth" + index} className={`w-10 h-10 flex items-center justify-center rounded-lg cursor-pointer ${selection.fourthTryColors[index]}`}>
              <p >{character}</p>
            </div>
            ))
          }
        </div>
        <div className="w-full h-full flex justify-center gap-1">
          {
          selection.fifthTry.map((character, index)=> (
            <div key={"fifth" + index} className={`w-10 h-10 flex items-center justify-center rounded-lg cursor-pointer ${selection.fifthTryColors[index]}`}>
              <p >{character}</p>
            </div>
            ))
          }
        </div>
        <div className="w-full h-full flex justify-center gap-1">
          {
          selection.sixthTry.map((character, index)=> (
            <div key={"first" + index} className={`w-10 h-10 flex items-center justify-center rounded-lg cursor-pointer ${selection.sixthTryColors[index]}`}>
              <p >{character}</p>
            </div>
            ))
          }
        </div>
      </div>

      <button onClick={handleTry}>Try!</button>
      <button onClick={handleReset}>
          <img src="../changeIcon.svg"/>
      </button>
        
      <div className="w-full h-full flex justify-center gap-1">
        {
        arrayAlphabet.map(character=> (
          <div key={character} onClick={()=>handleSelect(character)} className={`w-10 h-10 flex items-center justify-center rounded-lg cursor-pointer ${selection.colors[character]}`}>
            <p >{character}</p>
          </div>
          ))
        }
        <div onClick={()=>handleSelect("delete")} className={`w-20 h-10 flex items-center justify-center rounded-lg cursor-pointer text-white font-bold bg-red-500`}>
            <p >{"<-"}</p>
          </div>
      </div>
 
    </main>
    <Modal word={selection.word.join("")} show={controlModal.show} type={controlModal.state} closeModal={closeModal} />
    <ModalInfo show={controlModalInfo.show} closeModal={closeModalInfo} />
    </>
  );
}
