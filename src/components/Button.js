import React, { Component } from 'react';

export class Button extends Component {
  cssButtonClass = this.props.disabled ? 'button disabled' : 'button';

  handleClick() {
    const { disabled, onClick } = this.props;

    if (onClick && !disabled) this.props.onClick();
  }

  render() {
    const cssButtonClassses = () => {
      const cssClassOperator = 'operator';
      const cssClassDisabled = 'disabled';
      return this.props.isOperator && this.props.disabled
        ? `button ${cssClassDisabled}`
        : this.props.isOperator
        ? `button ${cssClassOperator}`
        : this.props.disabled
        ? `button disabled`
        : 'button';
    };
    return (
      <div
        className={cssButtonClassses()}
        onClick={this.handleClick.bind(this)}>
        {this.props.display}
      </div>
    );
  }
}
