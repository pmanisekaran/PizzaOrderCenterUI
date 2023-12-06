interface IPizzaOrder
{
    pizzaOrderId?: number;
    customerName: string;
    orderTotal: number;
    pizzaOrderItems:IPizzaOrderItem[];
  }