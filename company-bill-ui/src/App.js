import React, { Component } from 'react';
import Bill from './component/Bill';

class App extends Component {
  render() {
    return (
      <div className="centerPage">
        <br />
        <div style={{ 'text-align': 'center' }}>
          <h1>{process.env.REACT_APP_TITLE}</h1>
          <br />
        </div>
        <Bill />
      </div>
    );
  }
}

export default App;
