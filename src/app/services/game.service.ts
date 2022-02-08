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
    for (let i: number = 0; i < colsX; i++) {
      cells[i] = [];
      for (let j: number = 0; j < colsY; j++) {
        cells[i][j] = new Cell(number, i, j);
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
        cells[i1][j1] = temp;
      }
    }
  }
}
