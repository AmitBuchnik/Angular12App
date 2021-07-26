import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.interface';
import { ProductsService } from 'src/app/services/products.service';
import { PaginatorComponent } from '../paginator/paginator.component';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit, OnDestroy {

  @ViewChild('paginator', { static: true }) paginator: PaginatorComponent;
  
  productList: Product[];

  productsInPage: Product[];
  currentPageText: string;
  paginationRows = 4;
  currentPage = 0;

  getProductsSubscription: Subscription;
  updateProductsSubscription: Subscription;

  sortBy = 'name';

  constructor(private router: Router, private productsService: ProductsService,
    private cdr: ChangeDetectorRef) { }
  
  ngOnInit(): void {
    this.initProductList();
    this.listenToProductsChanged();
  }

  initProductList() {    
    this.getProductsSubscription = this.productsService.getProducts$().subscribe(products => {
      this.setProducts(products);
      this.selectProduct(this.productList[0]);
      this.setCurrentPageData(0);
    });
  }
  
  listenToProductsChanged() {
    this.updateProductsSubscription = this.productsService.productsChangedObservable$.subscribe(products => {
      this.setProducts(products);
      this.setCurrentPageData(this.currentPage);
    });
  }

  private setProducts(products: Product[]) {
    this.productList = products;
    this.onChangeSortBy(this.sortBy);
  }

  onPageChange(currentPage: number) {
    this.setCurrentPageData(currentPage);
  }

  private setCurrentPageData(currentPage: number) {
    this.currentPage = currentPage;
    this.productsInPage = this.productsService.getProductsInPage(currentPage, this.paginationRows);    
    this.cdr.detectChanges();
  }

  selectProduct(product: Product) {
    this.productsService.selectedProduct = product;
    this.router.navigate([`product-details/${this.productsService.selectedProduct.id}`],);
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
    this.productList = this.productsService.sortProducts(sortBy, this.productList);
  }

  ngOnDestroy(): void {
    this.getProductsSubscription?.unsubscribe();
    this.updateProductsSubscription?.unsubscribe();
  }
}
