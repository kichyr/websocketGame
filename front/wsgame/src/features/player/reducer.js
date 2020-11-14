import { HEAD_SPRITE_COORD } from '../../config/constants';

const initialState = {
    direction: "",
    position: [0, 0],
    sprite: {
        last_sprite_update_time: -Infinity,
        X: HEAD_SPRITE_COORD['SOUTH'][0],
        Y: HEAD_SPRITE_COORD['SOUTH'][1],
    }
}

export const playerReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'MOVE_PLAYER':
            return {
                ...action.payload
            }
        default:
            return state
    }
};