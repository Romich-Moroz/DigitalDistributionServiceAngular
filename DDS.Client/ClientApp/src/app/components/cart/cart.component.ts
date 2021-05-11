import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from '../../models/cart';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  carts: Cart[];

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.dataService.storeService.getCart().subscribe(data => this.carts = data);
  }

  onDeleteCart(cartId: number) {
    this.dataService.storeService.deleteFromCart(cartId).subscribe(() =>
    {
      this.carts.splice(this.carts.findIndex(c => c.cartId == cartId), 1);
    })
  }
  onCheckout() {
    this.dataService.storeService.checkout().subscribe(() => {
      this.router.navigate(["/library"]);
    });
  }

}
