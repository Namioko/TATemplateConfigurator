import React, { Component } from 'react';
import PropTypes from 'prop-types';
 
export default class Tab extends Component {

    static contextTypes = {
      selection: PropTypes.object,
    }
  
    static defaultProps = {
      className: '',
      selected: false,
      focusable: false,
      onClick: undefined,
    }
  
    static propTypes = {
      tabFor: PropTypes.string.isRequired,
      children: PropTypes.node.isRequired,
      className: PropTypes.string,
      selected: PropTypes.bool,
      focusable: PropTypes.bool,
      onClick: PropTypes.func,
    }
  
    constructor(props, context) {
      super(props, context);
      this.update = this.update.bind(this);
      this.handleClick = this.handleClick.bind(this);
  
      if (this.context.selection) {
        context.selection.register(props.tabFor);
      }
    }
  
    componentDidMount() {
      if (this.context.selection) {
        this.context.selection.subscribe(this.update);
      }
    }
  
    componentWillUnmount() {
      if (this.context.selection) {
        this.context.selection.unsubscribe(this.update);
        this.context.selection.unregister(this.props.tabFor);
      }
    }
  
    update({ focus } = {}) {
      this.forceUpdate();
      if (focus && this.context.selection.isSelected(this.props.tabFor)) {
        this.tab.focus();
      }
    }
  
    handleClick(event) {
      if (this.context.selection) {
        this.context.selection.select(this.props.tabFor);
      }
  
      if (this.props.onClick) {
        this.props.onClick(event);
      }
    }
    
    render() {
      const { tabFor, children, className, selected, focusable, ...props } = this.props;
  
      const isSelected = (this.context.selection !== undefined)
        ? this.context.selection.isSelected(tabFor) 
        : selected;
  
      return (
        <button
          {...props}
          id={`${tabFor}-tab`}
          role="tab"
          aria-selected={isSelected}
          aria-controls={tabFor}
          onClick={this.handleClick}
          tabIndex={focusable || isSelected ? '0' : '-1'}
          className={`rwt__tab ${className || ''}`}
          ref={(e) => { this.tab = e; }}
        >
          {children}
        </button>
      );
    }
  }