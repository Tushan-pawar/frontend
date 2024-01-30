import React, { Component } from 'react';

class InputDemoComponent extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      city: '',
      age: ''
    };
  }

  process = () => {
    console.log(this.state.name);
    console.log(this.state.city);
    console.log(this.state.age);
  };

  render() {
    return (
      <div>
        <h1>Please enter details</h1>

        <label>Enter name</label>
        <input
          type="text"
          onChange={(e) => this.setState({ name: e.target.value })}/>
        <br />
        <br />

        <label>Enter Age</label>
        <input
          type="text"
          onChange={(e) => this.setState({ age: e.target.value })}/>
        <br />
        <br />

        <label>Enter City</label>
        <input
          type="text"
          onChange={(e) => this.setState({ city: e.target.value })}/>
        <br />
        <br />

        <input type="submit" value="submit info" onClick={this.process} />
      </div>
    );
  }
}

export default InputDemoComponent;
