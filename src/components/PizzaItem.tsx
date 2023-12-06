import { Card } from "react-bootstrap"
import { formatCurrency } from "../utilities/formatCurrency"

type PizzItemProps ={

    pizzaId :number
    pizzaName : string
    pizzaPrice : number
    pizzeriaId :number
}

export function PizzaItem( {pizzaId , pizzaName , pizzaPrice, pizzeriaId }: PizzItemProps )
{
    return (<Card  >
        <Card.Img src="./public/pizza.jpg"  height="100px" width="100px"
        style={{objectFit: "cover"}}
        ></Card.Img>
        <Card.Body className="d=flex flex-column">
            <Card.Title className="d-flex justify-content-space-between align-items-baseline mb-4">
                <span className="fs-2">{pizzeriaId} {pizzaId} {pizzaName}</span>
                <span className="fs-2 text-muted">{formatCurrency(pizzaPrice)}</span>
            </Card.Title>

        </Card.Body>
        
        </Card>
    )
}