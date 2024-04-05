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
            <div className="w-fit h-fit rounded-lg p-4 flex flex-col space-y-4 items-center justify-center bg-white">
                <h1>what is this game?</h1>
                <p>This is a practice version of the original Wordle game owned by The New York Times. For the original game, visit: <a href="https://www.nytimes.com/games/wordle/index.html">Wordle on The New York Times</a>.</p>
                <h2>objective:</h2>
                <p>Your goal is to guess a secret five-letter word within six attempts.</p>
                <h2>Rules:</h2>
                <p>1. Select a five-letter word into the input field and submit your guess.</p>
                <p>2. Each letter you guess will be colored to provide feedback:</p>
                <ul>
                    <li>Green: Correct letter in the correct position.</li>
                    <li>Orange: Correct letter, but in the wrong position.</li>
                    <li>Gray: Letter not in the word.</li>
                </ul>
                <p>3. You have six attempts to guess the word.</p>
                <p>4. Use the feedback to refine your guesses and deduce the correct word.</p>
            </div>
            
        </div>
    )
}

export default ModalInfo