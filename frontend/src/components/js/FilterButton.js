import '../css/filterbutton.css'

const FIlterButton = ({ submitHandler }) => {
    return(
        <div className='filter-button-wrapper' onClick={submitHandler}>
            <p>Filtruj</p>
        </div>
    )
}

export default FIlterButton;