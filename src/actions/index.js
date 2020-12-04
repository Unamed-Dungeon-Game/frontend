export const INIT_GRID = "INIT_GRID"
export const INIT_DISPLAY = "INIT_DISPLAY"
export const INIT_POSITION = "INIT_POSITION"
export const UPDATE_GRID_SIZE = "UPDATE_GRID_SIZE"
export const UPDATE_DISPLAY_SIZE = "UPDATE_DISPLAY_SIZE"
export const UPDATE_POSITION = "UPDATE_POSITION"
export const UPDATE_GRID = "UPDATE_GRID"
export const UPDATE_DISPLAY = "UPDATE_DISPLAY"


export const initializeGame = (position) => dispatch => {
    // position should be in the format [x, y]
    console.log("Initializing")
    dispatch({ type: INIT_GRID })

    dispatch({ type: INIT_POSITION, payload: position })

    dispatch({ type: INIT_DISPLAY })
}

// export const initializeGrid = () => dispatch => {
//     dispatch({ type: INIT_GRID })
// }

// export const initializePosition = (position) => dispatch => {
//     // position should be in the format [x, y]
//     dispatch({ type: INIT_POSITION, payload: position })
// }

// export const initializeDisplay = () => dispatch => {
//     dispatch({ type: INIT_DISPLAY })
// }

export const updateGridSize = (size) => dispatch => {
    // size should be in the format [width, height]
    dispatch({ type: UPDATE_GRID_SIZE, payload: size })
}

export const updateDisplaySize = (size) => dispatch => {
    // size should be in the format [width, height] but for now its a single integer 
    dispatch({ type: UPDATE_DISPLAY_SIZE, payload: size })
}

export const movePlayer = (direction) => dispatch => {
    // direction should be in the format "x" x being the first letter of appropriate direction
    dispatch({ type: UPDATE_POSITION, payload: direction })

    dispatch({ type: UPDATE_GRID })

    dispatch({ type: UPDATE_DISPLAY, payload: direction })
}

// export const updatePosition = (direction) => dispatch => {
//     // direction should be in the format "x" x being the first letter of appropriate direction
//     dispatch({ type: UPDATE_POSITION, payload: direction })
// }

// export const updateGrid = () => dispatch => {
//     dispatch({ type: UPDATE_GRID })
// }

// export const updateDisplay = (direction) => dispatch => {
//     dispatch({ type: UPDATE_DISPLAY, payload: direction })
// }
