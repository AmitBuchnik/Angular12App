import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.interface';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsComponent implements OnInit, OnDestroy {

  product: Product;
  reactiveForm: FormGroup;

  activatedRouteSubscription: Subscription;
  getProductsSubscription: Subscription;
  productsChangedSubscription: Subscription;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute, 
    private productsService: ProductsService,
    private fb: FormBuilder) { }
  

  ngOnInit(): void {
      this.setForm();
      this.listenToRouteParams();
      this.listenToProductsChanged();
  }

  listenToProductsChanged() {    
    this.productsChangedSubscription = this.productsService.productsChangedObservable$.subscribe(products => {
      // current product was deleted
      if(this.product && !products?.find(p => p.id === this.product.id))    {
        this.router.navigate(['']);
      }  
    });
  }

  listenToRouteParams() {
    this.activatedRouteSubscription = this.activatedRoute.params.subscribe(params=>{
      const id = params?.id;
      if(id) {
        this.getProductsSubscription = this.productsService.getProductById$(+id).subscribe(product=>{
          this.product = product;

          this.reactiveForm.patchValue({
            name: this.product?.name,
            description: this.product?.description,
            price: this.product?.price,
          });
        });
      }      
    });
  }

  setForm() {
    const controlConfig = {
      name: ['', [
        Validators.required,
        Validators.maxLength(30)
      ]],
      description: ['', [
        Validators.maxLength(200)
      ]],
      price: ['', [
        Validators.required,
        Validators.min(1)
      ]],
    }

    this.reactiveForm = this.fb.group(controlConfig, {
      validators: []
    });
  }

  ngOnDestroy(): void {
    this.activatedRouteSubscription?.unsubscribe();
    this.getProductsSubscription?.unsubscribe();
    this.productsChangedSubscription?.unsubscribe();
  }

  onSubmit() {
    if(this.product) {
      this.product = { ...this.product, ...this.reactiveForm.value};
      this.productsService.updateProduct(this.product);
    } else {      
      this.productsService.addProduct({...this.reactiveForm.value});
    }
  }
}
