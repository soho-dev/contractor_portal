
import React from 'react';
import { fetchApplications} from 'actions';
import { connect } from 'react-redux';
import ApiErrors from 'components/forms/ApiErrors';
import DataTable from 'react-data-table-component';
import {capitalize} from './../helpers/functions'; 


class ManageApplications extends React.Component {

  componentDidMount() {
    this.props.dispatch(fetchApplications());
  }
  state = {
    pagination:true
  }
  setPagination = (val)=>{
    this.setState({pagination:val});
  }
  renderApplicationTable =(applications) =>{
    let columns = [
      {name : 'Id', selector: "id", sortable: true,},
      {name : 'Name', selector: "name", sortable: true,},
      {name : 'Income', selector: "income", sortable: true,},
      {name : 'Income type', selector: "income_type", sortable: true,},
      {name : 'Requested loan amount', selector: "requested_loan_amount", sortable: true,},
      {name : 'Status', selector: "status", sortable: true},
    ]
    let appTableData=[] ;
    applications.map((item)=>{
      appTableData.push({
        id:item.id,
        name: `${item.first_name} ${item.last_name}`,
        income:`$${item.income}`,
        income_type: `${item.income_type}`,
        requested_loan_amount: `$${item.requested_loan_amount}`,
        status: `${capitalize(item.status)}`
      })
    })
    
    return <div className="col-md-12"><DataTable
        title="Applications List"
        columns={columns}
        data={appTableData}
        defaultSortField="id"
        pagination={true}
    /></div>
  }
  render() {
    const { applications, errors, isFetching } = this.props;
    let columns = [
      {display : 'Name', name: "first_name"}
    ]
    return (
      <div className="card-list">  
        <h1 className="page-title">Applications</h1>
        <ApiErrors errors={errors} />
        <div className="row">
          {this.renderApplicationTable(applications)}
        </div>
        { !isFetching && applications.length === 0 &&
          <p className="alert alert-warning">
            You dont have any applications currently created :(
          </p>
        }
      </div>
    )
  }
}

const mapStateToProps = ({manage}) => {
  return {
    applications: manage.contractors.items,
    isFetching: manage.contractors.isFetching,
    errors: manage.contractors.errors
  }
}

export default connect(mapStateToProps)(ManageApplications);