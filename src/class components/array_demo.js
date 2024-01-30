import React, { Component } from "react";

class ArrayDemoComponent extends Component {
  constructor() {
    super();
    this.state = {
      arry: [2, 3, 5,8, 6, 8],
    };
  }

  sortArry = (direction) => {
    let temp = [...this.state.arry];
    switch (direction) {
      case "ASC":
        temp.sort((a,b) => a-b);
        this.setState({
          arry: temp
        })


        break;
      case "DESC":
        temp.sort((a,b) =>b-a);
        this.setState({
          arry: temp
        });
        break;

      


      default:break;
    }
  };

  render() {
    return (
      <div>
        <h1>Welcome to class component</h1>
        <hr />
        {this.state.arry.map((e, index) => 
          <div key={index}>{e}</div>
        )}
        <hr />
        <div>
          <button onClick={() => this.sortArry("ASC")}>Sort ASC</button>
          <button onClick={() => this.sortArry("DESC")}>Sort DESC</button>
          <button onClick={() => this.sortArry("DEF")}>Sort DEFAULT</button>

        </div>
      </div>
    );
  }
}

export default ArrayDemoComponent;
