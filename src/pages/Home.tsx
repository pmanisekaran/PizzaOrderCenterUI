import { useEffect, useState } from "react"
import { Table } from "react-bootstrap";
import { formatCurrency } from "../utilities/formatCurrency";

export function Home() {
    const [pizzaOrderList, setPizzeriaList] = useState<IPizzaOrder[]>([]);
  
    useEffect(() => {
        const fetchDataPizzaOrderList = async () => {
            const response = await fetch(`https://localhost:7033/api/PizzaOrder`);
            const newData = await response.json();
            setPizzeriaList(newData);
        };
        fetchDataPizzaOrderList();

    }, [])

    interface OrderDetailsTableProps {
        pizzaOrder: IPizzaOrder;
      }
    const OrderDetailsTable : React.FC<OrderDetailsTableProps> = ({ pizzaOrder }) => {
        const [showDetails, setShowDetails] = useState(false);
      
        return (
          <>
            <tr onClick={() => setShowDetails(!showDetails)}>
                <td>{pizzaOrder.pizzaOrderId}</td>
              <td>{pizzaOrder.customerName}</td>
              <td>{formatCurrency(pizzaOrder.orderTotal)}</td>
            </tr>
            {showDetails && (
              <tr>
                <td colSpan={2}>
                  <Table>
                    <thead>
                      <tr>
                        <th>Pizza ID</th>
                        <th>Quantity</th>
                        <th>Line Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pizzaOrder.pizzaOrderItems.map((item) => (
                        <tr key={item.pizzaOrderItemId}>
                          <td>{item.pizzaId}</td>
                          <td>{item.qty}</td>
                          <td> {formatCurrency(item.lineTotal)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </td>
              </tr>
            )}
          </>
        );
      };
      interface OrdersTableProps {
        orders: IPizzaOrder[];
      }
      
      const OrdersTable :  React.FC<OrdersTableProps> = ({ orders  }) => {
        return (
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <td> Order Id</td>
                <th>Customer Name</th>
                <th>Order Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <OrderDetailsTable key={order.pizzaOrderId} pizzaOrder={order} />
              ))}
            </tbody>
          </Table>
        );
      };
    return (
        <>
            <h1> Order List</h1>
            <OrdersTable orders={pizzaOrderList} />
        </>
    )
}