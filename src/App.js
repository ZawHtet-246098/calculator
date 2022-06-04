import React from "react";
import "./scss/main.scss";

const nums = ["Del", 7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
const ops = ["/", "*", "-", "+"];
const ids = {
  Del: "delete",
  7: "seven",
  8: "eight",
  9: "nine",
  4: "four",
  5: "five",
  6: "six",
  1: "one",
  2: "two",
  3: "three",
  0: "zero",
  "/": "divide",
  "*": "multiply",
  "-": "subtract",
  "+": "add",
};

class App extends React.Component {
  state = {
    lastPressed: undefined,
    currentNumber: "0",
    calc: undefined,
    operation: undefined,
    equation: undefined,
  };

  handleClick = (e) => {
    const { calc, currentNumber, lastPressed, equation } = this.state;
    const { innerText } = e.target;

    console.log(innerText);

    switch (innerText) {
      case "AC": {
        this.setState({
          currentNumber: "0",
          calc: undefined,
          equation: undefined,
        });
        break;
      }
      case "=": {
        const evaluated = eval(calc);
        this.setState({
          currentNumber: evaluated,
          calc: evaluated,
          equation: `${calc} = ${evaluated}`,
        });
        break;
      }
      case ".": {
        const splitted = calc.split(/[\+\-\*\/]/);
        const last = splitted.slice(-1)[0];
        console.log(splitted, last);
        if (!last.includes(".")) {
          this.setState({
            currentNumber: currentNumber + ".",
            calc: calc + ".",
          });
        }
        break;
      }
      default: {
        let e = undefined;
        if (ops.includes(innerText)) {
          if (ops.includes(lastPressed) && innerText !== "-") {
            const lastNumberInd = calc
              .split("")
              .reverse()
              .findIndex((char) => char !== " " && nums.includes(+char));
            e = calc.slice(0, calc.length - lastNumberInd) + ` ${innerText} `;
          } else {
            e = `${calc} ${innerText} `;
          }
        } else if (innerText === "Del") {
          const lastNumberInd = currentNumber.split("");
          e =
            lastNumberInd[lastNumberInd.length - 1] === " "
              ? currentNumber.slice(0, currentNumber.length - 2)
              : currentNumber.slice(0, currentNumber.length - 1);

          // console.log(lastNumberInd[lastNumberInd.length - 1]);
        } else {
          e = currentNumber === "0" ? innerText : currentNumber + innerText;
        }
        this.setState({
          currentNumber: e,
          calc: e,
          equation: e,
        });
      }
    }
    this.setState({
      lastPressed: innerText,
    });
  };
  render() {
    const { currentNumber, calc, lastPressed, equation } = this.state;
    return (
      <div>
        <div className="claculator">
          <p
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            {JSON.stringify(this.state)}
          </p>
          <div className="display-parent">
            <div id="display" className="display">
              {currentNumber}
            </div>
            <small>
              {/* {calc} */}
              {equation}
            </small>
          </div>
          <div className="nums-container">
            <button
              id="clear"
              className="light-grey ac big-h"
              onClick={this.handleClick}
            >
              AC
            </button>
            {nums.map((num) => (
              <button
                className={`dark-grey ${num === 0 && "big-h"}  `}
                key={num}
                onClick={this.handleClick}
                id={ids[num]}
              >
                {num}
              </button>
            ))}
            <button
              id="decimal"
              className="dark-grey "
              onClick={this.handleClick}
            >
              .
            </button>
          </div>
          <div className="ops-container">
            {ops.map((op) => (
              <button
                className="orange"
                key={op}
                onClick={this.handleClick}
                id={ids[op]}
              >
                {op}
              </button>
            ))}
            <button className="orange" onClick={this.handleClick} id="equals">
              =
            </button>
          </div>
        </div>
        <div className="footer h5 text-center pt-5">
          Designed and Coded By <span className="d-block">Zaw Htet</span>
        </div>
      </div>
    );
  }
}

export default App;
