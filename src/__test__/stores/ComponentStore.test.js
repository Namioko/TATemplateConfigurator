import {ComponentStore} from '../../stores/ComponentStore';

test('set target window', () => {
    const componentStore = new ComponentStore();
    componentStore.setTargetWindow(10);

    expect(componentStore.targetWindow).toBe(10);
});

test('set current tab', () => {
    const componentStore = new ComponentStore();
    componentStore.setCurrentTab('test-tab');

    expect(componentStore.currentTab).toBe('test-tab');
});

test('change current question', () => {
    const componentStore = new ComponentStore();
    componentStore.changeCurrentQuestion(17);

    expect(componentStore.currentQuestionIndex).toBe(17);

    componentStore.changeCurrentQuestion(-1);
    expect(componentStore.currentQuestionIndex).toBe(0);
});

test('reset current question', () => {
    const componentStore = new ComponentStore();
    componentStore.changeCurrentQuestion(17);
    componentStore.resetCurrentQuestion();

    expect(componentStore.currentQuestionIndex).toBe(-1);
});