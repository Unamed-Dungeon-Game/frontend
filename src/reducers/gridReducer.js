import { INIT_GRID, INIT_DISPLAY, EDIT_GRID_SIZE, EDIT_DISPLAY_SIZE } from '../actions/index'

const createBlock = (id = -1, position = null, items = null, entity = null, background = null) => {
    return {
        id: id,
        position: position,
        items: items,
        entity: entity,
        background: background
    }
}

const createGrid = (w, h) => {
    const newGrid = {}
    // const initialLocationId = (Math.floor(h / 2) * w) + Math.floor(w / 2)
    // const initialLocation = [Math.floor(w / 2), Math.floor(h / 2)]

    // Creating an object with keys from 0-height
    // Each key has an array of length width
    for (let i = 0; i < h; i++) {
        newGrid[i] = new Array(w)
        for (let x = 0; x < w; x++) {
            newGrid[i][x] = createBlock((i * 100) + x, x)
        }
    }

    // Returning the newly created grid
    // Returning the center point of the grid
    return newGrid
}

const initializeDisplay = (state) => {
    // Finding the starting dimensions of the initial display
    const startHeight = state.initialLocation[1] + Math.floor(state.displaySize / 2)
    const endHeight = state.initialLocation[1] - Math.ceil(state.displaySize / 2)
    const startWidth = state.initialLocation[0] - Math.floor(state.displaySize / 2)
    const endWidth = state.initialLocation[0] + Math.ceil(state.displaySize / 2)
    let newDisplay = []

    for (let i = startHeight; i > endHeight; i--) {
        // console.log(i)
        let row
        try {
            row = state.grid[i].slice(startWidth, endWidth)

            if (startWidth < 0) {
                row = state.grid[i].slice(0, endWidth)
                for (let x = startWidth; x < 0; x++) {
                    row.unshift(createBlock())
                }
            } else if (endWidth >= state.width) {
                row = state.grid[i].slice(startWidth, state.width)
                for (let x = endWidth; x > state.width; x--) {
                    row.push(createBlock())
                }
            }
        } catch (err) {
            row = new Array(state.displaySize).fill(createBlock())
        }

        newDisplay = newDisplay.concat(row)
    }
    console.log(newDisplay)
    return newDisplay
}

const initialState = {
    width: 100,
    height: 100,
    initialLocation: [50, 50],
    grid: {},
    display: [],
    size: 9
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case INIT_GRID:
            return {
                ...state,
                grid: createGrid(state.width, state.length)
            }
        case INIT_DISPLAY:
            return {
                ...state,
                display: initializeDisplay(state)
            }
        case EDIT_GRID_SIZE:
            return {
                ...state,
                width: action.payload[0],
                height: action.payload[1]
            }
        case EDIT_DISPLAY_SIZE:
            return {
                ...state,
                size: action.payload
            }
        default:
            return state
    }
}

export default reducer