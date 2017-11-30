import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TabList extends Component {
    static contextTypes = {
      selection: PropTypes.object,
    }
  
    static defaultProps = {
      className: '',
      vertical: false,
    }
  
    static propTypes = {
      children: PropTypes.node.isRequired,
      className: PropTypes.string,
      vertical: PropTypes.bool,
    }
  
    render() {
      const { children, vertical, className, ...props } = this.props;
      const verticalOrientation = (this.context.selection !== undefined) 
        ? this.context.selection.isVertical() 
        : vertical;
  
      return (
        <div
          {...props}
          role="tablist"
          aria-orientation={verticalOrientation ? 'vertical' : ''}
          className={`rwt__tablist ${className || ''}`}
        >
          {children}
        </div>
      );
    }
  }