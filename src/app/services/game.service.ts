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
    board.cells = cells;
    this.board = board;
    return board;
  }
}
