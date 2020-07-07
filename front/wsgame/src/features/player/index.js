import React from 'react';
import walkSprite from './isaak_sprite.png';
import { connect } from 'react-redux'
import { HEAD_SPRITE_SIZE } from '../../config/constants';
import handleMovement from './movement'

function Player(props) {
    return (
        <div style={{
            position: 'absolute',
            backgroundSize: '1500px 1500px',
            top: props.position[1],
            left: props.position[0],
            backgroundImage: `url('${walkSprite}')`,
            backgroundPosition: `${props.sprite.Y}px ${props.sprite.X}px`,
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

