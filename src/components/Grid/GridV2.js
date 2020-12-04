import React, { useEffect } from 'react'
import Block from './Block'
import { v4 } from 'uuid'
import { connect } from 'react-redux'
import { initializeGame, movePlayer } from '../../actions'

const Grid = ({ display, grid, error, movePlayer }) => {
    useEffect(() => {
        initializeGame([50, 50])
    }, [])

    return (
        <div>
            <div className='Grid'>
                {display.map(block => (
                    <Block key={block.id === -1 ? v4() : block.id} block={block} />
                ))}
            </div>

            <div className='Menu'>
                <button onClick={() => movePlayer("n")}>Up</button>
                <div>
                    <button onClick={() => movePlayer("w")}>Left</button>
                    <button onClick={() => movePlayer("e")}>Right</button>
                </div>
                <button onClick={() => movePlayer("s")}>Down</button>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        grid: state.grid.grid,
        display: state.grid.display,
        error: state.grid.error
    }
}

export default connect(mapStateToProps, { initializeGame, movePlayer })(Grid)