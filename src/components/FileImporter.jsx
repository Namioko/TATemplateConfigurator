import React, { Component } from 'react';
import { isValidTextConfig } from '../utils/validation';
import { inject } from 'mobx-react';
import { parseTextConfig } from '../utils/text-parser';
import {DEFAULT_COLORS, DEFAULT_AREAS_PALETTE} from '../constants/design';
import Dropzone from 'react-dropzone';

@inject('questionStore', 'designStore', 'otherStore', 'componentStore')
class FileImporter extends Component {

    constructor(props) {
        super(props);

        this.state = {
            errorMessage: null,
            successMessage: null
        };
    }

    readTextFromFile = (files, callback) => {
        let reader = new FileReader();

        if (files && files[0]) {
            reader.onload = function (e) {
                callback(e.target.result);
            };
            reader.readAsText(files[0]);
        } else { //TODO: IE
            callback("");
        }
    };

    parseFile = (content) => {
        const { questionStore, designStore, otherStore, componentStore } = this.props;

        if (!isValidTextConfig(content)) {
            this.setState({errorMessage: "Invalid configuration!", successMessage: null});
            return;
        }

        const parsedConfig = parseTextConfig(content);

        otherStore.setShowOnlySelectedCategoryTagInHitlist(parsedConfig.ShowOnlySelectedCategoryTagInHitlist);
        otherStore.setSentimentRange(parsedConfig.SentimentRange);

        //Design
        designStore.setCustomerLogo(parsedConfig.CustomerLogo);
        for (let key in DEFAULT_COLORS) {
            designStore.setProperty(key, parsedConfig.Design[key]);
        }
        for(let key in DEFAULT_AREAS_PALETTE) {
            designStore.setAreaPalette(key, parsedConfig.Design['areasPalette'][key]);
        }
        designStore.setProperty('chartPalette', parsedConfig.Design['chartPalette']);

        //Questions
        questionStore.clearQuestions();
        for(let i = 0; i < parsedConfig.Questions.length; i++) {
            questionStore.addQuestionToEnd(parsedConfig.Questions[i]);
        }

        if(parsedConfig.Questions.length > 0) {
            componentStore.changeCurrentQuestion(0);
        } else {
            componentStore.resetCurrentQuestion();
        }

        this.setState({successMessage: "Yeeeeah! It's true!", errorMessage: null});
    };

    onDrop = (files) => {
        this.readTextFromFile(files, this.parseFile)
    }

    render() {

        const isActive = window.File && window.FileReader && window.FileList && window.Blob;
        const {errorMessage, successMessage} = this.state;
        //TODO: styling
        return (
            <div>
                <Dropzone
                    onDrop={this.onDrop} 
                    disabled={!isActive} 
                    style={{width: "500px", height: "150px", borderWidth: "3px", borderColor: "#ecebe9", borderStyle: "dashed", borderRadius: "5px"}}>
                    {isActive ? (
                        <p style={{ width: "100%", height: "100%", verticalAlign: "middle", display: "table-cell", color: "#ecebe9"}}>Try dropping your configuration file here, or click to select file to upload.</p>
                    ) : (
                        <p>Not supported</p>
                    )}
                </Dropzone>
                {errorMessage && (
                    <p style={{color: "#ff0000"}}>{errorMessage}</p>
                )}
                {successMessage && (
                    <p style={{color: "#00ff00"}}>{successMessage}</p>
                )}
            </div>
        )
    }
}

export default FileImporter;