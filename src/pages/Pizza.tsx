
//import pizzeriaList from "../data/pizzeriaList.json"
import { useEffect, useState } from "react"
import { PizzaItem } from "../components/PizzaItem"
//import pizzaList from "../data/pizzaList.json"
import { Button, Col, Row, Table } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css"
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../utilities/formatCurrency";


export function Pizza() {
    const navigate = useNavigate();
    const [orderTotal, setOrderTotal] = useState<number>(0)
    // const [pizzaList, setPizzaList] = useState<IPizza[]>([]);
    const [pizzeriaList, setPizzeriaList] = useState<IPizzeria[]>([]);
    const [orderItemList, setOrderItemList] = useState<IPizzaOrderCartItem[]>([]);
    useEffect(() => {
        const fetchDataPizzeria = async () => {
            const response = await fetch(`https://localhost:7033/api/Pizzeria`);
            const newData = await response.json();
            setPizzeriaList(newData);
        };
        //fetchDataPizzaMenu();
        fetchDataPizzeria();

    }, [])
    const addToCurrentOrder = (itemTobeAdded: IPizza) => {
        // // Add a new item to the list
        const newItem: IPizzaOrderCartItem = {
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

            const updatedList = [...orderItemList];
            updatedList[existingItemIndex] = {
                ...updatedList[existingItemIndex],
                pizzaQty: existingTem.pizzaQty + 1
            };


            // Update the list using the previous state
            setOrderItemList(prevList => [...prevList]);
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
    const placeOrder = () => {

        const pizzaOrder: IPizzaOrder = {
            
            customerName: 'John Doe',
            orderTotal: 0,
            pizzaOrderItems: []
          };
        
        orderItemList.forEach(item => {
            const pizzaOrderItem: IPizzaOrderItem = {
                pizzaId: 1,
                qty: 1,
                lineTotal: 10.99,
                pizzaOrderId: 0,
                pizzaOrderItemToppings :[]
    
            
                
              };
            pizzaOrderItem.pizzaId = item.pizzaId;
            pizzaOrderItem.qty = item.pizzaQty;
            pizzaOrder.pizzaOrderItems.push(pizzaOrderItem);
            
        });        
        
        fetch('https://localhost:7033/api/PizzaOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pizzaOrder)
        })
            .then(response => response.json())
            .then(returnedData => {
                // Accessing the returned object and retrieving the orderTotal property
                const returnedOrderTotal = returnedData.orderTotal;
                console.log('Returned Order Total:', returnedOrderTotal);
                setOrderTotal(returnedOrderTotal);
                // Perform actions with the returned order total here
            })
            .catch(error => {
                console.error('Error:', error);
                // Handle errors if any
            });



    }

   
    const clearOrder = () => {

        // If an item with the same ID exists, remove it and add the new item
        const updatedList = [...orderItemList];
        updatedList.splice(0, orderItemList.length); // Remove the existing item

        setOrderItemList(updatedList); // Update the state with the modified list
        setOrderTotal(0);



    }


    return (
        <>
            <Row>
                <Col md={8}>
                    <div>
                        {
                            pizzeriaList.map((pizzeria: IPizzeria) => (



                                < div style={{ margin: "3rem" }}>
                                    <h2 color="blue">{pizzeria.location}</h2>
                                    <Row md={2} xs={1} lg={3} className="g-3">
                                        {
                                            pizzeria.pizzas.map((item: IPizza) => (
                                                <Col key={item.pizzaId} onClick={() => addToCurrentOrder(item)}>
                                                    <PizzaItem {...item} />
                                                </Col>
                                            ))

                                        }
                                    </Row>
                                </div>
                            ))
                        }
                    </div >
                </Col>
                <Col md={4} style={{ position: 'sticky', top: 0 }}>
                    <div style={{ margin: "1rem", position: 'sticky', top: 0 }}  >
                        <div className="d-flex justify-content-between align-items-baseline mb-4">
                            <span className="fs-5">Current Order</span>
                            <span className="ms-2 text-muted"><Button disabled={orderTotal !== 0} onClick={() => placeOrder()}>Place Order</Button></span>
                            <span className="ms-2 text-muted"><Button onClick={() => clearOrder()}>Clear Order</Button></span>
                        </div>
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


                                    orderItemList.map((item: IPizzaOrderCartItem) => (
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

                                                <Button className="w-100" onClick={() => removeFromCurrentOrder(item.pizzaId)}> Remove</Button>

                                            </td>
                                        </tr>
                                    ))

                                }
                            </tbody>
                        </Table>
                        <div className="d-flex justify-content-between align-items-baseline mb-4">
                            <span className="fs-4" style={{ flexGrow: 1 }}>Order Total</span>
                            <span className="fs-4 text-muted">{formatCurrency(orderTotal)}</span>
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    )



}