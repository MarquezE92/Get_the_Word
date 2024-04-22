import { useState } from "react";


interface modalProps {
    show: boolean;
    closeModal: ()=>void
}
const ModalInfo = ({ show, closeModal}: modalProps)=> {
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {

        if (e.target === e.currentTarget) {
            closeModal()
        }
    };
    

    return(
        <div onClick={handleBackdropClick} className={show?"fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 z-50 flex items-center justify-center" : "hidden"}>
            <div className="md:w-1/3 w-3/4 h-3/4 md:h-fit overflow-auto rounded-lg p-6 flex flex-col space-y-4 items-center justify-center bg-white">
                <h1 className="text-3xl font-bold">What is this game?</h1>
                <p className="text-lg">This is a version for educational purposes of the original Wordle game owned by The New York Times. For the original game, visit: <a href="https://www.nytimes.com/games/wordle/index.html" className="text-blue-400">Wordle on The New York Times</a>.</p>
                <h2 className="text-2xl self-start">Objective:</h2>
                <p className="text-lg">Your goal is to guess a secret five-letter word within six attempts.</p>
                <h2 className="text-2xl self-start">Rules:</h2>
                <p className="text-lg self-start">1. Select a five-letter word into the input field and submit your guess.</p>
                <p className="text-lg self-start">2. Each letter you guess will be colored to provide feedback:</p>
                <ul className="text-lg self-start px-3">
                    <li> <span  className="text-green-400">Green:</span> Correct letter in the correct position.</li>
                    <li><span  className="text-orange-400">Orange:</span> Correct letter, but in the wrong position.</li>
                    <li><span  className="text-gray-600">Gray:</span>The letter is not in the word.</li>
                </ul>
                <p className="text-lg self-start">3. You have six attempts to guess the word.</p>
                <p className="text-lg self-start">4. Use the feedback to refine your guesses and deduce the correct word.</p>               
                
            </div>
            
        </div>
    )
}

export default ModalInfo