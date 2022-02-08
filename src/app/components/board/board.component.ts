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

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.startGame();
  }

  startGame() {
    const settings = new GameConfiguration(6, 6);
    this.board = this.gameService.createEmptyBoard(settings);
    // this.gameService.shuffleBoard(this.board);
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    this.emptyCell = this.gameService.getEmptyCell(this.board);
    let cellToSwap: Cell;
    switch (event.key) {
      case KEY_CODE.RIGHT_ARROW:
        cellToSwap = this.board.cells[this.emptyCell.coordinateX][this.emptyCell.coordinateY - 1];
        this.tryToMove(cellToSwap);
        break;
      case KEY_CODE.LEFT_ARROW:
        cellToSwap = this.board.cells[this.emptyCell.coordinateX][this.emptyCell.coordinateY + 1];
        this.tryToMove(cellToSwap);
        break;
      case KEY_CODE.DOWN_ARROW:
        cellToSwap = this.board.cells[this.emptyCell.coordinateX - 1][this.emptyCell.coordinateY];
        this.tryToMove(cellToSwap);
        break;
      case KEY_CODE.UP_ARROW:
        cellToSwap = this.board.cells[this.emptyCell.coordinateX + 1][this.emptyCell.coordinateY];
        this.tryToMove(cellToSwap);
        break;
    }
  }

  /**
 * Swap cell with empty cell
 * @param direction
 */
  tryToMove(cellToSwap: Cell) {
    if (cellToSwap && this.emptyCell) {
      this.gameService.swapCells(this.board, this.emptyCell, cellToSwap);
    }
  }
}
