 
//import pizzeriaList from "../data/pizzeriaList.json"
import { useEffect, useState } from "react"
import { PizzaItem } from "../components/PizzaItem"
//import pizzaList from "../data/pizzaList.json"
import { Col, Row } from 'react-bootstrap'
 

export function Pizza()
{
    const[pizzaList, setPizzaList] = useState([])
    useEffect(() =>{
        const fetchData = async ()=>{
            const response = await fetch(`https://localhost:7033/api/PizzeriaMenu`);
            const newData = await response.json();
            setPizzaList(newData);
             console.log(newData);
        };
        fetchData();
    }, [])

    
    return (

        
        <Row md={2} xs={1} lg ={3} className="g-3">
            {
                pizzaList.map((item:IPizza) => (
                    <Col key ={item.pizzaId} >
                         <PizzaItem {... item}/> 
                    </Col>
                ))
                
            }
        </Row>
        
    )

    

}