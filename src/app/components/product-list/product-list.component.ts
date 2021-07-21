import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.interface';
import { ProductsService } from 'src/app/services/products.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {

  productList: Product[];

  productsInPage: Product[];  
  currentPageText: string;
  pageCount: number;
  paginationRows = 4;
  currentPage = 0;

  getProductsSubscription: Subscription;
  updateProductsSubscription: Subscription;

  sortBy = 'name';

  constructor(private router: Router, private productsService: ProductsService) { }
  
  ngOnInit(): void {
    this.getProductsSubscription = this.productsService.getProducts$().subscribe(products=>{
      this.productList = products;
      this.onChangeSortBy(this.sortBy);
      this.selectProduct(this.productList[0]);
      this.setCurrentPage();
    });

    this.updateProductsSubscription = this.productsService.productsObservable$.subscribe(products=>{
      this.productList = products;
      this.onChangeSortBy(this.sortBy);
      this.setCurrentPage();
    });
  }

  private setCurrentPage() {
    this.productsInPage = this.productList.slice(this.paginationRows * this.currentPage,
       this.paginationRows * this.currentPage + this.paginationRows);
  }

  nextPage(currentPage: number) {
    this.currentPage = currentPage;
      this.setCurrentPage();
  }

  prevPage(currentPage: number) {
    this.currentPage = currentPage;
      this.setCurrentPage();
  }

  selectProduct(product: Product) {
    this.productsService.selectedProduct = product;
    this.router.navigate([`product-details/${this.productsService.selectedProduct.id}`], );
  }

  addProduct() {
    this.productsService.selectedProduct = null;
    this.router.navigate(['add-product']);
  }

  deleteProduct(id: number) {
    this.productsService.deleteProduct(id);
  }

  onChangeSortBy(sortBy: string) {
    this.sortBy = sortBy;

    switch (sortBy) {
      case 'name':
        this.productList = this.productList.sort((a, b) => <any>a[sortBy].localeCompare(<any>b[sortBy]));        
        break;
    
        case 'date':
          this.productList = this.productList.sort((a, b) => <any>new Date(b.creationDate) - <any>new Date(a.creationDate));
        break;
      default:
        console.log('no such sort option');        
        break;
    }
  }

  ngOnDestroy(): void {
    this.getProductsSubscription?.unsubscribe();
    this.updateProductsSubscription?.unsubscribe();
  }
}
