import ProductController from "../controllers/ProductController.js"
import CartController from "../controllers/CartController.js";
import Render from "../view/render.js"
import StartEvents from "../events/start-events.js";

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
        path: "/",
        pathOptional: "/index.html",
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
        path: "/assets/pages/cart.html",
        onEnter: () => {
            CartController.loadProducts(() => {
                const productAreaCart = document.querySelector(".products-list")
                productAreaCart.innerHTML = Render.generateProductsIntoCart()
            })
        }
    }
])

export default router