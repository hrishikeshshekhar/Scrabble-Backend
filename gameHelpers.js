// Creating the initial state
let createInitialState = () => {
// Creating the board state
const height = 15
const width  = 15
const slateSize = 7

let boardTiles = Array(height)

for (let row = 0; row < height; ++row) {
    boardTiles[row] = Array(width)

    for (let col = 0; col < width; ++col) {
    // Initializing the board with empty characters
        let boardTile = {
            letter: ' ',
            draggable: false,
            overValidTarget: false
        }
        boardTiles[row][col] = boardTile;
        }
    }

    // Initializing all the multipliers
    // NOTE : Format used here is [word, letter]
    let multiplierArray = [
        [[3, 1], [1, 1], [1, 1], [1, 2], [1, 1], [1, 1], [1, 1], [3, 1], [1, 1], [1, 1], [1, 2], [1, 1], [1, 1], [1, 1], [3, 1]],
        [[1, 1], [2, 1], [1, 1], [1, 1], [1, 1], [1, 3], [1, 1], [1, 1], [1, 1], [1, 3], [1, 1], [1, 1], [1, 1], [2, 1], [1, 1]],
        [[1, 1], [1, 1], [2, 1], [1, 1], [1, 1], [1, 1], [1, 2], [1, 1], [1, 2], [1, 1], [1, 1], [1, 1], [2, 1], [1, 1], [1, 1]],
        [[1, 2], [1, 1], [1, 1], [2, 1], [1, 1], [1, 1], [1, 1], [1, 2], [1, 1], [1, 1], [1, 1], [2, 1], [1, 1], [1, 1], [1, 2]],
        [[1, 1], [1, 1], [1, 1], [1, 1], [2, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [2, 1], [1, 1], [1, 1], [1, 1], [1, 1]],
        [[1, 1], [1, 3], [1, 1], [1, 1], [1, 1], [1, 3], [1, 1], [1, 1], [1, 1], [1, 3], [1, 1], [1, 1], [1, 1], [1, 3], [1, 1]],
        [[1, 1], [1, 1], [1, 2], [1, 1], [1, 1], [1, 1], [1, 2], [1, 1], [1, 2], [1, 1], [1, 1], [1, 1], [1, 2], [1, 1], [1, 1]],
        [[3, 1], [1, 1], [1, 1], [1, 2], [1, 1], [1, 1], [1, 1], [2, 1], [1, 1], [1, 1], [1, 1], [1, 2], [1, 1], [1, 1], [3, 1]],
        [[1, 1], [1, 1], [1, 2], [1, 1], [1, 1], [1, 1], [1, 2], [1, 1], [1, 2], [1, 1], [1, 1], [1, 1], [1, 2], [1, 1], [1, 1]],
        [[1, 1], [1, 3], [1, 1], [1, 1], [1, 1], [1, 3], [1, 1], [1, 1], [1, 1], [1, 3], [1, 1], [1, 1], [1, 1], [1, 3], [1, 1]],
        [[1, 1], [1, 1], [1, 1], [1, 1], [2, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [2, 1], [1, 1], [1, 1], [1, 1], [1, 1]],
        [[1, 2], [1, 1], [1, 1], [2, 1], [1, 1], [1, 1], [1, 1], [1, 2], [1, 1], [1, 1], [1, 1], [2, 1], [1, 1], [1, 1], [1, 2]],
        [[1, 1], [1, 1], [2, 1], [1, 1], [1, 1], [1, 1], [1, 2], [1, 1], [1, 2], [1, 1], [1, 1], [1, 1], [2, 1], [1, 1], [1, 1]],
        [[1, 1], [2, 1], [1, 1], [1, 1], [1, 1], [1, 3], [1, 1], [1, 1], [1, 1], [1, 3], [1, 1], [1, 1], [1, 1], [2, 1], [1, 1]],
        [[3, 1], [1, 1], [1, 1], [1, 2], [1, 1], [1, 1], [1, 1], [3, 1], [1, 1], [1, 1], [1, 1], [1, 2], [1, 1], [1, 1], [3, 1]]
    ]

    // Mapping the above array to a list of objects
    let multipliers = Array(height)

    for (let row = 0; row < height; ++row) {
        multipliers[row] = Array(width)
        for (let col = 0; col < width; ++col) {
        multipliers[row][col] = {
            word: multiplierArray[row][col][0],
            letter: multiplierArray[row][col][1]
        }
        }
    }

    // Creating the player slates
    
    let gameState = {
        boardHeight: height,
        boardWidth: width,
        boardTiles: boardTiles,
        multipliers: multipliers,
        slateTiles: slateTiles,
        slateSize: slateSize,
        selectedTile: null,
        score: 0
    }

    let userState = {
        username: "",
        room: ""
    }

    let state = {
        gameState: gameState,
        userState: userState
    }

    return state
}

// A helper to check if the change in state is valid
let checkValid = (state1, state2) => {

}

module.exports = {
    createState : createInitialState,
    checkValid : checkValid
}
