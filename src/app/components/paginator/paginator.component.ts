import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { PaginationService } from './pagination.service';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginatorComponent implements OnInit, OnChanges {

  @Input() totalRecords: number;
  @Input() rows: number;

  @Output() onPageChange = new EventEmitter<number>();

  currentPage = 0;
  pageCount: number;
  paginationText: string;

  constructor(private paginationService: PaginationService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.totalRecords > 0 && this.rows > 0) {
      this.setPagination();
    }
  }
  
  ngOnInit(): void {    
  }
  
  setPagination() {
    this.pageCount = this.paginationService.getPageCount(this.totalRecords, this.rows);
    this.currentPage = this.paginationService.checkCurrentPage(this.currentPage, this.pageCount);
    this.setPaginationText();    
  }

  next() {
    if(this.currentPage < this.pageCount - 1) {
      this.currentPage++;
      this.setPaginationText();
      this.onPageChange.next(this.currentPage);
    }
  }

  prev() {
    if(this.currentPage > 0) {
      this.currentPage--;
      this.setPaginationText();
      this.onPageChange.next(this.currentPage);
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
