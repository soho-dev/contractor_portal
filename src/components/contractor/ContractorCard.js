import React from 'react';
import { Link } from 'react-router-dom';
import {capitalize} from './../../helpers/functions';
// "id": 1,
//   "first_name": "kamlesh",
//   "last_name": "otari",
//   "date_of_birth": "1990-02-02",
//   "encrypted_ssn": "FVoXdsSlUCoiw56xr6RztNZgXWcPqa9ApQ==\n",
//   "encrypted_ssn_iv": "AhtdDxwh8aDGBic7\n",
//   "email": "kamlesh3@maildrop.cc",
//   "phone": "9876543210",
//   "income": 100000.0,
//   "income_type": "Salary",
//   "requested_loan_amount": 20000.0,
//   "address_id": 1,
//   "status": "pending",
//   "created_at": "2020-04-12T16:53:44.065Z",
//   "updated_at": "2020-04-12T16:53:44.065Z",
//   "ssn": "923456789"
const ContractorCard = ({application, renderMenu}) => {
  
  return (
    <>
      <div className="card bwm-card">
        {application.image && <img 
          className="card-img-top" 
          src={application.image.url}
          alt={application.title} />}
        <div className="card-body">
          <h3 className={`card-subtitle mb-0 type-${application.category}`}>
            {capitalize(`${application.first_name} ${application.last_name}`)}
          </h3>
          <h5 className="card-title big-font">{capitalize(application.status)}</h5>
          <p className="card-text">Income - ${application.income} </p>
          <p className="card-text">Requested loan amount - ${application.requested_loan_amount} </p>
        </div>
      </div>
      { renderMenu && renderMenu() }
    </>
  )
}

export default ContractorCard;