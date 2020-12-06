import { Component } from 'react';
import { Button } from '../components/Button.js';
import Display from '../components/Display.js';

class Calculator extends Component {
  initialState = {
    firstValue: 0,
    secondValue: 0,
    operator: 1,
    isAnOperator: '',
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
    const { firstValue, secondValue, isAnOperator, operator } = this.state;

    switch (operator) {
      case 1:
        return firstValue;
        break;
      case 2:
        return isAnOperator !== 'potenciation' ? secondValue : firstValue ** 2;
        break;
      case 3:
        return this.getOperation(isAnOperator, firstValue, secondValue);

      default:
        return this.initialState;
        break;
    }
  };
  getOperation = (isAnOperator, firstValue, secondValue) => {
    switch (isAnOperator) {
      case 'sum':
        return firstValue + secondValue;
        break;
      case 'minus':
        return firstValue - secondValue;
        break;
      case 'multiple':
        return firstValue * secondValue;
        break;
      case 'division':
        return secondValue !== 0
          ? firstValue / secondValue
          : 'Operação não possível';
        break;
      default:
        return 'calculo não encontrado';
        break;
    }
  };
  pickOperation = (isAnOperator) => {
    this.setState({ operator: 2, isAnOperator });
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
    const operations = [
      { type: 'sum', simbol: '+' },
      { type: 'minus', simbol: '-' },
      { type: 'multiple', simbol: '*' },
      { type: 'division', simbol: '/' },
      { type: 'potenciation', simbol: 'num²' },
    ];
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
            {operations.map((operation) => {
              const { type, simbol } = operation;
              return (
                <Button
                  key={type}
                  display={simbol}
                  onClick={() => this.pickOperation(type)}
                  disabled={
                    type !== 'potenciation' ? operator !== 1 : operator >= 2
                  }
                  isOperator
                />
              );
            })}
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
