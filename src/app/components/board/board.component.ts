import { Component, HostListener, OnInit } from '@angular/core';
import { GameConfiguration } from 'src/app/core/models/game';
import { GameService } from '../../services/game.service';
import { Board, Cell, KEY_CODE } from '../../core/models/game';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  board!: Board;
  cells!: Cell[][];
  currentCell!: Cell;
  emptyCell!: Cell;
  userWin = false;

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.startGame();
  }

  startGame() {
    const settings = new GameConfiguration(3, 3);
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

  /**
 * Swap cell with empty cell
 * @param direction
 */
  tryToMove(cellToSwap: Cell) {
    if (cellToSwap && this.emptyCell) {
      this.gameService.swapCells(this.board, this.emptyCell, cellToSwap);
      if (this.gameService.checkWin(this.board)) {
        console.log('Ganaste');
        this.userWin = true;
      }
    }
  }

}
