import React, {Component} from 'react';
import PropTypes from "prop-types";
import ColorEditor from './ColorEditor';

class ColorArray extends Component {

    handleChangeColor = (index, color) => {
        let {colors} = this.props;
        colors[index] = color.color;

        this.props.onChange(colors);
    };

    addColor = () => {
        let {colors} = this.props;
        colors.push("#000000");
 
        this.props.onChange(colors);
    }

    removeColor = (index) => {
        let {colors} = this.props;
        //colors.splice(index, 1);

      //  this.props.onChange(colors);
    }

    render() {
        
        const {colors} = this.props;

        console.log("render " + colors);

        return (
           <div>
               {colors.map((color, i) => (
                   <div style={{display: 'inline-block'}}>
                    <ColorEditor
                        key={i}
                        value={color} 
                        onChangeColor={(color) => this.handleChangeColor(i, color)}
                    />
                    <i className="colorArray__removeColor" onClick={this.removeColor(i)} title="Remove color"></i>
                    </div>
               ))}
                <button className="green-button" style={{ width: '90%', margin: '.5rem 1.3rem'}} onClick={this.addColor}>+ Add</button>
           </div> 
        )
    }
}

ColorArray.propTypes = { 
    colors: PropTypes.array,
    onChange: PropTypes.func
}

ColorArray.defaultProps = { 
    colors: []
};

export default ColorArray;