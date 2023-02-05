import ProductController from "../controllers/ProductController.js"
import CartController from "../controllers/CartController.js";
import Render from "../view/render.js"
import StartEvents from "../events/start-events.js";
import { updateTotalInHTML } from "../utils/utils.js";

class Router {
    constructor(routes) {
        this.routes = routes
    }

    start() {
        const currentPath = location.pathname
        const findRoute = this.routes.find(page => page.path === currentPath || page.pathOptional == currentPath)

        if (findRoute) {
            findRoute.onEnter()
        }
    }

    get(path) {
        const findRoute = this.routes.find(page => page.path === path)
        if (findRoute && location.pathname !== path) {
            window.location.pathname = `${path}`
            findRoute.onEnter()
        }
    }
}

const router = new Router([
    {
        path: "/frontendJSCart/",
        pathOptional: "/frontendJSCart/index.html",
        onEnter: () => {
            ProductController.loadProducts()
            CartController.loadProducts(() => {
                const productArea = document.querySelector(".productsArea")
                productArea.innerHTML = Render.generateProducts()
                StartEvents.onSelectProduct()
            })
        }
    },
    {
        path: "/frontendJSCart/assets/pages/cart.html",
        onEnter: () => {
            CartController.loadProducts((produtos) => {
                const productAreaCart = document.querySelector(".products-list")
                productAreaCart.innerHTML += Render.generateProductsIntoCart()
                StartEvents.onShoppingCartPage(produtos)
                CartController.calculateTotalFromCart(updateTotalInHTML)
            })
        }
    }
])

export default router
