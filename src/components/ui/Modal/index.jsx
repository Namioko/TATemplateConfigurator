import React, { Component } from 'react';
import CloseIcon from '../../../assets/img/icons/ic_close.svg';

export default class Modal extends Component {

  render() {
    if (this.props.isOpen === false) {
      return null
    }

    let modalStyle = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: '9999',
      background: '#fff',
      borderRadius: '.3rem',
      padding: '.3rem'
    }

    if (this.props.width && this.props.height) {
      modalStyle.width = this.props.width + 'px';
      modalStyle.height = this.props.height + 'px';
      modalStyle.marginLeft = '-' + (this.props.width / 2) + 'px';
      modalStyle.marginTop = '-' + (this.props.height / 2) + 'px';
      modalStyle.transform = null;
    }

    if (this.props.style) {
      for (let key in this.props.style) {
        modalStyle[key] = this.props.style[key];
      }
    }

    let backdropStyle = {
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: '0px',
      left: '0px',
      zIndex: '9998',
      background: 'rgba(0, 0, 0, 0.5)'
    }

    if (this.props.backdropStyle) {
      for (let key in this.props.backdropStyle) {
        backdropStyle[key] = this.props.backdropStyle[key]
      }
    }

    return (
      <div className={this.props.containerClassName}>
        <div className={this.props.className} style={modalStyle}>
          <h1 style={{marginRight: "50px", marginTop: "5px"}}>{this.props.title}</h1>
          <img src={CloseIcon} alt="Close" title="Close window" style={{position: 'absolute', top: '5px', right: '5px'}} onClick={(e) => this.close(e)} />
          {this.props.children}
        </div>
        {!this.props.noBackdrop && 
          (<div className={this.props.backdropClassName} style={backdropStyle} onClick={(e) => this.close(e)} />)}
      </div>
    )
  }

  close(e) {
    e.preventDefault()

    if (this.props.onClose) {
      this.props.onClose()
    }
  }
}