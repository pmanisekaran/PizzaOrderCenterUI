interface IPizzerOrder
{
    pizzaOrderId?: number;
    customerName: string;
    orderTotal: number;
    pizzaOrderItems:IPizzaOrderItem[];
  }