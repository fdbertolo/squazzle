import { Component, HostListener, OnInit } from '@angular/core';
import { GameConfiguration } from 'src/app/core/models/game';
import { GameService } from '../../services/game.service';
import { Board, Cell, KEY_CODE, AxisDirection } from '../../core/models/game';
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
    switch (event.key) {
      case KEY_CODE.RIGHT_ARROW:
        this.tryToMove(AxisDirection.RIGHT);
        break;
      case KEY_CODE.LEFT_ARROW:
        this.tryToMove(AxisDirection.LEFT);
        break;
      case KEY_CODE.DOWN_ARROW:
        this.tryToMove(AxisDirection.DOWN);
        break;
      case KEY_CODE.UP_ARROW:
        this.tryToMove(AxisDirection.UP);
        break;
    }
  }

  /**
 * Move cell in the board
 * @param direction
 */
  tryToMove(direction: AxisDirection) {
    // TODO: This is just for testing purposes
    let currCell = this.board.cells[1][1];
    let swapCell = this.board.cells[1][2];
    this.gameService.swapCells(this.board, currCell, swapCell);
  }
}
