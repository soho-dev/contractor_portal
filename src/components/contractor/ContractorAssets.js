
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ContractorAssets = () => 
  <div className="contractor-assets">
    <h3 className="title">Assets</h3>
    <div className="row">
      <div className="col-md-6">
        <span>
          <FontAwesomeIcon icon="asterisk" /> Cooling
        </span>
        <span>
          <FontAwesomeIcon icon="thermometer" /> Heating
        </span>
        <span>
          <FontAwesomeIcon icon="location-arrow" /> Iron
        </span>
      </div>
      <div className="col-md-6">
        <span>
          <FontAwesomeIcon icon="desktop" /> Working area
        </span>
        <span>
          <FontAwesomeIcon icon="cube" /> Washing machine
        </span>
        <span>
          <FontAwesomeIcon icon="archive" /> Dishwasher
        </span>
      </div>
    </div>
  </div>


export default ContractorAssets;