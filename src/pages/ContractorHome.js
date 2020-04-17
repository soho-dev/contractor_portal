import React from 'react';
import { connect } from 'react-redux'

class ContractorHome extends React.Component {
  
  render() {

    return (
      <div className="card-list">  
        <h1 className="page-title">PoC - Simple Online Loan Application.</h1>
      </div>
    )
  }
}

const mapStateToProps = ({contractors}) => {
  return {
    contractors: contractors.items
  }
}

export default connect(mapStateToProps)(ContractorHome);