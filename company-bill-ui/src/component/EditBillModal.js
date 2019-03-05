import React, { Component } from 'react';
import {
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBBtn,
  MDBModalFooter
} from 'mdbreact';

class EditBillModal extends Component {
  render() {
    return (
      <MDBModal
        isOpen={this.props.showEditBill}
        toggle={this.props.showEditBillModal}
        size="lg"
      >
        <MDBModalHeader toggle={this.props.showEditBillModal}>
          Edit Bill
        </MDBModalHeader>
        <MDBModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={this.props.showEditBillModal}>
            Close
          </MDBBtn>
          <MDBBtn color="primary">Save changes</MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    );
  }
}

export default EditBillModal;
