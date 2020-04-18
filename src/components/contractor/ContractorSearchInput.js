import React, { useState } from 'react';
import {Typeahead} from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css'; 
import options from '../../helpers/locations_mock';


const ContractorSearchInput = (props) => {
  const [location, setLocation] = useState([]);
  const [selected, setSelected] = useState([]);
  
  const handleSearch = () => {
    props.checkLocationForApp(location)
  }

  return (
    <div className="form-inline my-2 my-lg-0">
        <div className="col-md-8">
          <Typeahead
            selected={selected}
            id="basic-typeahead-example"
            labelKey={option => `${option.label}`}
            onChange={(selected)=> {
              if(selected.length>0){setLocation(selected[0].label);}
              setSelected(selected);
            }}
            options={options}
            placeholder="Choose a location..."
          />
        </div>
      
      <button
        onClick={handleSearch} 
        className="btn btn-bwm-main btn-outline-success ml-2 my-sm-0" 
        type="button">Search</button>
    </div>
  )
}

export default ContractorSearchInput;