import React, {PureComponent} from "react";
import PropTypes from "prop-types";


class InputNumber extends PureComponent {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();

    this._changeValueClickHandler = this._changeValueClickHandler.bind(this);
    this._wheelInputHandler = this._wheelInputHandler.bind(this);
    this._addButtonClickHandler = this._addButtonClickHandler.bind(this);
    this._subButtonClickHandler = this._subButtonClickHandler.bind(this);
    this._changeValue = this._changeValue.bind(this);

    this.state = {
      value: this.props.defaultValue,
    };
  }

  _changeValueClickHandler(evt) {
    const {minValue, maxValue} = this.props;
    let newValue = Number.parseInt(evt.target.value, 10);
    const regexp = new RegExp(`^[ 0-9]+$`);

    if (regexp.test(newValue)) {
      newValue = (newValue >= maxValue) ? maxValue : newValue;
      newValue = (newValue <= minValue) ? minValue : newValue;
      this._changeValue(newValue);
    } else {
      this.inputRef.current.value = this.state.value;
    }
  }

  _wheelInputHandler(evt) {
    const {minValue, maxValue} = this.props;
    let newValue = this.state.value;

    if (evt.deltaY > 0) {
      newValue = (newValue >= maxValue) ? maxValue : newValue + 1;
    } else if (evt.deltaY < 0) {
      newValue = (newValue <= minValue) ? minValue : newValue - 1;
    }

    this._changeValue(newValue);
  }

  _addButtonClickHandler() {
    const {maxValue} = this.props;
    const currentValue = this.state.value;

    const newValue = (currentValue >= maxValue) ? maxValue : currentValue + 1;

    this._changeValue(newValue);
  }

  _subButtonClickHandler() {
    const {minValue} = this.props;
    const currentValue = this.state.value;

    const newValue = (currentValue <= minValue) ? minValue : currentValue - 1;

    this._changeValue(newValue);
  }

  _changeValue(value) {
    const {onChangeValue} = this.props;

    onChangeValue(value);
    this.inputRef.current.value = value;

    this.setState({
      value,
    });
  }

  render() {
    const {minValue, maxValue} = this.props;

    return (
      <div>
        <button
          onClick = {this._subButtonClickHandler}
        >-</button>
        <input
          type = "text"
          ref = {this.inputRef}
          defaultValue = {this.state.value}
          id = {1}
          min = {minValue}
          max = {maxValue}
          onChange = {this._changeValueClickHandler}
          onWheel = {this._wheelInputHandler}
        />
        <button
          onClick = {this._addButtonClickHandler}
        >+</button>
      </div>
    );
  }
}


InputNumber.propTypes = {
  defaultValue: PropTypes.number.isRequired,
  minValue: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired,
  onChangeValue: PropTypes.func.isRequired,
};


export default InputNumber;
