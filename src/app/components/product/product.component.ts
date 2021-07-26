import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/product.interface';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit {

  @Input() product: Product;
  @Input() selected: boolean;
  
  @Output() delete = new EventEmitter<number>();

  constructor(public productsService: ProductsService) { }

  ngOnInit(): void {
  }

  deleteProduct($event: any) {
    $event.stopPropagation();
    this.delete.next(this.product?.id);
  }
}
