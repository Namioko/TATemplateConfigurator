import {QuestionStore} from '../../stores/QuestionStore';

test('adding question to end', () => {
    const questionStore = new QuestionStore();
    const newQuestion = {
        TAFolderId: "Folder"
    };

    questionStore.addQuestionToEnd(newQuestion);

    expect(questionStore.questions.length).toBe(1);
    expect(questionStore.questions[0]['TAFolderId']).toBe('Folder');
});

//TODO: Anna will do