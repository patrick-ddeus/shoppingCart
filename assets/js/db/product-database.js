import { geraId, SYMBOLS } from "../utils/utils.js"
import ProductBuilder from "./product-builder.js"

class ProductDatabase {
    constructor() {
        this[SYMBOLS.PRODUCTS_LIST] = []
    }

    addProduct(productObj) {
        if(this.getProductById(productObj.getId())) return

        this[SYMBOLS.PRODUCTS_LIST].push(productObj)
        this.saveProducts()
    }

    removeProduct(id) {
        this[SYMBOLS.PRODUCTS_LIST].forEach((product, indice) =>{
            if(product.getId() === id){
                this[SYMBOLS.PRODUCTS_LIST].splice(indice, 1)
            }
        })
        this.saveProducts()
    }

    getProducts(){
        return [...this[SYMBOLS.PRODUCTS_LIST]]
    }

    getProductById(id){
        const found = this[SYMBOLS.PRODUCTS_LIST].find(product => product.getId() === id)
        if(!found) return
        return found
    }

    saveProducts() {
        localStorage.setItem("database", JSON.stringify(this[SYMBOLS.PRODUCTS_LIST]))
        localStorage.setItem("id", JSON.stringify(geraId._id))
    }

    loadProducts() {
        const database = JSON.parse(localStorage.getItem("database"))
        const id = JSON.parse(localStorage.getItem("id"))

        if (!database || !id) return
        this[SYMBOLS.PRODUCTS_LIST] = database
        geraId._id = id
    }
}

const PRODUCT_HANDLER = new ProductDatabase()

PRODUCT_HANDLER.addProduct(new ProductBuilder("Gray Long-Sleeved Shirt", 98, "adidas", "assets/img/greyshirt.png"))
PRODUCT_HANDLER.addProduct(new ProductBuilder("Clever Land Orange T-Shirt", 90, "nike", "assets/img/orange-shirt.png"))
PRODUCT_HANDLER.addProduct(new ProductBuilder("Over Under Pink T-Shirt", 110, "adidas", "assets/img/pink.png"))
PRODUCT_HANDLER.addProduct(new ProductBuilder("Black Isle T-shirt", 60, "oakley", "assets/img/red-shirt.png"))
PRODUCT_HANDLER.addProduct(new ProductBuilder("Long-Sleeved Dress Shirt", 40, "oakley", "assets/img/roupa3.jpg"))
PRODUCT_HANDLER.addProduct(new ProductBuilder("Cartoon Astronaut T-Shirts", 90, "nike", "assets/img/zadig.png"))
PRODUCT_HANDLER.addProduct(new ProductBuilder("Gray Long-Sleeved Shirt", 110, "adidas", "assets/img/greyshirt.png"))
PRODUCT_HANDLER.addProduct(new ProductBuilder("Over Under Pink T-Shirt", 78, "adidas", "assets/img/pink.png"))

export default PRODUCT_HANDLER