import { store } from '../../config/store'
import { PLAYER_SPEED } from '../../config/constants';

export default function  handleMovement(player) {

    function getNewPosition(direction) {
        const oldPos =  store.getState().player.position
        switch(direction) {
            case 'WEST':
                return [ oldPos[0]-PLAYER_SPEED, oldPos[1] ]
            case 'EAST':
                return [ oldPos[0]+PLAYER_SPEED, oldPos[1] ]
            case 'NORTH':
                return [ oldPos[0], oldPos[1]-PLAYER_SPEED ]
            case 'SOUTH':
                return [ oldPos[0], oldPos[1]+PLAYER_SPEED ]
        }
    }

    function dispatchMove(direction) {
        store.dispatch({
            type: 'MOVE_PLAYER',
            payload: {
                position: getNewPosition(direction),
                sprite: {
                    X: -30,
                    Y: -10,
                }
            }
        })
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

    window.addEventListener('keydown', (e) => {
        handleKeyDown(e)
    })
    return player
}