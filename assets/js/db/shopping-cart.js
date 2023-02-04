class ShoppingCart {
    constructor() {
        this.produtos = []
    }

    addProductToCart = (productObject) => {
        this.removeProductFromCart(productObject.getId())

        this.produtos.push(productObject)
        console.log(this.produtos)
    }

    removeProductFromCart = (id) => {
        this.produtos.forEach((product, indice) => {
            if (product.getId() === id) {
                this.produtos.splice(indice, 1)
                return
            }
        })
    }

    getProductsFromCart = () =>{
        return [...this.produtos]
    }
}

const SHOPPING_CART = new ShoppingCart

export default SHOPPING_CART