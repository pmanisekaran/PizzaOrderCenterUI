
//import pizzeriaList from "../data/pizzeriaList.json"
import { useEffect, useState } from "react"
import { PizzaItem } from "../components/PizzaItem"
//import pizzaList from "../data/pizzaList.json"
import { Button, Col, Row, Table } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css"


export function Pizza() {
    const [pizzaList, setPizzaList] = useState<IPizza[]>([]);
    const [orderItemList, setOrderItemList] = useState<IPizzaOrderItem[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://localhost:7033/api/PizzeriaMenu`);
            const newData = await response.json();
            setPizzaList(newData);
            //setOrderItemList(newData);

        };
        fetchData();
    }, [])
    const addToCurrentOrder = (itemTobeAdded: IPizza) => {
        // // Add a new item to the list
        const newItem: IPizzaOrderItem = {
            pizzaId: itemTobeAdded.pizzaId,
            pizzaName: itemTobeAdded.pizzaName,
            pizzeriaId: itemTobeAdded.pizzeriaId,
            pizzaPrice: itemTobeAdded.pizzaPrice,
            pizzaQty: 1

        };
        const existingTem = orderItemList.find(x => x.pizzaId == itemTobeAdded.pizzaId)
        if (existingTem == null) {
            setOrderItemList(prevList => [...prevList, newItem]);

        }
        else {
            const existingItemIndex = orderItemList.findIndex(item => item.pizzaId === itemTobeAdded.pizzaId);
            existingTem.pizzaQty += 1;

            const updatedList = [... orderItemList];
            updatedList[existingItemIndex] = {
                ...updatedList[existingItemIndex],
                pizzaQty: existingTem.pizzaQty+1
            };


            // Update the list using the previous state
            setOrderItemList(prevList => [...prevList ]);
            //setOrderItemList(orderItemList);
            console.log(existingTem);
        }



    };

    const removeFromCurrentOrder = (pizzaIdTobeRemoved: number) => {

        const indexToRemove = orderItemList.findIndex(item => item.pizzaId === pizzaIdTobeRemoved);

      if (indexToRemove !== -1) {
        // If an item with the same ID exists, remove it and add the new item
        const updatedList = [...orderItemList];
        updatedList.splice(indexToRemove, 1); // Remove the existing item
        
        setOrderItemList(updatedList); // Update the state with the modified list
      }
    }


    return (
        <>
            <div>
                <Row md={2} xs={1} lg={3} className="g-3">
                    {
                        pizzaList.map((item: IPizza) => (
                            <Col key={item.pizzaId} onClick={() => addToCurrentOrder(item)}>
                                <PizzaItem {...item} />
                            </Col>
                        ))

                    }
                </Row>
            </div>

            <div style={{ margin: "10rem" }} >
                <h2 >Current Order</h2>
                <Table striped bordered hover size="sm">
                    <thead>
                        <th>
                            Pizza Name
                        </th>
                        <th>
                            Pizza Price
                        </th>
                        <th>
                            Qty
                        </th>
                        <th>
                            Remove
                        </th>

                    </thead>
                    <tbody>
                        {


                            orderItemList.map((item: IPizzaOrderItem) => (
                                <tr key={item.pizzaId}>
                                    <td>
                                        {item.pizzaName}
                                    </td>
                                    <td>
                                        {item.pizzaPrice}
                                    </td>
                                    <td>
                                        {item.pizzaQty}
                                    </td>
                                    <td>
                                        <Button onClick={() => removeFromCurrentOrder(item.pizzaId)}> Remove</Button>
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