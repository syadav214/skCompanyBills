import React, { Component } from 'react';
import {
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBBtn,
  MDBModalFooter
} from 'mdbreact';

class AddBillModal extends Component {
  render() {
    return (
      <MDBModal
        isOpen={this.props.showAddBill}
        toggle={this.props.showAddBillModal}
        size="lg"
      >
        <MDBModalHeader toggle={this.props.showAddBillModal}>
          Add Bill
        </MDBModalHeader>
        <MDBModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={this.props.showAddBillModal}>
            Close
          </MDBBtn>
          <MDBBtn color="primary">Save changes</MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    );
  }
}

export default AddBillModal;
