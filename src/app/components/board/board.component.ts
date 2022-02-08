import { Component, OnInit } from '@angular/core';
import { GameConfiguration } from 'src/app/core/models/game';
import { GameService } from '../../services/game.service';
import { Board, Cell } from '../../core/models/game';
import { ImagesService } from '../../services/images.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  board!: Board;
  cells!: Cell[][];
  currentCell!: Cell;

  constructor(private gameService: GameService, private imgService: ImagesService) { }

  ngOnInit(): void {
    this.startGame();
  }

  startGame() {
    const settings = new GameConfiguration();
    this.board = this.gameService.createEmptyBoard(settings);
    this.gameService.shuffleBoard(this.board);
  }

}
