import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit {

  cells = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

  constructor() { }

  ngOnInit(): void {
  }

}
