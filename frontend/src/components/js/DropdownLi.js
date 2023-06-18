import '../css/dropdownli.css'

const DropdownLi = ({ value, addFilter, filterType, setDdShown }) => {
    return (
        <div className='dropdown-li' onClick={() => {addFilter(filterType, value); setDdShown(false)}}>
            <p className='dropdown-li-p'>{value}</p>
        </div>
    )
}

export default DropdownLi;