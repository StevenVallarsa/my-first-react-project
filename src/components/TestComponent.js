import React from "react";

export default class TestComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  handleClick(amt) {
    this.setState((prev) => ({ count: prev.count + amt }));
  }

  pretty() {
    return {
      fontSize: 24,
      color: "red",
      fontWeight: "bold",
      padding: "10px 0px 0px 10px",
      border: "1px solid red",
    };
  }
  render() {
    const classy = this.pretty();
    return (
      <div style={classy}>
        <button
          onClick={() => this.handleClick(-1)}
          style={{ marginRight: 10 }}
        >
          -{" "}
        </button>
        {this.state.count}
        <button onClick={() => this.handleClick(1)} style={{ marginLeft: 10 }}>
          {" "}
          +
        </button>
      </div>
    );
  }
}
