export class Board {
    cells: Cell[][];
    constructor(cells: Cell[][] = []) {
        this.cells = cells;
    }
}

export interface Cell {
    number: number;
    coordinateX: number;
    coordinateY: number;
}

export enum KEY_CODE {
    RIGHT_ARROW = 'ArrowRight',
    LEFT_ARROW = 'ArrowLeft',
    UP_ARROW = 'ArrowUp',
    DOWN_ARROW = 'ArrowDown',
}