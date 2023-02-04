import { geraId, SYMBOLS } from "../utils/utils.js"
import ProductBuilder from "./product-builder.js"

class ProductDatabase {
    constructor() {
        this[SYMBOLS.PRODUCTS_LIST] = []
    }

    addProduct(productObj) {
        if (this.getProductById(productObj.getId())) return

        this[SYMBOLS.PRODUCTS_LIST].push(productObj)
        this.saveProducts()
    }

    removeProduct(id) {
        this[SYMBOLS.PRODUCTS_LIST].forEach((product, indice) => {
            if (product.getId() === id) {
                this[SYMBOLS.PRODUCTS_LIST].splice(indice, 1)
                this.saveProducts()
                return
            }
        })
    }

    getProducts() {
        return [...this[SYMBOLS.PRODUCTS_LIST]]
    }

    getProductById(id) {
        const found = this[SYMBOLS.PRODUCTS_LIST].find(product => product.getId() === id)
        if (!found) return
        return found
    }

    saveProducts() {
        const productsForSave = this[SYMBOLS.PRODUCTS_LIST].map(product => {
            return {
                id: product.getId(),
                name: product.getName(),
                price: product.getPrice(),
                brand: product.getBrand(),
                img: product.getImg()
            }
        })

        localStorage.setItem("database", JSON.stringify(productsForSave))
        localStorage.setItem("id", JSON.stringify(geraId._id))
    }

    loadProducts() {
        const promise = new Promise((resolve) => {
            const database = JSON.parse(localStorage.getItem("database"))
            const id = JSON.parse(localStorage.getItem("id"))

            // Cria novos objetos a partir da classe ProductBuilder para inserir na página novamente
            const newDatabase = database.map(({ name, price, brand, img }) => {
                return new ProductBuilder(name, price, brand, img)
            })

            this[SYMBOLS.PRODUCTS_LIST] = newDatabase
            geraId._id = id
            resolve("Ok")
        })
        return promise
    }
}

const PRODUCT_HANDLER = new ProductDatabase()

export default PRODUCT_HANDLER