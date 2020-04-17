import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from "react-datepicker";
import * as moment from "moment";
import 'react-datepicker/dist/react-datepicker.min.css';

const contractorOptions = ['Salary', 'Self-Employed', 'Rental Income'];

const ContractorForm = ({onSubmit, goToLocation}) => {

  const { register, handleSubmit, control, errors} = useForm();
  const goBack = () => {
    goToLocation('location')
  }
  return (
    <div className="col-md-12">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group row">
          <div className="col-md-6">
            <label htmlFor="firstName">First Name</label>
            <input 
              ref={register({ required: 'Please enter first name.', 
                              maxLength: { value:60, message:"Please enter less then 60 character."}})}
              name="first_name"
              type="text"
              className="form-control"
              id="firstName"/>
              {errors.first_name && <span className="error">{errors.first_name.message}</span>}
          </div>
      
          <div className="col-md-6">
          <label htmlFor="lastName">Last Name</label>
          <input 
            ref={register({ required: 'Please enter last name.', maxLength: { value:60, message:"Please enter less then 60 character."} })}
            name="last_name"
            type="text"
            className="form-control"
            id="lastName"/>
          {errors.last_name && <span className="error">{errors.last_name.message}</span>}
        </div>
        </div>
        <div className="form-group row">
          <div className="col-md-6">
            <label>Date of Birth</label>
            <div className="form-control">
              <Controller
                  as={<DatePicker showYearDropdown  maxDate={new Date(moment().subtract(18, 'years'))}/>}
                  control={control}
                  valueName="selected" // DateSelect value's name is selected
                  onChange={([selected]) => selected}
                  name="date_of_birth"
                  placeholderText="Select date"
                />
            </div>
          </div>
          <div className="col-md-6">
            <label htmlFor="ssn">SSN:</label>
            <input 
              ref={register({ required: 'Please enter SSN.', 
                      maxLength: { value:20, message:"Please enter less then 20 character."} })}
              name="ssn"
              type="text"
              className="form-control"
              id="ssn"/>
            {errors.ssn && <span className="error">{errors.ssn.message}</span>}
          </div>
        </div>
        <div className="form-group row">
          <div className="col-md-6">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              id="email"
              className="form-control"
              ref={register({
                required: 'Required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Please enter valid email address."
                }
              })}
            />
            {errors.email && <span className="error">{errors.email.message}</span>}

          </div>
          <div className="col-md-6">
            <label htmlFor="phone">Phone</label>
            <input 
              ref={register({ required: 'Please enter phone number.', 
              maxLength: { value:20, message:"Please enter less then 20 character."}  })}
              name="phone"
              type="number"
              className="form-control"
              id="phone"/>
            {errors.phone && <span className="error">{errors.phone.message}</span>}
          </div>
        </div>
        <div className="form-group row">
          <div className="col-md-6">
            <label htmlFor="income">Income</label>
            <input 
              ref={register({ required: 'Please enter income.', 
              maxLength: { value:20, message:"Please enter less then 20 character."} 
                              })}
              name="income"
              type="number"
              className="form-control"
              id="income"/>
            {errors.income && <span className="error">{errors.income.message}</span>}
          </div>
          <div className="col-md-6">
            <label htmlFor="catincome_typeegory">Income Type</label>
            <select 
              ref={register({ required: true})}
              name="income_type"
              className="form-control"
              id="income_type">
              {
                contractorOptions.map(option => 
                  <option key={option}>{option}</option> 
                )
              }
            </select>

          </div>
        </div>
        
        
        <div className="form-group row">
          <div className="col-md-6">
            <label htmlFor="requested_loan_amount">Requested Loan Amount</label>
            <input 
              ref={register({ required: 'Please enter requested loan amount.' , maxLength: { value:20, message:"Please enter less then 20 character."}  })}
              name="requested_loan_amount"
              type="number"
              className="form-control"
              id="requested_loan_amount"/>
            {errors.requested_loan_amount && <span className="error">{errors.requested_loan_amount.message }</span>}
          </div>
        </div>
        <button 
          type="submit"
          className="btn btn-bwm-main">Create
        </button>
        <button 
          onClick={goBack}
          className="btn btn-bwm-main ml-2">Go Back
        </button>
      </form>
  
    </div>
    )
}

export default ContractorForm;