import React, { Component } from 'react';
import { MDBDataTable } from 'mdbreact';

const url = process.env.REACT_APP_API;
const apiKey = process.env.REACT_APP_API_KEY;

class Bill extends Component {
  constructor() {
    super();
    this.state = { billData: {}, yearsHtml: [] };
  }

  componentWillMount() {
    this.getYear();
    this.getBills();
  }

  getYear() {
    fetch(url + '/year', {
      method: 'GET',
      headers: {
        'x-api-key': apiKey
      }
    })
      .then(result => result.json())
      .then(data => {
        if (data.success === true && data.body.length > 0) {
          const { minYear, maxYear } = data.body[0];
          const yearsData = [];
          yearsData.push(
            <option value="0" key={0}>
              All Years
            </option>
          );
          for (let yearCnt = minYear; yearCnt <= maxYear; yearCnt++) {
            yearsData.push(
              <option value={yearCnt} key={yearCnt}>
                {yearCnt}
              </option>
            );
          }
          this.setState({ yearsHtml: yearsData });
        }
      })
      .catch(err => console.log('getYear - error', err));
  }

  getBills(e) {
    let month = 0,
      year = 0,
      all = 0;

    if (e) {
      if (e.target.id === 'btnAll') {
        all = 1;
        if (document.getElementById('month')) {
          document.getElementById('month').value = '0';
        }
        if (document.getElementById('year')) {
          document.getElementById('year').value = '0';
        }
      } else {
        if (document.getElementById('month')) {
          month = document.getElementById('month').value;
        }
        if (document.getElementById('year')) {
          year = document.getElementById('year').value;
        }
      }
    }

    const columnsRows = {
      columns: [
        {
          label: 'Payment Date',
          field: 'date',
          sort: 'asc',
          width: 100
        },
        {
          label: 'Company Name',
          field: 'name',
          sort: 'asc',
          width: 200
        },
        {
          label: 'Bill Number',
          field: 'billNumber',
          sort: 'asc',
          width: 100
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

    fetch(url + `/bill/${month}/${year}/${all}`, {
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
          this.setState({ billData: columnsRows });
        } else {
          this.setState({ billData: {} });
        }
      })
      .catch(err => console.log('getBills - error', err));
  }

  render() {
    const { billData, yearsHtml } = this.state;
    return (
      <div className="container">
        <div class="row">
          <div class="col text-left">
            <button
              id="btnAddCompany"
              type="button"
              className="btn btn-secondary"
              onClick={this.getBills.bind(this)}
            >
              Add Company
            </button>
            &nbsp;
            <button
              id="btnAddBill"
              type="button"
              className="btn btn-secondary"
              onClick={this.getBills.bind(this)}
            >
              Add Bill
            </button>
          </div>
          <div class="col text-right">
            <select
              id="month"
              className="custom-select"
              onChange={this.getBills.bind(this)}
            >
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
            &nbsp;
            <select
              id="year"
              className="custom-select"
              onChange={this.getBills.bind(this)}
            >
              {yearsHtml}
            </select>
            <button
              id="btnAll"
              type="button"
              className="btn btn-primary"
              onClick={this.getBills.bind(this)}
            >
              All
            </button>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <MDBDataTable striped bordered small data={billData} />
          </div>
        </div>
      </div>
    );
  }
}
export default Bill;
