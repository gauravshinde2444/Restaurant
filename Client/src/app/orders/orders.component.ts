import { Router } from '@angular/router';
import { OrderService } from './../shared/order.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styles: [
  ]
})
export class OrdersComponent implements OnInit {
  orderList;
  constructor(private service: OrderService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(){
    this.refreshList();
  }

  openForEdit(orderId: number){
     this.router.navigate(['/order/edit/' + orderId]);
  }

  refreshList(){
    this.service.getOrderList().then(res => this.orderList = res);
  }

  onOrderDelete(id: number){
    if (confirm('Are you sure you want to delete the Order')){
      this.service.deleteOrder(id).then(res => {
        this.refreshList();
        this.toastr.warning('Deleted Successfully', 'Restaurant App');
       });
    }
  }

}
