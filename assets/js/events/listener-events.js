import Render from "../content/render.js";
import { insertCartEvents } from "./on-cart-events.js";

class StartEvents{
    constructor(){
        this.productArea = document.querySelector(".productsArea")
        if (window.location.href === 'http://localhost:65078/index.html') {
            Render.generateProducts()
            .then(resposta => this.productArea.innerHTML = resposta)
            .then(insertCartEvents)
        } 
    }

    listenerEvents(){

    }

    

}


export default StartEvents