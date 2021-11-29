const PageButton = ({ text, onClick= () => {} }) => {
    return(
        <button className="w-auto bg-blue-500 rounded text-white py-2 px-4"
        onClick={()=>{onClick()}}>
            { text }    
        </button>
    )
}

export default PageButton;