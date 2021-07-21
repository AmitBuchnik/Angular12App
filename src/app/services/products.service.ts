import { Injectable } from '@angular/core';

import { Observable, of, Subject } from 'rxjs';

import { Product } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  selectedProduct: Product | null;
  
  private products: Product[] = [{
    id: 1,
    name: 'Product 8',
    description: 'Product 8 description',
    price: 100,
    creationDate: new Date(2021, 2)
  },
  {
    id: 2,
    name: 'Product 2',
    description: 'Product 2 description',
    price: 100,
    creationDate: new Date(2020, 1)
  },
  {
    id: 3,
    name: 'Product 3',
    description: 'Product 3 description',
    price: 100,
    creationDate: new Date(2021, 6)
  },
  {
    id: 4,
    name: 'Product 4',
    description: 'Product 4 description',
    price: 100,
    creationDate: new Date(2021, 2)
  },
  {
    id: 5,
    name: 'Product 5',
    description: 'Product 5 description',
    price: 100,
    creationDate: new Date()
  },
  {
    id: 6,
    name: 'Product 6',
    description: 'Product 6 description',
    price: 100,
    creationDate: new Date()
  },
  {
    id: 7,
    name: 'Product 7',
    description: 'Product 7 description',
    price: 100,
    creationDate: new Date()
  },
  {
    id: 8,
    name: 'Product 8',
    description: 'Product 8 description',
    price: 100,
    creationDate: new Date()
  },
  {
    id: 9,
    name: 'Product 9',
    description: 'Product 9 description',
    price: 100,
    creationDate: new Date()
  },
  {
    id: 10,
    name: 'Product 10',
    description: 'Product 10 description',
    price: 100,
    creationDate: new Date()
  },
  {
    id: 11,
    name: 'Product 11',
    description: 'Product 11 description',
    price: 100,
    creationDate: new Date()
  }
  ];

  private productsChanged = new Subject<Product[]>();
  productsObservable$ = this.productsChanged.asObservable();

  constructor() { }

  getProducts$(): Observable<Product[]> {
    return of(this.products);
  }

  getProductById$(id: number): Observable<Product> {
    return of(this.products.find(p=>p.id===id) as Product);
  }

  deleteProduct(id: number) {
    const index = this.products.findIndex(p=>p.id===id);
    this.products.splice(index, 1);
    this.productsChanged.next(this.products.slice(0));
  }
  
  addProduct(product: Product) {
    const ids = this.products.map(p=>p.id);
    
    let maxId = ids?.length > 0 ? Math.max(...ids) : 1;
    product.id = ++maxId;
    product.creationDate = new Date();
    this.selectedProduct = product;

    this.products.push(product);
    this.productsChanged.next(this.products.slice(0));
  }

  updateProduct(product: Product) {
    const index = this.products.findIndex(p=>p.id === product.id);
    if(index != -1) {
      this.products[index] = product;
      this.productsChanged.next(this.products.slice(0));
    } 
  }
}
