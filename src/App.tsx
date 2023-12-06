import {Routes, Route} from "react-router-dom"
import { Container } from "react-bootstrap"
import { Home } from "./pages/Home"
import { Pizza } from "./pages/Pizza"
import { Admin } from "./pages/Admin"
import { Navbar} from "./components/Navbar"
 
 

function App() {

  return (
<>
    <Navbar></Navbar>
    <Container className="mb-4">
      <Routes>
        <Route path="/" element ={<Home/>}></Route>
        <Route path="/Pizza" element ={<Pizza/>}></Route>
        <Route path="/Admin" element ={<Admin/>}></Route>
      </Routes>
  
     </Container>
</>
  )
}

export default App
