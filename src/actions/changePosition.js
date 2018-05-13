export const CHANGE_POSITION = 'CHANGE_POSITION';

export const changePosition = (draggedId, hoveredId) => {
    return {
        type: CHANGE_POSITION,
        draggedId,
        hoveredId
    };
};