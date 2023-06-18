import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import '../css/filteractive.css'

const FilterActive = ({ value, removeValueFromFilter }) => {
    return (
        <div className="filter-active-el" onClick={() => removeValueFromFilter(value)}>
            <div className="filter-active-text">
                <p>{value}</p>
            </div>
            <div className="filter-active-x">
                <FontAwesomeIcon icon={faX} />
            </div>
        </div>
    )
}

export default FilterActive;