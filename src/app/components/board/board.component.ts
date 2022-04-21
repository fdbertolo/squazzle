import { Component, HostListener, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GameConfiguration } from 'src/app/core/models/game';
import { GameService } from '../../services/game.service';
import { Board, Cell, KEY_CODE } from '../../core/models/game';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnChanges {

  @Input() difficulty = 3;
  board!: Board;
  cells!: Cell[][];
  currentCell!: Cell;
  emptyCell!: Cell;
  userWin = false;
  totalMovements = 0;

  randomImages = true;
  catImages = false;
  dogImages = false;

  constructor(private gameService: GameService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['difficulty']?.currentValue) {
      this.startGame(changes['difficulty'].currentValue);
    }
  }

  startGame(difficulty: number) {
    this.userWin = false;
    const settings = new GameConfiguration(difficulty, difficulty);
    this.board = this.gameService.createEmptyBoard(settings);
    this.gameService.shuffleBoard(this.board);
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    this.emptyCell = this.gameService.getEmptyCell(this.board);
    let cellToSwap: Cell;
    let validCoordinate;
    let swapCellCoorX = -1;
    let swapCellCoorY = -1;
    switch (event.key) {
      case KEY_CODE.RIGHT_ARROW:
        swapCellCoorX = this.emptyCell.coordinateX;
        swapCellCoorY = this.emptyCell.coordinateY - 1;
        break;
      case KEY_CODE.LEFT_ARROW:
        swapCellCoorX = this.emptyCell.coordinateX;
        swapCellCoorY = this.emptyCell.coordinateY + 1;
        break;
      case KEY_CODE.DOWN_ARROW:
        swapCellCoorX = this.emptyCell.coordinateX - 1;
        swapCellCoorY = this.emptyCell.coordinateY;
        break;
      case KEY_CODE.UP_ARROW:
        swapCellCoorX = this.emptyCell.coordinateX + 1;
        swapCellCoorY = this.emptyCell.coordinateY;
        break;
    }
    validCoordinate = this.gameService.isValidCoordinate(this.board.cells, swapCellCoorX, swapCellCoorY);
    if (validCoordinate) {
      cellToSwap = this.board.cells[swapCellCoorX][swapCellCoorY];
      this.tryToMove(cellToSwap);
    }
  }

  moveCellOnClick(cell: Cell) {
    this.emptyCell = this.gameService.getEmptyCell(this.board);
    let currentCoordinateX = cell.coordinateX;
    let currentCoordinateY = cell.coordinateY;

    this.tryToGo(cell, currentCoordinateX, currentCoordinateY - 1) || 
    this.tryToGo(cell, currentCoordinateX, currentCoordinateY + 1) || 
    this.tryToGo(cell, currentCoordinateX + 1, currentCoordinateY) || 
    this.tryToGo(cell, currentCoordinateX - 1, currentCoordinateY);
  
  }

  tryToGo(currentCell: Cell, x: number, y: number): boolean {
    const validCoordinate = this.gameService.isValidCoordinate(this.board.cells, x, y);
    let moved = false;
    if (validCoordinate) {
      const nextCell = this.board.cells[x][y];
      if (nextCell.isEmpty) {
        this.emptyCell = nextCell;
        this.tryToMove(currentCell);
        moved = true;
      }
    }
    return moved;
  }

  /**
 * Swap cell with empty cell
 * @param direction
 */
  tryToMove(cellToSwap: Cell): void {
    if (cellToSwap && this.emptyCell && !this.userWin) {
      this.gameService.swapCells(this.board, this.emptyCell, cellToSwap);
      this.totalMovements++;
      if (this.gameService.checkWin(this.board)) {
        console.log('Ganaste');
        this.userWin = true;
      }
    }
  }

  getPosition(cell: Cell) {
    return {
      'background-position': `${cell.bgPositionX}% ${cell.bgPositionY}%`
    };
  }

  changeImage(id: number) {
    this.randomImages === this.randomImages && id === 1 ? this.randomImages = true : this.randomImages = false;
    this.catImages === this.catImages && id === 2 ? this.catImages = true : this.catImages = false;
    this.dogImages === this.dogImages && id === 3 ? this.dogImages = true : this.dogImages = false;
  }
}
