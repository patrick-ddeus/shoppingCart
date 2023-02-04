import PRODUCT_HANDLER from "../controllers/ProductController.js"
import SHOPPING_CART from "../controllers/CartController.js"

function insertCartEvents(){
    const carts = document.querySelectorAll(".cart")
    carts.forEach(cart => cart.onclick = cartEvent)
}

function cartEvent(event){
    const cartIcon = event.currentTarget
    const productCard = cartIcon.parentElement.parentElement
    const id = productCard.id.split("-")[1]

    const productObject = PRODUCT_HANDLER.getProductById(Number(id))
    SHOPPING_CART.addProduct(productObject)
}


export { insertCartEvents }