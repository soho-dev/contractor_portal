import React from 'react';
import ContractorCard from 'components/contractor/ContractorCard';
import { connect } from 'react-redux'
import { fetchContractors } from 'actions';

class ContractorHome extends React.Component {

  componentDidMount() {
    this.props.dispatch(fetchContractors());
  }

  renderContractors = (contractors) => 
    contractors.map(contractor => 
      <div key={contractor._id} className="col-md-3">
        <ContractorCard contractor={contractor}/>
      </div>
    );
  
  render() {
    const { contractors } = this.props;

    return (
      <div className="card-list">  
        <h1 className="page-title">Some information about the portal.</h1>
          {/* <div className="row">
            { this.renderContractors(contractors) }
          </div> */}
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