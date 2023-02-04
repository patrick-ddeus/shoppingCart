import { insertCartEvents } from "./on-cart-events.js"

class StartEvents{
    onSelectProduct(){
        insertCartEvents()
    }

    onShoppingCartPage(){
        const removeBtn = document.querySelector(".remove-btn")
        
        removeBtn.addEventListener("click", e=>{
            
        })
    }
}


export default new StartEvents