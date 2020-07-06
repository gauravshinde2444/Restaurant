import { OrderService } from './../../shared/order.service';
import { ItemService } from './../../shared/item.service';
import { OrderItem } from './../../shared/order-item.model';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Item } from 'src/app/shared/item.model';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styles: [
  ]
})
export class OrderItemsComponent implements OnInit {

  formData: OrderItem;
  itemList: Item[];
  isValid: boolean;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<OrderItemsComponent>,
    private itemService: ItemService,
    private orderService: OrderService
  ) { }

  ngOnInit(){
    this.itemService.getItemList().then(res => this.itemList = res as Item[]);
    if (this.data.orderItemIndex == null){
      this.formData = {
        OrderItemID: null,
        OrderID: this.data.OrderID,
        ItemID: 0,
        ItemName: '',
        Price: 0,
        Quantity: 0,
        Total: 0
      };
    }
    else{
      this.formData = Object.assign({}, this.orderService.orderItems[this.data.orderItemIndex]);
    }
  }

  updatePrice(ctrl){
    if (ctrl.currentTarget.selectedIndex === 0){
      this.formData.Price = 0;
      this.formData.ItemName = '';
    }
    else{
      this.formData.Price = this.itemList[ctrl.currentTarget.selectedIndex - 1].Price;
      this.formData.ItemName = this.itemList[ctrl.currentTarget.selectedIndex - 1].Name;
    }
    this.updateTotal();
  }

  updateTotal(){
    this.formData.Total = parseFloat((this.formData.Price * this.formData.Quantity).toFixed(2));
  }

  onSubmit(form: NgForm){
     if (this.validateForm()){
       if (this.data.orderItemIndex == null){
        this.orderService.orderItems.push(form.value);
       }
       else{
        this.orderService.orderItems[this.data.orderItemIndex] = form.value;
       }
       this.dialogRef.close();
     }
  }

  validateForm() {
    this.isValid = true;
    if (this.formData.ItemID === 0){
      this.isValid = false;
    }
    else if (this.formData.Quantity === 0){
        this.isValid = false;
    }
    return this.isValid;
  }

}
