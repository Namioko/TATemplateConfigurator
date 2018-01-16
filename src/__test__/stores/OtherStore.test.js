import {OtherStore} from '../../stores/OtherStore';
import {arrayСomparison} from '../test-utils';

test('set ShowOnlySelectedCategoryTagInHitlist', () => {
    const otherStore = new OtherStore();
    otherStore.setShowOnlySelectedCategoryTagInHitlist(false);

    expect(otherStore.showOnlySelectedCategoryTagInHitlist).toBe(false);

    otherStore.setShowOnlySelectedCategoryTagInHitlist(true);

    expect(otherStore.showOnlySelectedCategoryTagInHitlist).toBe(true);
});

test('set sentiment range', () => {
    const otherStore = new OtherStore();
    const expected = {
        Positive: [7, 10, 11],
        Neutral: [5, 6],
        Negative: [1, 2, 3, 4]
    };

    otherStore.setSentimentRange(expected);

    arrayСomparison(otherStore.sentimentRange.Positive, expected.Positive);
    arrayСomparison(otherStore.sentimentRange.Neutral, expected.Neutral);
    arrayСomparison(otherStore.sentimentRange.Negative, expected.Negative);
});