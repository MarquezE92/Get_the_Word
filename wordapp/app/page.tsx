"use client";
import { useState, useEffect } from "react";
import { generate, count } from "random-words";

const alphabet = {
  A: false,
  B: false,
  C: false,
  D: false,
  E: false,
  F: false,
  G: false,
  H: false,
  I: false,
  J: false,
  K: false,
  L: false,
  M: false,
  N: false,
  O: false,
  P: false,
  Q: false,
  R: false,
  S: false,
  T: false,
  U: false,
  V: false,
  W: false,
  X: false,
  Y: false,
  Z: false,
}
const arrayAlphabet = Array.from({length: 26}, (_, i) => String.fromCharCode(i + 65));
let color = "bg-gray-400"

const selection:string[] =[]

interface StateObject {
  firstTry: string[];
  secondTry: string[];
  thirdTry: string[];
  fourthTry: string[];
  fifthTry: string[];
  sixthTry: string[];
}


export default function Home() {
  //const [word, setWord] = useState(firstWord)
  const [selection, setSelection] = useState<StateObject>({
    firstTry: [" ", " ", " ", " ", " "],
    secondTry: [" ", " ", " ", " ", " "],
    thirdTry: [" ", " ", " ", " ", " "],
    fourthTry: [" ", " ", " ", " ", " "],
    fifthTry: [" ", " ", " ", " ", " "],
    sixthTry: [" ", " ", " ", " ", " "]
  });

  const handleSelect = (key: string): void => {
    
  };

  useEffect(()=>{
    let firstWord = generate({ minLength: 5, maxLength: 5 })
    console.log(firstWord)
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
        
      <div className="w-full h-full flex justify-center gap-1">
        {
        arrayAlphabet.map(character=> (
          <div key={character} onClick={()=>handleSelect(character)} className={`w-10 h-10 flex items-center justify-center rounded-lg cursor-pointer ${color}`}>
            <p >{character}</p>
          </div>
          ))
        }
      </div>
      
      
        
      
    </main>
  );
}
