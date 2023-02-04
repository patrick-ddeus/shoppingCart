import PRODUCT_HANDLER from "./db/product-database.js"
import SHOPPING_CART from "./db/shopping-cart.js";
import Render from "./content/render.js"
import { insertCartEvents } from "./events/on-cart-events.js";

document.body.onload = () => {
    PRODUCT_HANDLER.loadProducts()
        .then(() => {
            if (window.location.href === 'http://127.0.0.1:59292/index.html' || window.location.href === 'http://127.0.0.1:59292/') {
                const productArea = document.querySelector(".productsArea")
                productArea.innerHTML = Render.generateProducts()
                insertCartEvents()
            }else{
                SHOPPING_CART.loadProducts()
                const productAreaCart = document.querySelector(".products-list")
                productAreaCart.innerHTML = Render.generateProductsIntoCart()
            }
        })
}
