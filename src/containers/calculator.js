import { Component } from 'react';
import { Button } from '../components/Button.js';
import Display from '../components/Display.js';

class Calculator extends Component {
  initialState = {
    firstValue: 0,
    secondValue: 0,
    operator: 1,
    isSume: false,
  };

  constructor(props) {
    super(props);
    this.state = this.initialState;
  }
  putValue = (value) => {
    const { firstValue, secondValue, operator } = this.state;
    const lastValue = operator === 1 ? firstValue : secondValue;

    switch (operator) {
      //prettier-ignore
      case 1: this.setState({firstValue: (lastValue * 10) + value });
      break;
      //prettier-ignore
      case 2: this.setState({ secondValue: (lastValue * 10) + value });
      break;
      default:
        return this.initialState;
        break;
    }
  };
  getValue = () => {
    const { firstValue, secondValue, isSum, operator } = this.state;

    switch (operator) {
      case 1:
        return firstValue;
        break;
      case 2:
        return secondValue;
        break;
      case 3:
        return isSum ? firstValue + secondValue : firstValue - secondValue;
      default:
        return this.initialState;
        break;
    }
  };
  pickOperation = (isSum) => {
    this.setState({ operator: 2, isSum });
  };
  execOperation = () => {
    this.setState({ operator: 3 });
  };
  clear = () => {
    this.setState(this.initialState);
  };
  render() {
    const calcNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    const { operator } = this.state;
    return (
      <div className={'calculator'}>
        <div>
          <Display value={this.getValue()} />
        </div>
        <div className={'buttonsConteiner'}>
          <div className='numbers'>
            {calcNumbers.map((num) => (
              <Button
                key={String(num)}
                display={num}
                onClick={() => this.putValue(num)}
                disabled={operator === 3}
              />
            ))}
          </div>
          <div className='operators'>
            <Button
              display={'+'}
              onClick={() => this.pickOperation(true)}
              disabled={operator !== 1}
              isOperator
            />
            <Button
              display={'-'}
              onClick={() => this.pickOperation(false)}
              disabled={operator !== 1}
              isOperator
            />
            <Button
              display={'='}
              onClick={() => this.execOperation()}
              disabled={operator === 1 || operator === 3}
              isOperator
            />
            <Button display={'C'} onClick={() => this.clear()} isOperator />
          </div>
        </div>
      </div>
    );
  }
}

export default Calculator;
