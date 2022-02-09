import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  difficultyNumber = 3;

  changeDifficulty(difficulty: number) {
    this.difficultyNumber = difficulty;
  }	  
}
