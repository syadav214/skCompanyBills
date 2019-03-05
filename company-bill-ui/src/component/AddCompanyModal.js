import React, { Component } from 'react';
import {
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBBtn,
  MDBContainer,
  MDBInput,
  MDBModalFooter,
  ToastContainer,
  toast
} from 'mdbreact';

const url = process.env.REACT_APP_API;
const apiKey = process.env.REACT_APP_API_KEY;

class AddCompanyModal extends Component {
  saveCompany() {
    let validForm = true;
    const postBody = {
      project_ID: document.getElementById('txtProjectID').value.trim(),
      name: document.getElementById('txtCompanyName').value.trim(),
      city: document.getElementById('txtCity').value.trim(),
      country: document.getElementById('txtCountry').value.trim(),
      contactEmail: document.getElementById('txtEmailID').value.trim()
    };

    for (let singleProp in postBody) {
      if (postBody[singleProp] === '') {
        validForm = false;
        break;
      }
    }

    if (validForm) {
      fetch(url + '/company', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey
        },
        body: JSON.stringify(postBody)
      })
        .then(result => result.json())
        .then(data => {
          this.props.showAddCompanyModal('show');
        })
        .catch(err => {
          toast.error('Something went wrong.', {
            position: 'top-center'
          });
        });
    } else {
      toast.warn('Please enter value in all the fields.', {
        position: 'top-center'
      });
    }
  }

  render() {
    return (
      <div>
        <MDBModal
          isOpen={this.props.showAddComp}
          toggle={this.props.showAddCompanyModal}
          size="lg"
        >
          <MDBModalHeader toggle={this.props.showAddCompanyModal}>
            Add Company
          </MDBModalHeader>
          <MDBModalBody>
            <ToastContainer
              hideProgressBar={true}
              newestOnTop={true}
              autoClose={3000}
            />
            <MDBContainer>
              <div className="md-form">
                <MDBInput
                  label="Company Name"
                  type="text"
                  id="txtCompanyName"
                />
              </div>
              <div className="md-form">
                <MDBInput label="Project ID" type="text" id="txtProjectID" />
              </div>
              <div className="md-form">
                <MDBInput label="City" type="text" id="txtCity" />
              </div>
              <div className="md-form">
                <MDBInput label="Country" type="text" id="txtCountry" />
              </div>
              <div className="md-form">
                <MDBInput label="Email ID" type="email" id="txtEmailID" />
              </div>
            </MDBContainer>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={this.props.showAddCompanyModal}>
              Close
            </MDBBtn>
            <MDBBtn color="primary" onClick={this.saveCompany.bind(this)}>
              Save changes
            </MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </div>
    );
  }
}

export default AddCompanyModal;