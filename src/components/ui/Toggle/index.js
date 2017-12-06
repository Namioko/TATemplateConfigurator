import React, { PureComponent } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Cross, Check } from './icons';
import '../../../assets/css/toggle.css';

export default class Toggle extends PureComponent {
  constructor (props) {
    super(props)

    this.previouslyChecked = !!(props.checked || props.defaultChecked)
    this.state = {
      checked: !!(props.checked || props.defaultChecked),
      hasFocus: false,
    }
  }

  componentWillReceiveProps (nextProps) {
    if ('checked' in nextProps) {
      this.setState({checked: !!nextProps.checked})
    }
  }

  handleClick = (event) => {
    const checkbox = this.input
    if (event.target !== checkbox && !this.moved) {
      this.previouslyChecked = checkbox.checked
      event.preventDefault()
      checkbox.focus()
      checkbox.click()
      return
    }

    const checked = this.props.hasOwnProperty('checked') ? this.props.checked : checkbox.checked

    this.setState({checked})
  }

  handleFocus = (event) => {
    const { onFocus } = this.props

    if (onFocus) {
      onFocus(event)
    }

    this.setState({ hasFocus: true })
  }

  handleBlur = (event) => {
    const { onBlur } = this.props

    if (onBlur) {
      onBlur(event)
    }

    this.setState({ hasFocus: false })
  }

  getIcon (type) {
    const { icons } = this.props
    if (!icons) {
      return null
    }
    return icons[type] === undefined
      ? Toggle.defaultProps.icons[type]
      : icons[type]
  }

  render () {
    const { className, icons: _icons, ...inputProps } = this.props
    const classes = classNames('react-toggle', {
      'react-toggle--checked': this.state.checked,
      'react-toggle--focus': this.state.hasFocus,
      'react-toggle--disabled': this.props.disabled,
    }, className)

    return (
      <div className={classes}
        onClick={this.handleClick}>
        <div className='react-toggle-track'>
          <div className='react-toggle-track-check'>
            {this.getIcon('checked')}
          </div>
          <div className='react-toggle-track-x'>
            {this.getIcon('unchecked')}
          </div>
        </div>
        <div className='react-toggle-thumb' />

        <input
          {...inputProps}
          ref={ref => { this.input = ref }}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          className='react-toggle-screenreader-only'
          type='checkbox' />
      </div>
    )
  }
}

Toggle.defaultProps = {
  icons: {
    checked: <Check />,
    unchecked: <Cross />,
  },
}

Toggle.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  className: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  id: PropTypes.string,
  'aria-labelledby': PropTypes.string,
  'aria-label': PropTypes.string,
  icons: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      checked: PropTypes.node,
      unchecked: PropTypes.node,
    }),
  ]),
}