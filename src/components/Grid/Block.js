import React from 'react'
import Player from './Player'
import Entity from './Entity'
import Character from '../../images/avatar.png'

const Block = ({ block }) => {
    const { id, position, entity, items, background } = block
    return (
        <div className={id === -1 ? 'Block Barrier' : 'Block'}>
            <p>{id}</p>
            {entity !== null ? entity.name === "player" ? <img src={Character} /> :
                <p>{entity !== null ? entity.name : ""}</p>
                : ""}
        </div>
    )
}

export default Block