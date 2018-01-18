import {QuestionStore} from '../../stores/QuestionStore';
import {INVALID_ID_ERROR_MESSAGE, REQUIRED_ERROR_MESSAGE} from "../../constants/index";

test('add question to end', () => {
    const questionStore = new QuestionStore();
    const newQuestion = {
        TAFolderId: 'Folder'
    };

    questionStore.addQuestionToEnd(newQuestion);

    expect(questionStore.questions.length).toBe(1);
    expect(questionStore.questions[0]['TAFolderId']).toBe('Folder')
});

//TODO: Anna will do

test('add question to end with existing questions', () => {
    const questionStore = new QuestionStore();
    const {questions, addQuestionToEnd} = questionStore;

    questions.push({
        TAQuestionName: 'Name',
        TAModelNo: 1
    });
    const newQuestion = {
        TAQuestionName: 'Name',
        TAModelNo: 2
    };

    addQuestionToEnd(newQuestion);

    expect(questions.length).toBe(2);
    expect(questions[0]['TAQuestionName']).toBe('Name');
    expect(questions[0]['TAModelNo']).toBe(1);
    expect(questions[1]['TAQuestionName']).toBe('Name');
    expect(questions[1]['TAModelNo']).toBe(2);
});

test('add question to end with empty required field', () => {
    const questionStore = new QuestionStore();
    const {questions, errors, addQuestionToEnd} = questionStore;

    const newQuestion = {
        TAQuestionName: 'Name',
        TAModelNo: 1
    };

    addQuestionToEnd(newQuestion);

    expect(questions.length).toBe(1);
    expect(questions[0]['TAQuestionName']).toBe('Name');
    expect(questions[0]['TAModelNo']).toBe(1);

    expect(errors.length).toBe(1);
    for (let key in errors[0]) {
        if (key === 'TAFolderId' || key === 'DatasourceId' || key === 'DatabaseSchemaId'
            || key === 'DatabaseTableName' || key === 'TimeVariableId') {
            expect(errors[0][key]).toBe(REQUIRED_ERROR_MESSAGE);
        }
    }
});

test('add question to end with invalid id', () => {
    const questionStore = new QuestionStore();
    const {questions, errors, addQuestionToEnd} = questionStore;

    questions.push({
        TAQuestionName: 'Name',
        TAModelNo: 1
    });
    errors.push(new Map());
    const newQuestion = {
        TAQuestionName: 'Name',
        TAModelNo: 1
    };

    addQuestionToEnd(newQuestion);

    expect(questions.length).toBe(2);
    expect(questions[0]['TAQuestionName']).toBe('Name');
    expect(questions[0]['TAModelNo']).toBe(1);
    expect(questions[1]['TAQuestionName']).toBe('Name');
    expect(questions[1]['TAModelNo']).toBe(1);

    expect(errors.length).toBe(2);
    errors.forEach((error) => {
        for (let key in error) {
            if (key === 'TAQuestionName' || key === 'TAModelNo') {
                expect(error[key]).toBe(INVALID_ID_ERROR_MESSAGE);
            }
        }
    });
});