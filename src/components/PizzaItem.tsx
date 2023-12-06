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
        <Card.Img src="./public/pizza.jpg"  height="200px"
        style={{objectFit: "cover"}}
        ></Card.Img>
        <Card.Body className="d=flex flex-column">
            <Card.Title className="d-flex justify-content-space-between align-items-baseline mb-4">
                <span className="fs-6"style={{ flexGrow: 1 }}>{pizzaName}</span>
                <span className="fs-6 text-muted">{formatCurrency(pizzaPrice)}</span>
            </Card.Title>

        </Card.Body>
        
        </Card>
    )
}