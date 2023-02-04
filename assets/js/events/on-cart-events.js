import ProductController from "../controllers/ProductController.js"
import CartController from "../controllers/CartController.js"

function insertCartEvents(){
    const carts = document.querySelectorAll(".cart")
    carts.forEach(cart => cart.onclick = cartEvent)
}

function cartEvent(event){
    const cartIcon = event.currentTarget
    const productCard = cartIcon.parentElement.parentElement
    const id = productCard.id.split("-")[1]

    const productObject = ProductController.getProductById(Number(id))
    CartController.addProductToCart(productObject)
}


export { insertCartEvents }