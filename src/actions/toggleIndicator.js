export const TOGGLE_INDICATOR = 'TOGGLE_INDICATOR';

export const toggleIndicator = (id) => {
    return {
        type: TOGGLE_INDICATOR,
        id
    };
};