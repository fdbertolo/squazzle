export class Board {
    cells: Cell[][];
    constructor(cells: Cell[][] = []) {
        this.cells = cells;
    }
}

export class Cell {
    number: number;
    coordinateX: number;
    coordinateY: number;
    constructor(number: number, coordX: number, coordY: number) {
        this.number = number;
        this.coordinateX = coordX;
        this.coordinateY = coordY;
    }
}
export class GameConfiguration {
    cellsX: number;
    cellsY: number;
    constructor(cellsX?: number, cellsY?: number) {
        this.cellsX = cellsX || 3;
        this.cellsY = cellsY || 3;
    }
}

export enum KEY_CODE {
    RIGHT_ARROW = 'ArrowRight',
    LEFT_ARROW = 'ArrowLeft',
    UP_ARROW = 'ArrowUp',
    DOWN_ARROW = 'ArrowDown',
}
