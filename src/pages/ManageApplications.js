
import React from 'react';
import { fetchApplications} from 'actions';
import { connect } from 'react-redux';
import ApiErrors from 'components/forms/ApiErrors';
import DataTable from 'react-data-table-component';
import {capitalize} from './../helpers/functions'; 
const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <>
    <div className="col-md-5 input-group mb-3">
      <input id="search" className="form-control" type="text" placeholder="Search" value={filterText} onChange={onFilter} /> 
      <div className="input-group-append">
        <button className="btn btn-outline-secondary" type="button" onClick={onClear}>X</button>
      </div>  
    </div><br/>
  </>
);

class ManageApplications extends React.Component {
  state={
    filterText: '',
    resetPaginationToggle:false
  
  }
  componentDidMount() {
    this.props.dispatch(fetchApplications());
  }
  handleClear = () => {
    if (this.state.filterText) {
      this.setState({
        filterText:"",
        resetPaginationToggle: !this.state.resetPaginationToggle})
    }
  };
  subHeaderComponentMemo = () => {
    return ;
  };
  renderApplicationTable =(applications) =>{
    let format = new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency: 'USD', 
        minimumFractionDigits: 2, 
    });
    
    let statusFormat =  (row)=>{
      switch (row.status) {
        case 'Approved':
          return  <h5><span className="badge badge-success">{ row.status}</span></h5>
        break;
        case 'Pending':
            return <h5><span className="badge badge-primary">{ row.status}</span></h5>
        break;
        case 'Rejected':
            return <h5><span className="badge badge-danger">{ row.status}</span></h5>
        break;
        default:
            return <h5><span className="badge badge-primary">{row.status}</span></h5>
        break;
      }
    } 
    
    let columns = [
      {name : 'Application Id', selector: "id", sortable: true,maxWidth: "140px"},
      {name : 'Name', selector: "name", sortable: true,},
      {name : 'Income', selector: "income", sortable: true,},
      {name : 'Income type', selector: "income_type", sortable: true,},
      {name : 'Requested loan amount', selector: "requested_loan_amount", sortable: true,},
      {name : 'Status', selector: "status", sortable: true, cell:statusFormat},
    ]
    let appTableData=[] ;
    applications.map((item)=>{
      appTableData.push({
        id:item.id,
        name: `${item.first_name} ${item.last_name}`,
        income:`${format.format(item.income)}`,
        income_type: `${item.income_type}`,
        requested_loan_amount: `${format.format(item.requested_loan_amount)}`,
        status: `${capitalize(item.status)}`
      })
    })
    const filteredItems = appTableData.filter(item => {
            return (item.name && item.name.includes(this.state.filterText)) ||
              (item.status && item.status.includes(this.state.filterText)) ||
              (item.income_type && item.income_type.includes(this.state.filterText)) ||
              (item.id && (item.id == this.state.filterText));
    });
    return <div className="col-md-12"><DataTable
        title="Applications List"
        columns={columns}
        data={filteredItems}
        defaultSortField="id"
        pagination={true}
        actions={<FilterComponent onFilter={e => this.setState({'filterText':e.target.value})} onClear={()=>this.handleClear} filterText={this.state.filterText} />}
    /></div>
  }
  render() {
    const { applications, errors, isFetching } = this.props;
    
    return (
      <div className="card-list">
        <div className="row">
          <div className="col-md-12">
            <h1 className="page-title">Loan applications list</h1>
          </div>
        </div> 
        <div className="row">
          <div className="col-md-12">
            <ApiErrors errors={errors} />
          </div>
        </div>   
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