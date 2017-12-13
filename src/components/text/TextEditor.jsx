import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import {buildConfig} from '../../utils/config';

@inject('questionStore', 'designStore', 'otherStore')
@observer
class TextEditor extends Component {

    constructor(props) {
        super(props);

        const {questions} = this.props.questionStore;
        const {design, customerLogo} = this.props.designStore;
        const {showOnlySelectedCategoryTagInHitlist, sentimentRange} = this.props.otherStore;

        const textConfig = buildConfig({
            questions: questions,
            design: design,
            otherParams: {
                customerLogo: customerLogo,
                url: showOnlySelectedCategoryTagInHitlist,
                sentimentRange: sentimentRange
            }});

        this.state = {
            text: textConfig
        };
    }

    handleTextChange = (e) => {
        this.setState({text: e.target.value});
    }

    render() {
        return (
            <textarea 
                style={{width: '100%', height: 'calc(100% - 4px)', marginTop: '4rem', border: 'none', resize: 'none'}} 
                value={this.state.text} 
                onChange={this.handleTextChange}
            />
        )
    }
}

export default TextEditor;