import { store } from '../../config/store'
import { PLAYER_SPEED, HEAD_SPRITE_COORD } from '../../config/constants';

export default function handleMovement(player) {

    function dispatchMove(direction) {
        store.dispatch({
            type: 'MOVE_PLAYER',
            payload: {
                direction: direction,
                position: store.getState().player.position,
                sprite: !direction && store.getState().player.direction? {
                    last_sprite_update_time: -Infinity,
                    X: HEAD_SPRITE_COORD[store.getState().player.direction][0],
                    Y: HEAD_SPRITE_COORD[store.getState().player.direction][1],
                } : store.getState().player.sprite,
            }
        });
    }

    function handleKeyDown(e) {
        e.preventDefault()
        switch(e.keyCode) {
            // left
            case 37:
                return dispatchMove('WEST')
            case 38:
                return dispatchMove('NORTH')
            case 39:
                return dispatchMove('EAST')
            case 40:
                return dispatchMove('SOUTH')
            default:
                console.log(e.keyCode)

        }
    }

    function handleKeyUp(e) {
        e.preventDefault()
        if( [37, 38, 39, 40].includes(e.keyCode) ){
            return dispatchMove(''); // key was released
        }
    }

    window.addEventListener('keydown', (e) => {
        handleKeyDown(e)
    })

    window.addEventListener('keyup', (e) => {
        handleKeyUp(e)
    })
    return player
}

export function getNewPlayerPosition(time_step) {
    const oldPos = store.getState().player.position;
    switch(store.getState().player.direction) {
        case 'WEST':
            return [ oldPos[0]-PLAYER_SPEED * time_step / 50, oldPos[1] ]
        case 'EAST':
            return [ oldPos[0]+PLAYER_SPEED * time_step / 50, oldPos[1] ]
        case 'NORTH':
            return [ oldPos[0], oldPos[1]-PLAYER_SPEED * time_step / 50 ]
        case 'SOUTH':
            return [ oldPos[0], oldPos[1]+PLAYER_SPEED * time_step / 50 ]
        default:
            return [ oldPos[0], oldPos[1] ]
    }
}