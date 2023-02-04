import PRODUCT_HANDLER from "../controllers/ProductController.js"
import SHOPPING_CART from "../controllers/CartController.js";
import Render from "../view/render.js"
import { insertCartEvents } from "../events/on-cart-events.js";

class Router {
    constructor(routes){
        this.routes = routes
    }

    start(){
        const currentPath = location.pathname
        const findRoute = this.routes.find(page => page.path === currentPath || page.pathOptional == currentPath)
        
        if(findRoute){
            findRoute.onEnter()
        }
    }

    get(path){
        const findRoute = this.routes.find(page => page.path === path)
        if(findRoute && location.pathname !== path){
            window.location.pathname = `${path}`
            findRoute.onEnter()
        }
    }
}

const router = new Router([
    {
        path: "/",
        pathOptional:"/index.html",
        onEnter: () => {
            SHOPPING_CART.loadProducts()
            PRODUCT_HANDLER.loadProducts()
                .then(() => {
                    const productArea = document.querySelector(".productsArea")
                    productArea.innerHTML = Render.generateProducts()
                    insertCartEvents()
                })
                .catch(alert)
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

export default router