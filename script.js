// const boardElement = document.getElementById('sudoku-board');

// // 1. Initialize the UI Grid
// function createGrid() {
//     for (let i = 0; i < 81; i++) {
//         const input = document.createElement('input');
//         input.type = 'number';
//         input.min = 1;
//         input.max = 9;
//         input.classList.add('cell');
        
//         // Prevent typing multiple digits, signs, or non-numeric characters
//         input.addEventListener('input', (e) => {
//             if (e.target.value.length > 1) {
//                 e.target.value = e.target.value.slice(0, 1);
//             }
//             if (e.target.value < 1 || e.target.value > 9) {
//                 e.target.value = '';
//             }
//         });

//         boardElement.appendChild(input);
//     }
// }

// // 2. Read DOM into a 2D Array
// function getBoardState() {
//     const inputs = document.querySelectorAll('.cell');
//     let board = [];
//     let row = [];
//     inputs.forEach((input, index) => {
//         row.push(input.value ? parseInt(input.value) : 0);
//         if ((index + 1) % 9 === 0) {
//             board.push(row);
//             row = [];
//         }
//     });
//     return board;
// }

// // 3. Write 2D Array back to DOM
// function updateGrid(board) {
//     const inputs = document.querySelectorAll('.cell');
//     let flatBoard = board.flat();
//     inputs.forEach((input, index) => {
//         input.value = flatBoard[index] === 0 ? '' : flatBoard[index];
//     });
// }

// // 4. The Validation Logic
// function isValid(board, row, col, num) {
//     // Check row and column
//     for (let i = 0; i < 9; i++) {
//         if (board[row][i] === num || board[i][col] === num) return false;
//     }
//     // Check 3x3 subgrid
//     const startRow = Math.floor(row / 3) * 3;
//     const startCol = Math.floor(col / 3) * 3;
//     for (let i = 0; i < 3; i++) {
//         for (let j = 0; j < 3; j++) {
//             if (board[startRow + i][startCol + j] === num) return false;
//         }
//     }
//     return true;
// }

// // 5. Pre-Validation Check (Checks if user inputs conflict)
// function isInitialBoardValid(board) {
//     for (let row = 0; row < 9; row++) {
//         for (let col = 0; col < 9; col++) {
//             let num = board[row][col];
//             if (num !== 0) {
//                 board[row][col] = 0; // Temporarily clear cell
                
//                 if (!isValid(board, row, col, num)) {
//                     board[row][col] = num; // CRITICAL: Put it back before failing!
//                     return false; 
//                 }
                
//                 board[row][col] = num; // Put it back if valid
//             }
//         }
//     }
//     return true;
// }

// // 6. The Backtracking Algorithm
// function solveSudoku(board) {
//     for (let row = 0; row < 9; row++) {
//         for (let col = 0; col < 9; col++) {
//             if (board[row][col] === 0) { 
//                 for (let num = 1; num <= 9; num++) {
//                     if (isValid(board, row, col, num)) {
//                         board[row][col] = num; 
                        
//                         if (solveSudoku(board)) return true; 
                        
//                         board[row][col] = 0; // Backtrack
//                     }
//                 }
//                 return false; 
//             }
//         }
//     }
//     return true;
// }

// // --- App Initialization & Single Hook-ins ---

// createGrid();

// // Cleaned up Unified Solve Button Logic
// document.getElementById('solve-btn').addEventListener('click', () => {
//     let currentBoard = getBoardState();
    
//     // Validate first to protect thread execution
//     if (!isInitialBoardValid(currentBoard)) {
//         alert("Invalid board! You have duplicate numbers in the same row, column, or 3x3 grid.");
//         return; 
//     }
    
//     if (solveSudoku(currentBoard)) {
//         updateGrid(currentBoard);
//     } else {
//         alert("No solution exists for this configuration!");
//     }
// });

// // Clear Button Logic
// document.getElementById('clear-btn').addEventListener('click', () => {
//     document.querySelectorAll('.cell').forEach(input => input.value = '');
// });


////////////////////////////////////////   2    ////////////////////////////////////////

// const boardElement = document.getElementById('sudoku-board');

// // 1. Initialize the UI Grid with Event Filtering
// function createGrid() {
//     for (let i = 0; i < 81; i++) {
//         const input = document.createElement('input');
//         input.type = 'number';
//         input.min = 1;
//         input.max = 9;
//         input.classList.add('cell');
        
//         input.addEventListener('input', (e) => {
//             if (e.target.value.length > 1) {
//                 e.target.value = e.target.value.slice(0, 1);
//             }
//             if (e.target.value < 1 || e.target.value > 9) {
//                 e.target.value = '';
//             }
//             // Clear error animations instantly on modification
//             e.target.classList.remove('error-flash');
//         });

//         boardElement.appendChild(input);
//     }
// }

// // 2. Extract DOM values to an explicit matrix array
// function getBoardState() {
//     const inputs = document.querySelectorAll('.cell');
//     let board = [];
//     let row = [];
//     inputs.forEach((input, index) => {
//         row.push(input.value ? parseInt(input.value) : 0);
//         if ((index + 1) % 9 === 0) {
//             board.push(row);
//             row = [];
//         }
//     });
//     return board;
// }

// // 3. Update UI Grid matching the state origins (Phase 2 Coloring Engine)
// function updateGrid(board, initialBoard) {
//     const inputs = document.querySelectorAll('.cell');
//     let flatBoard = board.flat();
//     let flatInitial = initialBoard.flat();
    
//     inputs.forEach((input, index) => {
//         const finalValue = flatBoard[index];
//         const initialValue = flatInitial[index];
        
//         input.value = finalValue === 0 ? '' : finalValue;
        
//         // Clear old states
//         input.classList.remove('user-input', 'solved-value', 'error-flash');
        
//         if (initialValue !== 0) {
//             input.classList.add('user-input');
//             input.disabled = true; 
//         } else if (finalValue !== 0) {
//             input.classList.add('solved-value');
//         }
//     });
// }

// // 4. Matrix Constraint Checking Rules
// function isValid(board, row, col, num) {
//     for (let i = 0; i < 9; i++) {
//         if (board[row][i] === num || board[i][col] === num) return false;
//     }
//     const startRow = Math.floor(row / 3) * 3;
//     const startCol = Math.floor(col / 3) * 3;
//     for (let i = 0; i < 3; i++) {
//         for (let j = 0; j < 3; j++) {
//             if (board[startRow + i][startCol + j] === num) return false;
//         }
//     }
//     return true;
// }

// // 5. Pre-validation and UI Error Engine
// function validateAndMarkErrors() {
//     const inputs = document.querySelectorAll('.cell');
//     inputs.forEach(input => input.classList.remove('error-flash')); // Reset
    
//     let board = getBoardState();
//     let isValidGrid = true;
    
//     for (let row = 0; row < 9; row++) {
//         for (let col = 0; col < 9; col++) {
//             let num = board[row][col];
//             if (num !== 0) {
//                 board[row][col] = 0; 
//                 if (!isValid(board, row, col, num)) {
//                     inputs[row * 9 + col].classList.add('error-flash');
//                     isValidGrid = false;
//                 }
//                 board[row][col] = num; 
//             }
//         }
//     }
//     return isValidGrid;
// }

// // 6. The Standard Backtracking Algorithm
// function solveSudoku(board) {
//     for (let row = 0; row < 9; row++) {
//         for (let col = 0; col < 9; col++) {
//             if (board[row][col] === 0) { 
//                 for (let num = 1; num <= 9; num++) {
//                     if (isValid(board, row, col, num)) {
//                         board[row][col] = num; 
//                         if (solveSudoku(board)) return true; 
//                         board[row][col] = 0; 
//                     }
//                 }
//                 return false; 
//             }
//         }
//     }
//     return true;
// }

// // --- App Orchestration Initialization ---
// createGrid();

// // Solve Button Handling Logic
// document.getElementById('solve-btn').addEventListener('click', () => {
//     if (!validateAndMarkErrors()) {
//         return; // Halted. Cells are visually flashing red.
//     }
    
//     let currentBoard = getBoardState();
//     let initialBoardSnapshot = currentBoard.map(row => [...row]); // Deep clone state mapping
    
//     if (solveSudoku(currentBoard)) {
//         updateGrid(currentBoard, initialBoardSnapshot);
//     } else {
//         alert("No solution exists for this configuration!");
//     }
// });

// // Clear Button Handling Logic
// document.getElementById('clear-btn').addEventListener('click', () => {
//     document.querySelectorAll('.cell').forEach(input => {
//         input.value = '';
//         input.disabled = false;
//         input.classList.remove('user-input', 'solved-value', 'error-flash');
//     });
// });

// // Dark/Light Mode Theme Toggle Switch Handler
// document.getElementById('theme-toggle').addEventListener('click', () => {
//     document.body.classList.toggle('dark-theme');
// });





////////////////////////////////////////     3        ////////////////////////////////////




const boardElement = document.getElementById('sudoku-board');
const statusDisplay = document.getElementById('status-display');
const speedSlider = document.getElementById('speed-slider');
const speedVal = document.getElementById('speed-val');
const pauseBtn = document.getElementById('pause-btn');
const solveBtn = document.getElementById('solve-btn');

// Global Control States for Phase 3 Visualizer
let delay = 100;
let isPaused = false;
let isSolving = false;

// 1. Initialize Grid Layout
function createGrid() {
    for (let i = 0; i < 81; i++) {
        const input = document.createElement('input');
        input.type = 'number';
        input.min = 1;
        input.max = 9;
        input.classList.add('cell');
        
        input.addEventListener('input', (e) => {
            if (e.target.value.length > 1) e.target.value = e.target.value.slice(0, 1);
            if (e.target.value < 1 || e.target.value > 9) e.target.value = '';
            e.target.classList.remove('error-flash');
        });
        boardElement.appendChild(input);
    }
}

// 2. Extract DOM Array Matrix
function getBoardState() {
    const inputs = document.querySelectorAll('.cell');
    let board = [];
    let row = [];
    inputs.forEach((input, index) => {
        row.push(input.value ? parseInt(input.value) : 0);
        if ((index + 1) % 9 === 0) {
            board.push(row);
            row = [];
        }
    });
    return board;
}

// 3. Mathematical Constraint Evaluator
function isValid(board, row, col, num) {
    for (let i = 0; i < 9; i++) {
        if (board[row][i] === num || board[i][col] === num) return false;
    }
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[startRow + i][startCol + j] === num) return false;
        }
    }
    return true;
}

// 4. Input Configuration Scan
function validateAndMarkErrors() {
    const inputs = document.querySelectorAll('.cell');
    inputs.forEach(input => input.classList.remove('error-flash'));
    let board = getBoardState();
    let isValidGrid = true;
    
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            let num = board[row][col];
            if (num !== 0) {
                board[row][col] = 0; 
                if (!isValid(board, row, col, num)) {
                    inputs[row * 9 + col].classList.add('error-flash');
                    isValidGrid = false;
                }
                board[row][col] = num; 
            }
        }
    }
    return isValidGrid;
}

// --- Phase 3 Visualization Core Logic Helpers ---

// Async execution pause delay utility
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Synchronous Pause Engine monitor loop
async function checkPauseStatus() {
    while (isPaused) {
        statusDisplay.textContent = "Paused";
        statusDisplay.style.color = "#f1c40f"; // Yellow warning
        await sleep(100); // Poll tracking flag safely every 100ms
    }
}

// 5. Asynchronous Live Backtracking Engine
async function solveSudokuAsync(board) {
    const inputs = document.querySelectorAll('.cell');

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) { 
                
                for (let num = 1; num <= 9; num++) {
                    // Check process pauses before executing computations
                    await checkPauseStatus();
                    if (!isSolving) return false; // Early termination if cleared

                    statusDisplay.textContent = `Thinking... Trying ${num} at (${row+1},${col+1})`;
                    statusDisplay.style.color = "var(--checking-bg)";

                    let cellIdx = row * 9 + col;
                    inputs[cellIdx].value = num;
                    inputs[cellIdx].classList.remove('backtrack');
                    inputs[cellIdx].classList.add('checking');

                    await sleep(delay); // Force paint frame pause

                    if (isValid(board, row, col, num)) {
                        board[row][col] = num;
                        inputs[cellIdx].classList.remove('checking');
                        inputs[cellIdx].classList.add('solved-value');

                        if (await solveSudokuAsync(board)) return true;

                        // Reset internal states if deeper branches collapse
                        await checkPauseStatus();
                        if (!isSolving) return false;
                        board[row][col] = 0;
                    }

                    // Fail Trigger: Initiate visual backstep flash
                    statusDisplay.textContent = `Conflict! Backtracking at (${row+1},${col+1})`;
                    statusDisplay.style.color = "var(--backtrack-bg)";
                    inputs[cellIdx].classList.remove('checking', 'solved-value');
                    inputs[cellIdx].classList.add('backtrack');
                    inputs[cellIdx].value = '';
                    await sleep(delay);
                }
                
                return false; // Collapses branch tree
            }
        }
    }
    return true; 
}

// --- Event Orchestration Initializations ---
createGrid();

// Solve / Trigger Control Thread
solveBtn.addEventListener('click', async () => {
    if (isSolving) return;
    if (!validateAndMarkErrors()) return;

    let currentBoard = getBoardState();
    
    // Tag and secure initial user inputs before tree calculation
    const inputs = document.querySelectorAll('.cell');
    inputs.forEach((input) => {
        if (input.value !== '') {
            input.classList.add('user-input');
            input.disabled = true;
        }
    });

    // Flip Control Flags
    isSolving = true;
    isPaused = false;
    solveBtn.disabled = true;
    pauseBtn.disabled = false;
    pauseBtn.textContent = "Pause";

    if (await solveSudokuAsync(currentBoard)) {
        statusDisplay.textContent = "Puzzle Solved Successfully!";
        statusDisplay.style.color = "var(--solved-color)";
    } else if (isSolving) {
        statusDisplay.textContent = "No Solution Exists!";
        statusDisplay.style.color = "var(--error-bg)";
    }
    
    isSolving = false;
    solveBtn.disabled = false;
    pauseBtn.disabled = true;
});

// Pause / Resume Event Router
pauseBtn.addEventListener('click', () => {
    if (!isSolving) return;
    
    isPaused = !isPaused;
    if (isPaused) {
        pauseBtn.textContent = "Resume";
        pauseBtn.classList.add('btn-primary');
    } else {
        pauseBtn.textContent = "Pause";
        pauseBtn.classList.remove('btn-primary');
    }
});

// Real-time Speed Slider Range Tracking Listener
speedSlider.addEventListener('input', (e) => {
    delay = parseInt(e.target.value);
    speedVal.textContent = `${delay}ms`;
});

// Clear View Port Reset Hook
document.getElementById('clear-btn').addEventListener('click', () => {
    isSolving = false; // Gracefully breaks any running loop
    isPaused = false;
    
    document.querySelectorAll('.cell').forEach(input => {
        input.value = '';
        input.disabled = false;
        input.classList.remove('user-input', 'solved-value', 'checking', 'backtrack', 'error-flash');
    });

    statusDisplay.textContent = "Idle";
    statusDisplay.style.color = "var(--text-color)";
    solveBtn.disabled = false;
    pauseBtn.disabled = true;
    pauseBtn.textContent = "Pause";
    pauseBtn.classList.remove('btn-primary');
});

// Theme Selector Component Toggle Switch Router
document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
});