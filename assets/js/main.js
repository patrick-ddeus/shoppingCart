import PRODUCT_HANDLER from "./db/product-database.js"
import SHOPPING_CART from "./db/shopping-cart.js";
import Render from "./content/render.js"
import Router from "./content/routes.js";
import { insertCartEvents } from "./events/on-cart-events.js";

const router = new Router([
    {
        path: "/",
        onEnter: () => {
            PRODUCT_HANDLER.loadProducts()
                .then(() => {
                    const productArea = document.querySelector(".productsArea")
                    productArea.innerHTML = Render.generateProducts()
                    insertCartEvents()
                })
        }
    },
    {
        path: "/index.html",
        onEnter: () => {
            PRODUCT_HANDLER.loadProducts()
                .then(() => {
                    const productArea = document.querySelector(".productsArea")
                    productArea.innerHTML = Render.generateProducts()
                    insertCartEvents()
                })
        }
    },
    {
        path: "/assets/pages/cart.html",
        onEnter: () => {
            SHOPPING_CART.loadProducts()
            const productAreaCart = document.querySelector(".products-list")
            productAreaCart.innerHTML = Render.generateProductsIntoCart()
        }
    }
])

router.start()
