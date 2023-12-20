
function PickColorMode(square, colorMode) {
    let randomRed = Math.floor(Math.random() * 256);
    let randomGreen = Math.floor(Math.random() * 256);
    let randomBlue = Math.floor(Math.random() * 256);

    colorMode == "rgb" ? square.style.backgroundColor = `rgb(${randomRed},${randomGreen},${randomBlue}`
    : square.style.backgroundColor = 'black';
}

function createRow(ncols, colorMode) {
    let squareRow = document.createElement("div");
    let sizeShare = 1 / ncols * 100

    for (let i = 0; i < ncols; i++) {
        let square = document.createElement("div");
        square.style.width = `${sizeShare}%`;
        square.style.height = `100%`;

        square.addEventListener('mouseover', () => PickColorMode(square, colorMode));
        squareRow.appendChild(square);
    }

    squareRow.className = "squareRow";
    squareRow.style.cssText = `display: flex; width: 100%; height: ${sizeShare}%`;
    return squareRow;
}

function createGrid(nsquares, colorMode) {
    let grid = document.querySelector("#grid");
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }

    for (let i = 0; i < nsquares; i++) {
        let squareRow = createRow(nsquares, colorMode);
        grid.appendChild(squareRow);
    }
}

let nsquares = 16;
let colorMode = "black";
let squareSize = document.querySelector("#squaresSize");

squareSize.textContent = `${nsquares} x ${nsquares}`;
createGrid(nsquares, colorMode);


slider = document.querySelector("#squaresNumberSlider")
slider.addEventListener("input", () => {
    nsquares = slider.value;
    squareSize.textContent = `${nsquares} x ${nsquares}`;
    createGrid(nsquares, colorMode);
})

rgbButton = document.querySelector("#rgb") ; 
blackButton = document.querySelector("#black") ;

rgbButton.addEventListener("click", () => {
    colorMode = "rgb"
    createGrid(nsquares, colorMode);
});

blackButton.addEventListener("click", () => {
    colorMode = "black"
    createGrid(nsquares, colorMode);
});






