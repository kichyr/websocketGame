import React from 'react';
import walkSprite from './isaak_sprite.png';
import { connect } from 'react-redux'
import { HEAD_SPRITE_SIZE, HEAD_SPRITE_NUMBER, HEAD_SPRITE_COORD, HEAD_UPDATE_SPRITE_RATE } from '../../config/constants';
import handleMovement, { getNewPlayerPosition } from './movement'
import { store } from '../../config/store';

export function updatePlayerByGameLoop(new_time, old_time) {
    const player = store.getState().player;
    let new_player_position = getNewPlayerPosition(new_time - old_time);

    store.dispatch({
        type: 'MOVE_PLAYER',
        payload: {
            direction: player.direction,
            position: new_player_position,
            sprite: updatePlayerSprite(new_time),
        }
    });
}

function updatePlayerSprite(new_time) {
    const player = store.getState().player;
    if( player.direction != "" && new_time - player.sprite.last_sprite_update_time > 1 / HEAD_UPDATE_SPRITE_RATE * 1000 ) {
        console.log(HEAD_SPRITE_COORD + ", " + player.direction + ", " + new_time);
        return {
            last_sprite_update_time: new_time,
            X: player.sprite.X <= HEAD_SPRITE_COORD[player.direction][0] - (HEAD_SPRITE_SIZE + 17) ? HEAD_SPRITE_COORD[player.direction][0] : (player.sprite.X - HEAD_SPRITE_SIZE - 17),
            Y: HEAD_SPRITE_COORD[player.direction][1],
        }
    }
    return player.sprite;
}

function Player(props) {
    return (
        <div style={{
            position: 'absolute',
            backgroundSize: '1500px 1500px',
            top: props.position[1],
            left: props.position[0],
            backgroundImage: `url('${walkSprite}')`,
            backgroundPosition: `${props.sprite.X}px ${props.sprite.Y}px`,
            width: `${HEAD_SPRITE_SIZE}px`,
            height: `${HEAD_SPRITE_SIZE}px`,
        }}
        />
    )
}

function mapStateToProps(state) {
    return {
        ...state.player
    }
}

export default connect(mapStateToProps)(handleMovement(Player))

