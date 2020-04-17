import React from 'react';
const SuccessMessage = ({createNewApp}) => {
  
  return (
    <>
      <div className="col-md-12">
        <h2>Application successfully created.</h2>
        <button onClick={()=>createNewApp('location')} className="btn btn-bwm-main ml-2"> Create Another Application</button>
      </div>
    </>
  )
}

export default SuccessMessage;