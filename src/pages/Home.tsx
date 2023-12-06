import { useEffect, useState } from "react"
import { Table } from "react-bootstrap";

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
    return (
        <>
            <h1> Order List</h1>
            <div>
                <Table striped bordered hover size="sm">
                    <thead>
                        <th>
                            Order Id
                        </th>
                        <th>
                            Customer Name
                        </th>
                        <th>
                            Order Total
                        </th>

                    </thead>
                    <tbody>
                        {


                            pizzaOrderList.map((item: IPizzaOrder) => (
                                <tr key={item.pizzaOrderId}>
                                    <td>
                                        {item.pizzaOrderId}
                                    </td>
                                    <td>
                                        {item.customerName}
                                    </td>
                                    <td>
                                        {item.orderTotal}
                                    </td>
                                </tr>
                            ))

                        }
                    </tbody>
                </Table>
            </div>
        </>
    )
}