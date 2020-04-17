import React from 'react';
import { css } from "@emotion/core";
import ContractorForm from 'components/forms/ContractorForm';
import { createApplication, checkLocationForApp } from 'actions';
import { Redirect } from 'react-router-dom';
import ContractorSearchInput from 'components/contractor/ContractorSearchInput';
import FadeLoader from "react-spinners/FadeLoader";
import ApiErrors from 'components/forms/ApiErrors';
import SuccessMessage from 'components/contractor/SuccessMessage';
import * as moment from 'moment';


const override = css`
  display: block;
  margin-left:50%;
  border-color: red;
`;

class NewApplication extends React.Component {

  state = {
    appLocation:'location',
    shouldRedirect: false,
    showSpinner:false,
    errors:[],
    location:{},
  }

  submitApplication = (appData) => {
    const applicationData =  {...appData,
                             "address_id": this.state.location.id,
                              "date_of_birth":moment(appData.date_of_birth).format('ddd, DD MMM YYYY')};
    createApplication(applicationData)
      .then(_ => {this.setState({errors:[],
                                    appLocation : 'success', 
                                    showSpinner:false});})
      .catch(error => {
        if(error.response){
          this.setState({errors:[{"title":`${error.response.status} error`, 
                                  "detail" : error.response.data.message}], 
                                  showSpinner:false})
        }
      })
  }
  
  goToLocation= (appState)=>{
    this.setState({appLocation:appState});
  }

  checkLocationForApp = (location)=>{
    this.setState({showSpinner:true});
    checkLocationForApp(location)
      .then(data => {this.setState({errors:[],
                                    location: data.data, 
                                    appLocation : 'form', 
                                    showSpinner:false});})
      .catch(error => {
              if(error.response){
                this.setState({errors:[{"title":`${error.response.status} error`, 
                                        "detail" : error.response.data.message}], 
                                        showSpinner:false})
              }
            });

  }
  render() {
    const { shouldRedirect, appLocation, errors } = this.state;

    if (shouldRedirect) {
      return <Redirect to={{pathname: '/'}} />
    }

    return (
      <section id="newContractor">
        <div className="bwm-form">
          <div className="row">
            <div className="offset-md-2 col-md-8">
              <div className="col-md-12">
                <h1 className="page-title">Create loan application</h1>
              </div>
              <div className="col-md-12">
                <ApiErrors errors={errors}/>
              </div>
              
              {(appLocation==='location') && <ContractorSearchInput checkLocationForApp={this.checkLocationForApp}/> }
              {(appLocation==='form') && <ContractorForm onSubmit={this.submitApplication} goToLocation={this.goToLocation}/> }
              {(appLocation==='success') && <SuccessMessage createNewApp={this.goToLocation} />}
              <FadeLoader
                css={override}
                size={40}
                color={"#212529"}
                loading={this.state.showSpinner}
              />
              
              {/* <div>
                <p>
                  Some Errors
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </section> 
    )
  }
}

export default NewApplication;