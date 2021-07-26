import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  
  constructor() { }

  getPageCount(totalRecords: number, rows: number): number {
    return Math.ceil(totalRecords / rows);
  }

  checkCurrentPage(currentPage: number, pageCount: number) {
    if (currentPage + 1 > pageCount) {
      currentPage = pageCount - 1;
    }
    return currentPage;
  }
}
