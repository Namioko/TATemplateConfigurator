import {DesignStore} from '../../stores/DesignStore';

test('change customer logo', () => {
    const designStore = new DesignStore();
    designStore.setCustomerLogo("new-logo");

    expect(designStore.customerLogo).toBe('new-logo');
});

test('change design property', () => {
    const designStore = new DesignStore();
    designStore.setProperty('positiveColor', '#123456');

    expect(designStore.design['positiveColor']).toBe('#123456');
});

test('change area pallete color', () => {
    const designStore = new DesignStore();
    designStore.setAreaPalette('Priority Issues', "#123456");

    expect(designStore.design['areasPalette']['Priority Issues']).toBe('#123456');
});