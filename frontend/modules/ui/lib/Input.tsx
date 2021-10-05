import { Component } from 'react';
import { ChangeEventHandler, FormEventHandler } from 'react';
interface IInputProps {
  id: string;
  onSubmit: Function;
  placeholder: string;
}

export class Input extends Component<IInputProps, { value: string }> {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    if (
      !this.state.value ||
      !this.state.value.trim() ||
      !this.state.value.replace(/[\u200B-\u200D\uFEFF]/g, '')
    ) return event.preventDefault();
      this.props.onSubmit(this.state.value);
    this.setState({ value: '' });
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="inputWrapper">
          <input
            className="input-default"
            type="text"
            value={this.state.value}
            maxLength={100}
            placeholder={this.props.placeholder}
            onChange={this.handleChange}
            id={this.props.id}
            autoComplete="off"
          />
        </div>
      </form>
    );
  }
}
