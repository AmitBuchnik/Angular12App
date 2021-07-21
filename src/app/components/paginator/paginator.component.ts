import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit, OnChanges {

  @Input() totalRecords: number;
  @Input() rows: number;

  @Output() nextPage = new EventEmitter<number>();
  @Output() prevPage = new EventEmitter<number>();

  currentPage = 0;
  pageCount: number;
  paginationText: string;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.totalRecords > 0 && this.rows > 0) {
      this.pageCount = Math.ceil(this.totalRecords / this.rows);
this.setPaginationText();     
    }
  }

  ngOnInit(): void {    
  }

  next() {
    if(this.currentPage < this.pageCount - 1) {
      this.currentPage++;
      this.setPaginationText();
      this.nextPage.next(this.currentPage);
    }
  }

  prev() {
    if(this.currentPage > 0) {
      this.currentPage--;
      this.setPaginationText();
      this.prevPage.next(this.currentPage);
    }
  }
  
  setPaginationText() {
     if (this.pageCount > 1) {
        this.paginationText = `${this.currentPage + 1} of ${this.pageCount}`;
      } else {
        this.paginationText = `${this.currentPage + 1}`;
      }
  }
}
