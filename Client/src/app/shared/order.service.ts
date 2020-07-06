import { environment } from 'src/environments/environment';
import { OrderItem } from './order-item.model';
import { Injectable } from '@angular/core';
import { Order } from './order.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  formData: Order = {
    OrderID: null,
    OrderNo: Math.floor(100000 + Math.random() * 900000).toString(),
    CustomerID: 0,
    PMethod: '',
    GTotal: 0,
    DeletedOrderItemIDs: ''
  };
  orderItems: OrderItem[] = [];
  constructor(private http: HttpClient) { }

  saveOrUpdateOrder(){
    let body = {
      ...this.formData,
      OrderItems: this.orderItems
    };
    return this.http.post(environment.apiURL + '/Order', body);
  }

  getOrderList(){
    return this.http.get(environment.apiURL + '/Order').toPromise();
  }

  getOrderById(id: number): any{
    return this.http.get(environment.apiURL + '/Order/' + id).toPromise();
  }

  deleteOrder(id){
    return this.http.delete(environment.apiURL + '/Order/' + id).toPromise();
  }
}
