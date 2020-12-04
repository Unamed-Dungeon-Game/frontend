import {
    INIT_GRID,
    INIT_DISPLAY,
    INIT_POSITION,
    UPDATE_GRID_SIZE,
    UPDATE_DISPLAY_SIZE,
    UPDATE_DISPLAY,
    UPDATE_POSITION,
    UPDATE_GRID
} from '../actions/index'

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

const updateDisplay = (state, direction) => {
    const [x, y] = state.position

    const normalPositions = {
        "n": {
            startHeight: y + Math.ceil(state.displaySize / 2),
            endHeight: y - Math.floor(state.displaySize / 2),
            startWidth: x - Math.floor(state.displaySize / 2),
            endWidth: x + Math.ceil(state.displaySize / 2)
        },
        "s": {
            startHeight: y + (Math.floor(state.displaySize / 2) - 1),
            endHeight: y - (Math.ceil(state.displaySize / 2) + 1),
            startWidth: x - Math.floor(state.displaySize / 2),
            endWidth: x + Math.ceil(state.displaySize / 2)
        },
        "e": {
            startHeight: y + Math.floor(state.displaySize / 2),
            endHeight: y - Math.ceil(state.displaySize / 2),
            startWidth: x - (Math.floor(state.displaySize / 2) - 1),
            endWidth: x + (Math.ceil(state.displaySize / 2) + 1)
        },
        "w": {
            startHeight: y + Math.floor(state.displaySize / 2),
            endHeight: y - Math.ceil(state.displaySize / 2),
            startWidth: x - Math.ceil(state.displaySize / 2),
            endWidth: x + Math.floor(state.displaySize / 2)
        },
    }

    let updatedDisplay = []
    let position = normalPositions[direction]

    for (let i = position.startHeight; i > position.endHeight; i--) {
        let row
        try {
            row = state.grid[i].slice(position.startWidth, position.endWidth)

            if (position.startWidth < 0) {
                row = state.grid[i].slice(0, position.endWidth)
                for (let j = position.startWidth; j < 0; j++) {
                    row.unshift(createBlock())
                }
                if (position.endWidth >= state.width) {
                    for (let x = position.endWidth; x > state.width; x--) {
                        row.push(createBlock())
                    }
                }
            } else if (position.endWidth >= state.width) {
                row = state.grid[i].slice(position.startWidth, state.width)
                for (let j = position.endWidth; j > state.width; j--) {
                    row.push(createBlock())
                }
            }
        } catch (err) {
            row = new Array(state.displaySize).fill(createBlock())
        }

        updatedDisplay = updatedDisplay.concat(row)
    }

    return updatedDisplay
}

const updatePosition = (state, direction) => {
    const [x, y] = state.position

    const positionByDirection = () => {
        const updatedPositions = {
            "n": [x, y + 1],
            "s": [x, y - 1],
            "e": [x + 1, y],
            "w": [x - 1, y]
        }

        if (direction === "n" && y === state.height) {
            return state.position
        } else if (direction === "s" && y === 0) {
            return state.position
        } else if (direction === "w" && x === 0) {
            return state.position
        } else if (direction === "e" && x === state.width) {
            return state.position
        } else {
            return updatedPositions[direction]
        }
    }

    return positionByDirection()
}

const updateGrid = (state) => {
    const grid = { ...state.grid }
    grid[state.position[1]][state.position[0]].entity = { name: "player" }
    return grid
}

const initialState = {
    width: 100,
    height: 100,
    position: [50, 50],
    grid: {},
    display: [],
    size: 9,
    error: null
}

const reducer = (state = initialState, action) => {
    const grid = { ...state.grid }
    switch (action.type) {
        case INIT_GRID:
            return {
                ...state,
                grid: createGrid(state.width, state.height)
            }
        case INIT_POSITION:
            grid[action.payload[1]][action.payload[0]].entity = { name: "player" }
            return {
                ...state,
                grid: grid,
                positon: action.payload
            }
        case INIT_DISPLAY:
            return {
                ...state,
                display: initializeDisplay(state)
            }
        case UPDATE_GRID_SIZE:
            return {
                ...state,
                width: action.payload[0],
                height: action.payload[1]
            }
        case UPDATE_DISPLAY_SIZE:
            if (action.payload % 2 === 0) {
                return {
                    ...state,
                    error: "Size must be odd"
                }
            } else {
                return {
                    ...state,
                    size: action.payload
                }
            }
        case UPDATE_POSITION:
            return {
                ...state,
                postion: updatePosition(state, action.payload)
            }
        case UPDATE_GRID:
            return {
                ...state,
                grid: updateGrid(state)
            }
        case UPDATE_DISPLAY:
            const [x, y] = state.position
            grid[y][x].entity = null
            return {
                ...state,
                grid: grid,
                display: updateDisplay(state, action.payload)
            }
        default:
            return state
    }
}

export default reducer