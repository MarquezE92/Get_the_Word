interface modalProps {
    word: string;
    show: boolean;
    type: "win" | "lose";
    closeModal: ()=>void
}
const Modal = ({word, show, type, closeModal}: modalProps)=> {
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {

        if (e.target === e.currentTarget) {
            closeModal()
        }
    };

    return(
        <div onClick={handleBackdropClick} className={show?"fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 z-50 flex items-center justify-center" : "hidden"}>
            <div className="w-fit h-fit rounded-lg p-4 flex flex-col space-y-4 items-center justify-center bg-white">
                <img src={`../../${type}.gif`} className="w-96"/>
                <p className="font-mono text-lg">The secret word was:</p>
                <p className="font-mono text-2xl tracking-wider font-bold text-green-700">{`⭐ ${word} ⭐`}</p>
            </div>
            
        </div>
    )
}

export default Modal