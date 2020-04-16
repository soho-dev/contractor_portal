import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {AsyncTypeahead, Typeahead} from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css'; 
import options from '../../helpers/locations_mock';


const ContractorSearchInput = (props) => {
  const [location, setLocation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  //const [options, setOptions] = useState([]);
  //const history = useHistory();
  const [selected, setSelected] = useState([]);
  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  }

  const handleSearch = () => {
    props.checkLocationForApp(location)
    // location ? 
    //   history.push(`/contractors/${location}/homes`) :
    //   history.push('/')
  }

  return (
    <div className="form-inline my-2 my-lg-0">
        <div className="col-md-8">
          {/* <AsyncTypeahead
            isLoading={isLoading}
            labelKey={option => `${option.login}`}
            onSearch={(query) => {
              setIsLoading(true);
              fetch(`https://api.github.com/search/users?q=${query}`)
                .then(resp => resp.json())
                .then(json => {
                    setIsLoading(false);
                    setOptions(json.items);
                  });
            }}
            onChange={(selected)=> {
              setLocation(selected);
            }}
            options={options}
          /> */}
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