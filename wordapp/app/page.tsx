"use client";
import { useState, useEffect } from "react";
import { generate, count } from "random-words";

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



interface StateObject {
  colors:object;
  word: string[];
  counterTries: string;
  firstTry: string[];
  secondTry: string[];
  thirdTry: string[];
  fourthTry: string[];
  fifthTry: string[];
  sixthTry: string[];
}


export default function Home() {
  
  
  const [selection, setSelection] = useState<StateObject>({
    colors: alphabet,
    word: ["p", "r", "u", "e", "b"],
    counterTries: "firstTry",
    firstTry: [" ", " ", " ", " ", " "],
    secondTry: [" ", " ", " ", " ", " "],
    thirdTry: [" ", " ", " ", " ", " "],
    fourthTry: [" ", " ", " ", " ", " "],
    fifthTry: [" ", " ", " ", " ", " "],
    sixthTry: [" ", " ", " ", " ", " "]
  });


  const handleTry = ()=> {
    if(selection.counterTries === "sixthTry") {
      if(selection.sixthTry.join("") === selection.word.join("")) {
        return window.alert(`Congrats! The secret word was ${selection.word.join("")}`)
      } else {
        return window.alert(`Ooops! The secret word was ${selection.word.join("")}, better luck next time`)
      }
    }
    let updatedColors = { ...selection.colors };

    if(selection.fifthTry[4] !== " ") { 
      if(selection.fifthTry.join("") === selection.word.join("")) return window.alert(`Congrats! The secret word was ${selection.word.join("")}`)
      for(let letter in selection.fifthTry) {
        let char = selection.fifthTry[letter]

        if(selection.word[letter] === char) {
          updatedColors[char] = "bg-green-400"
          
        } else if(selection.word.includes(char) &&
          updatedColors[char] !== "bg-green-400"
        ) {
          updatedColors[char] ="bg-orange-400"}
        
      }
      setSelection(prevState=> ({
      ...prevState,
      counterTries: "sixthTry",
      colors: updatedColors
    }))
    } else if(selection.fourthTry[4] !== " ") { 
      if(selection.fourthTry.join("") === selection.word.join("")) return window.alert(`Congrats! The secret word was ${selection.word.join("")}`)
      for(let letter in selection.fourthTry) {
        let char = selection.fourthTry[letter]

        if(selection.word[letter] === char) {
          updatedColors[char] = "bg-green-400"
          
        } else if(selection.word.includes(char) &&
          updatedColors[char] !== "bg-green-400"
        ) {
          updatedColors[char] ="bg-orange-400"}
        
      }
      setSelection(prevState=> ({
      ...prevState,
      counterTries: "fifthTry",
      colors: updatedColors
    }))
    } else if(selection.thirdTry[4] !== " ") { 
      if(selection.thirdTry.join("") === selection.word.join("")) return window.alert(`Congrats! The secret word was ${selection.word.join("")}`)
      for(let letter in selection.thirdTry) {
        let char = selection.thirdTry[letter]

        if(selection.word[letter] === char) {
          updatedColors[char] = "bg-green-400"
          
        } else if(selection.word.includes(char) &&
          updatedColors[char] !== "bg-green-400"
        ) {
          updatedColors[char] ="bg-orange-400"}
        
      }
      setSelection(prevState=> ({
      ...prevState,
      counterTries: "fourthTry",
      colors: updatedColors
    }))
    } else if(selection.secondTry[4] !== " ") { 
      if(selection.secondTry.join("") === selection.word.join("")) return window.alert(`Congrats! The secret word was ${selection.word.join("")}`)
      for(let letter in selection.secondTry) {
        let char = selection.secondTry[letter]

        if(selection.word[letter] === char) {
          updatedColors[char] = "bg-green-400"
          
        } else if(selection.word.includes(char) &&
          updatedColors[char] !== "bg-green-400"
        ) {
          updatedColors[char] ="bg-orange-400"}
        
      }

      setSelection(prevState=> ({
      ...prevState,
      counterTries: "thirdTry",
      colors: updatedColors
    }))
    } else if(selection.firstTry[4] !== " "){ 
      if(selection.firstTry.join("") === selection.word.join("")) return window.alert(`Congrats! The secret word was ${selection.word.join("")}`)
      for(let letter in selection.firstTry) {
        let char = selection.firstTry[letter]

        if(selection.word[letter] === char) {
          updatedColors[char] = "bg-green-400"
          
        } else if(selection.word.includes(char) &&
          updatedColors[char] !== "bg-green-400"
        ) {
          updatedColors[char] ="bg-orange-400"}
        } 

    setSelection(prevState=> ({
      ...prevState,
      counterTries: "secondTry",
      colors: updatedColors
    }))
    }  
    }

  const handleSelect = (key: string): void => {
    switch(selection.counterTries) {
      case "firstTry": {
        const position = selection.firstTry.indexOf(" ");
        if(position === -1) return console.log('No más lugar')
        setSelection(prevState => ({
          ...prevState,
          firstTry: [...prevState.firstTry.slice(0, position), key, ...prevState.firstTry.slice(position+1)]
        }));
        break;
      };
      case "secondTry": {
        const position = selection.secondTry.indexOf(" ");
        if(position === -1) return console.log('No más lugar')
        setSelection(prevState => ({
          ...prevState,
          secondTry: [...prevState.secondTry.slice(0, position), key, ...prevState.secondTry.slice(position+1)]
        }));
        break;
      };
      case "thirdTry": {
        const position = selection.thirdTry.indexOf(" ");
        if(position === -1) return console.log('No más lugar')
        setSelection(prevState => ({
          ...prevState,
          thirdTry: [...prevState.thirdTry.slice(0, position), key, ...prevState.thirdTry.slice(position+1)]
        }));
        break;
      };
      case "fourthTry": {
        const position = selection.fourthTry.indexOf(" ");
        if(position === -1) return console.log('No más lugar')
        setSelection(prevState => ({
          ...prevState,
          fourthTry: [...prevState.fourthTry.slice(0, position), key, ...prevState.fourthTry.slice(position+1)]
        }));
        break;
      };
      case "fifthTry": {
        const position = selection.fifthTry.indexOf(" ");
        if(position === -1) return console.log('No más lugar')
        setSelection(prevState => ({
          ...prevState,
          fifthTry: [...prevState.fifthTry.slice(0, position), key, ...prevState.fifthTry.slice(position+1)]
        }));
        break;
      };
      default: {
        const position = selection.sixthTry.indexOf(" ");
        if(position === -1) return console.log('No más lugar')
        setSelection(prevState => ({
          ...prevState,
          sixthTry: [...prevState.sixthTry.slice(0, position), key, ...prevState.sixthTry.slice(position+1)]
        }));
      };
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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-blue-500">Get the word</h1>
      <div className="w-full h-full flex flex-col justify-center gap-3">
        <div className="w-full h-full flex justify-center gap-1">
          {
          selection.firstTry.map((character, index)=> (
            <div key={"first" + index} className={`w-10 h-10 flex items-center justify-center rounded-lg cursor-pointer ${color}`}>
              <p >{character}</p>
            </div>
            ))
          }
        </div>
        <div className="w-full h-full flex justify-center gap-1">
          {
          selection.secondTry.map((character, index)=> (
            <div key={"second" + index} className={`w-10 h-10 flex items-center justify-center rounded-lg cursor-pointer ${color}`}>
              <p >{character}</p>
            </div>
            ))
          }
        </div>
        <div className="w-full h-full flex justify-center gap-1">
          {
          selection.thirdTry.map((character, index)=> (
            <div key={"third" + index} className={`w-10 h-10 flex items-center justify-center rounded-lg cursor-pointer ${color}`}>
              <p >{character}</p>
            </div>
            ))
          }
        </div>
        <div className="w-full h-full flex justify-center gap-1">
          {
          selection.fourthTry.map((character, index)=> (
            <div key={"fourth" + index} className={`w-10 h-10 flex items-center justify-center rounded-lg cursor-pointer ${color}`}>
              <p >{character}</p>
            </div>
            ))
          }
        </div>
        <div className="w-full h-full flex justify-center gap-1">
          {
          selection.fifthTry.map((character, index)=> (
            <div key={"fifth" + index} className={`w-10 h-10 flex items-center justify-center rounded-lg cursor-pointer ${color}`}>
              <p >{character}</p>
            </div>
            ))
          }
        </div>
        <div className="w-full h-full flex justify-center gap-1">
          {
          selection.sixthTry.map((character, index)=> (
            <div key={"first" + index} className={`w-10 h-10 flex items-center justify-center rounded-lg cursor-pointer ${color}`}>
              <p >{character}</p>
            </div>
            ))
          }
        </div>
      </div>

      <button onClick={handleTry}>Try!</button>
        
      <div className="w-full h-full flex justify-center gap-1">
        {
        arrayAlphabet.map(character=> (
          <div key={character} onClick={()=>handleSelect(character)} className={`w-10 h-10 flex items-center justify-center rounded-lg cursor-pointer ${selection.colors[character]}`}>
            <p >{character}</p>
          </div>
          ))
        }
      </div>
      
      
        
      
    </main>
  );
}
