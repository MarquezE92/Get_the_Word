"use client";
import { useState, useEffect } from "react";
import { generate, count } from "random-words";
import Modal from "./components/Modal";
import { Toaster, toast } from "sonner";
import ModalInfo from "./components/ModalInfo";
import "./loader.css"

interface LetterIndex {
  [key: string]: string; // Esta firma permite acceder a cualquier clave de tipo string
}
const alphabet: LetterIndex = {
  A: "",
  B: "",
  C: "",
  D: "",
  E: "",
  F: "",
  G: "",
  H: "",
  I: "",
  J: "",
  K: "",
  L: "",
  M: "",
  N: "",
  O: "",
  P: "",
  Q: "",
  R: "",
  S: "",
  T: "",
  U: "",
  V: "",
  W: "",
  X: "",
  Y: "",
  Z: "",
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
  [key: string]: any;
  colors:LetterIndex;
  word: string;
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
  const [isLoading, setIsLoading] = useState(false)
  const colorBlock = "border border-gray-400 bg-white"
  const [selection, setSelection] = useState<StateObject>({
    "colors": alphabet,
    "word": "prueb",
    "counterTries": "firstTry",
    "firstTry": [" ", " ", " ", " ", " "],
    "firstTryColors": [colorBlock, colorBlock, colorBlock, colorBlock, colorBlock],
    "secondTryColors": [colorBlock, colorBlock, colorBlock, colorBlock, colorBlock],
    "thirdTryColors": [colorBlock, colorBlock, colorBlock, colorBlock, colorBlock],
    "fourthTryColors": [colorBlock, colorBlock, colorBlock, colorBlock, colorBlock],
    "fifthTryColors": [colorBlock, colorBlock, colorBlock, colorBlock, colorBlock],
    "sixthTryColors": [colorBlock, colorBlock, colorBlock, colorBlock, colorBlock],
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

  const dicCall = async (word:string) => {
    try {
      const resp = await fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + word);
      if (resp.status === 200) {
       // console.log('existe')
        return true; // La palabra existe
      } else {
        //console.log('No existe')
        return false; // La palabra no existe
      }
    } catch (error) {
      throw new Error("Oops, try again"); // Captura y lanza el error
    }
  }

  const handleReset = ()=> {
    const newWord = generate({ minLength: 5, maxLength: 5 });
    setSelection(prevState => ({
      colors: alphabet,
      word: (typeof newWord === "string") ? newWord.toUpperCase() : "",
      counterTries: "firstTry",
      "firstTry": [" ", " ", " ", " ", " "],
      firstTryColors: [colorBlock, colorBlock, colorBlock, colorBlock, colorBlock],
      secondTryColors: [colorBlock, colorBlock, colorBlock, colorBlock, colorBlock],
      thirdTryColors: [colorBlock, colorBlock, colorBlock, colorBlock, colorBlock],
      fourthTryColors: [colorBlock, colorBlock, colorBlock, colorBlock, colorBlock],
      fifthTryColors: [colorBlock, colorBlock, colorBlock, colorBlock, colorBlock],
      sixthTryColors: [colorBlock, colorBlock, colorBlock, colorBlock, colorBlock],
      "secondTry": [" ", " ", " ", " ", " "],
      "thirdTry": [" ", " ", " ", " ", " "],
      "fourthTry": [" ", " ", " ", " ", " "],
      "fifthTry": [" ", " ", " ", " ", " "],
      "sixthTry": [" ", " ", " ", " ", " "]
    }))
  }

  const tryTracker: LetterIndex = {
    "firstTry":"secondTry",
    "secondTry":"thirdTry",
    "thirdTry":"fourthTry",
    "fourthTry": "fifthTry",
    "fifthTry":"sixthTry",
    "sixthTry": "No more tries"
  }

  const handleTry = async()=>{
    setIsLoading(true)
    let updatedColors: LetterIndex = { ...selection.colors };
    const selectedletters = selection[selection.counterTries]
    const wordselected = selectedletters.join("")
    const response = await dicCall(wordselected)
    if(!response) {
      setSelection(prevState=> ({
        ...prevState,
        [selection.counterTries] : [" ", " ", " ", " ", " "]
      }))
      setIsLoading(false);
      return toast.error(`${wordselected} is not a valid word`)

    }
    if(selectedletters[4] === " ") {
      setSelection(prevState=> ({
        ...prevState,
        [selection.counterTries] : [" ", " ", " ", " ", " "]
      }))
      setIsLoading(false);
      return toast.error(`It must be a 5 letters word`)
    }
    if(selectedletters[4] !== " "){
      for(let letter = 0; letter <5; letter++) {
        let char: string = selectedletters[letter];

        if(selection.word[letter] === char) {
          updatedColors[char] = "bg-green-400 text-white"
          setSelection(prevState => ({
            ...prevState,
            [`${selection.counterTries}Colors`]: [
              ...prevState[`${selection.counterTries}Colors`].slice(0, letter),
              "bg-green-400 text-white",
              ...prevState[`${selection.counterTries}Colors`].slice(letter + 1)
            ]
          }));
          
        } else if(selection.word.includes(char) ) {
          setSelection(prevState => ({
            ...prevState,
            [`${selection.counterTries}Colors`]: [
              ...prevState[`${selection.counterTries}Colors`].slice(0, letter),
              "bg-orange-400 text-white",
              ...prevState[`${selection.counterTries}Colors`].slice(letter + 1)
            ]
          }));

          if(updatedColors[char] !== "bg-green-400 text-white" ) {
            updatedColors[char] ="bg-orange-400 text-white"
          }
        
          } else {
            setSelection(prevState => ({
              ...prevState,
              [`${selection.counterTries}Colors`]: [
                ...prevState[`${selection.counterTries}Colors`].slice(0, letter),
                "bg-gray-600 text-white",
                ...prevState[`${selection.counterTries}Colors`].slice(letter + 1)
              ]
            }));
            updatedColors[char] ="bg-gray-600 text-white"
          }
          setIsLoading(false);
      }
      
      setSelection(prevState=> ({
      ...prevState,
      counterTries: tryTracker[selection.counterTries],
      colors: updatedColors
    }))
  }
    if(wordselected === selection.word) {
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
      let newWord = generate({ minLength: 5, maxLength: 5 });
      let firstWord = (typeof newWord === "string") ? newWord.toUpperCase() : "";

      setSelection(prevState=> ({
        ...prevState,
        word: firstWord
      }))
    },[])

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-start p-6 gap-8 bg-slate-50">
        <div className="flex gap-3">
          <button className="h-12 w-12 text-3xl font-bold text-white bg-slate-600 rounded-full" onClick={()=>setControlModalInfo({show:true})}>?</button>
          <button className="h-12 px-3 flex flex-wrap justify-center content-center text-xl gap-1 bg-slate-600 text-white rounded-lg" onClick={handleReset}>
            <img className="h-8 w-8" src="../changeIcon.svg"/>
            <p>Reset</p>
          </button>
        </div>
      <h1 className="text-slate-600 font-bold text-3xl">Get the word </h1>
      <div className="w-full h-full flex flex-col justify-center gap-3">
        <div className="w-full h-full flex justify-center gap-1">
          {
          selection.firstTry.map((character, index)=> (
            <div key={"first" + index} className={`w-10 h-10 flex items-center justify-center rounded-lg cursor-pointer shadow-md ${selection.firstTryColors[index]}`}>
              <p >{character}</p>
            </div>
            ))
          }
        </div>
        <div className="w-full h-full flex justify-center gap-1">
          {
          selection.secondTry.map((character, index)=> (
            <div key={"second" + index} className={`w-10 h-10 flex items-center justify-center rounded-lg cursor-pointer shadow-md ${selection.secondTryColors[index]}`}>
              <p >{character}</p>
            </div>
            ))
          }
        </div>
        <div className="w-full h-full flex justify-center gap-1">
          {
          selection.thirdTry.map((character, index)=> (
            <div key={"third" + index} className={`w-10 h-10 flex items-center justify-center rounded-lg cursor-pointer shadow-md ${selection.thirdTryColors[index]}`}>
              <p >{character}</p>
            </div>
            ))
          }
        </div>
        <div className="w-full h-full flex justify-center gap-1">
          {
          selection.fourthTry.map((character, index)=> (
            <div key={"fourth" + index} className={`w-10 h-10 flex items-center justify-center rounded-lg cursor-pointer shadow-md ${selection.fourthTryColors[index]}`}>
              <p >{character}</p>
            </div>
            ))
          }
        </div>
        <div className="w-full h-full flex justify-center gap-1">
          {
          selection.fifthTry.map((character, index)=> (
            <div key={"fifth" + index} className={`w-10 h-10 flex items-center justify-center rounded-lg cursor-pointer shadow-md ${selection.fifthTryColors[index]}`}>
              <p >{character}</p>
            </div>
            ))
          }
        </div>
        <div className="w-full h-full flex justify-center gap-1">
          {
          selection.sixthTry.map((character, index)=> (
            <div key={"first" + index} className={`w-10 h-10 flex items-center justify-center rounded-lg cursor-pointer shadow-md ${selection.sixthTryColors[index]}`}>
              <p >{character}</p>
            </div>
            ))
          }
        </div>
      </div>
        
      {
        isLoading?
      <div className="loader"></div> :
      <div className="md:w-128 w-full h-full flex justify-center flex-col md:flex-row gap-1">
        <div className="w-full flex flex-wrap justify-center gap-2">
          {
        arrayAlphabet.map(character=> (
          <div key={character} onClick={()=>handleSelect(character)} className={`w-10 h-10 flex items-center justify-center text-2xl rounded-lg cursor-pointer text-black ${selection.colors[character]}`}>
            <p >{character}</p>
          </div>
          ))
        }
        </div>
        
        <div className="flex flex-col gap-2 items-center">
          <button className={`md:w-20 w-40 h-20 flex items-center justify-center rounded-lg cursor-pointer text-white font-bold bg-emerald-500`} onClick={handleTry}>Try!</button>
          <div onClick={()=>handleSelect("delete")} className={`md:w-20 w-40 h-10 flex items-center justify-center rounded-lg cursor-pointer text-white font-bold bg-red-500`}>
            <p >{"<-"}</p>
          </div>
        </div>        
      </div>
      }
 
    </main>
    <Modal word={selection.word} show={controlModal.show} type={controlModal.state} closeModal={closeModal} />
    <ModalInfo show={controlModalInfo.show} closeModal={closeModalInfo} />
    <Toaster richColors position="top-center" />
    </>
  );
}
