import React from 'react'
import Player from './Player'
import Entity from './Entity'
import Character from '../../images/avatar.png'
import Grass from '../../images/grass.png'

const Block = ({ block }) => {
    const { id, position, entity, items, background } = block
    return (
        <div className={id === -1 ? 'block barrier' : `${background} block`}>
            <p>{id}</p>
            {entity !== null ? entity.name === "player" ? <img src={Character} alt="player character" /> :
                <p>{entity !== null ? entity.name : ""}</p>
                : ""}
        </div>
    )
}

export default Block