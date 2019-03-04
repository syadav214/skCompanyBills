import React, { Component } from 'react';
import { MDBTable, MDBTableBody, MDBDataTable } from 'mdbreact';

const columnsRows = {
  columns: [
    {
      label: 'Payment Date',
      field: 'date',
      sort: 'asc',
      width: 150
    },
    {
      label: 'Company Name',
      field: 'name',
      sort: 'asc',
      width: 270
    },
    {
      label: 'Bill Number',
      field: 'billNumber',
      sort: 'asc',
      width: 200
    },
    {
      label: 'Amount',
      field: 'amount',
      sort: 'asc',
      width: 100
    }
  ],
  rows: []
};

class Bill extends Component {
  constructor() {
    super();
    this.state = {};
    this.getBills();
  }

  getBills() {
    const url = process.env.REACT_APP_API + '/bill/0/0/1';
    const apiKey = process.env.REACT_APP_API_KEY;

    fetch(url, {
      method: 'GET',
      headers: {
        'x-api-key': apiKey
      }
    })
      .then(result => result.json())
      .then(data => {
        if (data.success === true && data.body.length > 0) {
          data.body.map(el => {
            const objBill = {
              date: el.date,
              name: el.name,
              billNumber: el.billNumber,
              amount: el.amount
            };
            columnsRows.rows.push(objBill);
            return false;
          });
          this.setState({ data: columnsRows });
        }
      })
      .catch(err => console.log('getBills - error', err));
  }

  render() {
    const { data } = this.state;
    return (
      <div>
        <MDBTable>
          <MDBTableBody small="true">
            <tr>
              <td>
                <select id="month" className="custom-select">
                  <option value="0">All Months</option>
                  <option value="1">Jan</option>
                  <option value="2">Feb</option>
                  <option value="3">Mar</option>
                  <option value="4">Apr</option>
                  <option value="5">May</option>
                  <option value="6">Jun</option>
                  <option value="7">Jul</option>
                  <option value="8">Aug</option>
                  <option value="9">Sep</option>
                  <option value="10">Oct</option>
                  <option value="11">Nov</option>
                  <option value="12">Dec</option>
                </select>
              </td>
              <td>
                <select id="year" className="custom-select">
                  <option value="0">All Year</option>
                  <option value="1">Jan</option>
                  <option value="2">Feb</option>
                  <option value="3">Mar</option>
                  <option value="4">Apr</option>
                  <option value="5">May</option>
                  <option value="6">Jun</option>
                  <option value="7">Jul</option>
                  <option value="8">Aug</option>
                  <option value="9">Sep</option>
                  <option value="10">Oct</option>
                  <option value="11">Nov</option>
                  <option value="12">Dec</option>
                </select>
              </td>
              <td>
                <button type="button" className="btn btn-primary">
                  All
                </button>
              </td>
            </tr>
          </MDBTableBody>
        </MDBTable>

        <MDBDataTable striped bordered small data={data} />
      </div>
    );
  }
}
export default Bill;
