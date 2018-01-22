import React, { Component } from 'react';
import { isValidTextConfig } from '../utils/validation';
import { inject } from 'mobx-react';
import { parseTextConfig } from '../utils/text-parser';

@inject('questionStore', 'designStore', 'otherStore', 'componentStore')
class FileImporter extends Component {

    readTextFromFile = (filePath, callback) => {
        let reader = new FileReader();

        if (filePath.files && filePath.files[0]) {
            reader.onload = function (e) {
                callback(e.target.result);
            };
            reader.readAsText(filePath.files[0]);
        } else { //TODO: IE
            callback("");
        }
    };

    parseFile = (content) => {
        const { questionStore, designStore, otherStore, componentStore } = this.props;

        if (!isValidTextConfig(content)) {
            console.log("Invalid!!!");
            return;
        }

        const parsedConfig = parseTextConfig(content);

        console.log(parsedConfig);
    };

    openFile = () => {
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            document.getElementById('file-input').click();
        } else {
            alert("Not supported");
        }
    };

    render() {
        return (
            <div>
                <h1>Import file</h1>
                <button onClick={() => this.openFile()}>Select file</button>
                <input id="file-input" type="file" style={{ display: "none" }} onChange={(e) => this.readTextFromFile(e.target, this.parseFile)} />
            </div>
        )
    }
}

export default FileImporter;