import React, { useEffect } from 'react';
import { store } from '../../config/store'
import Player from '../player/index';
import Map from '../map/index'
import player from '../player/index';
import { updatePlayerByGameLoop } from '../player/index.js';

let secondsPassed = 0;

function update(new_time, old_time) {
    updatePlayerByGameLoop(new_time, old_time);
}


function gameLoop(old_time){
    // Calculate how much time has passed
    const new_time = new Date().getTime()

    // Pass the time to the update
    update(new_time, old_time);
    window.requestAnimationFrame(() => {gameLoop(new_time)});
}
window.requestAnimationFrame(() => {gameLoop(-Infinity)});

function World(props) {
    useEffect(() => {
    });
    return (
        <div
            style={{
                position: "relative",
                width: '800px',
                height: '800px',
                margin: '20px auto',
            }}>
            <Map />
            <Player />
        </div>
    )
}

export default World