import React from 'react'
import Player from '../player/index';
import Map from '../map/index'


function World(props) {
    return (
        <div
            style={{
                position: "relative",
                width: '800px',
                height: '400px',
                margin: '20px auto',
            }}>
            <Map />
            <Player />
        </div>
    )
}

export default World