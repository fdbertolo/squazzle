import { Injectable } from '@angular/core';
import { Board, Cell, GameConfiguration } from '../core/models/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private _board!: Board;

  constructor() { }

  get board() {
    return this._board;
  }
  set board(board: Board) {
    this._board = board;
  }

  /**
   * Creates and return the initial board
   * @param gameSetting 
   * @returns 
   */
  createEmptyBoard(gameSetting: GameConfiguration): Board {
    const cells: Cell[][] = [];
    const colsY = +gameSetting.cellsY;
    const colsX = +gameSetting.cellsX;
    let board: Board = new Board();
    let number = 1;
    let cellPosition = 100 / (colsY -1);
    for (let i: number = 0; i < colsX; i++) {
      cells[i] = [];
      for (let j: number = 0; j < colsY; j++) {
        cells[i][j] = new Cell(number, i, j);
        let cell = cells[i][j];
        cell.bgPositionY = i * cellPosition;
        cell.bgPositionX = j * cellPosition;
        number++;
      }
    }
    // Set last cell as empty so we can use it to exchange cells.
    cells[colsY - 1][colsX - 1].isEmpty = true;
    board.cells = cells;
    this.board = board;
    return board;
  }

  /**
   * Randomize the board
   * @param board Game board
   */
  shuffleBoard(board: Board) {
    const cells = board.cells;
    for (let i = 0; i < cells.length; i++) {
      for (let j = 0; j < cells[i].length; j++) {
        let i1 = Math.floor(Math.random() * (cells.length));
        let j1 = Math.floor(Math.random() * (cells.length));
        let temp = cells[i][j];
        cells[i][j] = cells[i1][j1];
        this.updateCoordinates(cells[i][j], i, j);
        cells[i1][j1] = temp;
        this.updateCoordinates(cells[i1][j1], i1, j1);
      }
    }
  }

  /**
   * Swap cells and update coordinates
   * @param board 
   * @param currCell 
   * @param cellToSwap 
   */
  swapCells(board: Board, currCell: Cell, cellToSwap: Cell) {
    const currCellX = currCell.coordinateX;
    const currCellY = currCell.coordinateY;
    const cellToSwapX = cellToSwap.coordinateX;
    const cellToSwapY = cellToSwap.coordinateY;
    let cells = board.cells;
    let temp = cells[currCellX][currCellY];
    cells[currCellX][currCellY] = cells[cellToSwapX][cellToSwapY];
    this.updateCoordinates(cells[currCellX][currCellY], currCellX, currCellY);
    cells[cellToSwapX][cellToSwapY] = temp;
    this.updateCoordinates(cells[cellToSwapX][cellToSwapY], cellToSwapX, cellToSwapY);
  }

  /**
   * Update the X and Y coordinates for a given cell
   * @param cell 
   * @param x 
   * @param y 
   */
  updateCoordinates(cell: Cell, x: number, y: number) {
    cell.coordinateX = x;
    cell.coordinateY = y;
  }

  getEmptyCell(board: Board): Cell {
    const cells = board.cells;
    let emptyCell;
    for (let i = 0; i < cells.length; i++) {
      for (let j = 0; j < cells[i].length; j++) {
        if (cells[i][j].isEmpty) {
          emptyCell = cells[i][j];
          return emptyCell;
        }
      }
    }
    return emptyCell || cells[0][0];
  }

  checkWin(board: Board): boolean {
    const cells = board.cells;
    let startNumber = 1;
    for (let i = 0; i < cells.length; i++) {
      for (let j = 0; j < cells[i].length; j++) {
        if (startNumber !== cells[i][j].number) {
          return false;
        }
        startNumber++;
      }
    }
    return true;
  }

  isValidCoordinate(cells: Cell[][], x: number, y: number): boolean {
    try {
      if (cells[x][y]) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }

  }
}
