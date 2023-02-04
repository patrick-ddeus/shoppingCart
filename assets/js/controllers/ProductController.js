import { geraId, SYMBOLS } from "../utils/utils.js"
import ProductBuilder from "../model/ProductModel.js"

class ProductController {
    constructor() {
        this[SYMBOLS.PRODUCTS_LIST] = []
    }

    addProduct(productObj) {
        // Verifica se o produto existe, se caso existir para a função
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
        const promise = new Promise((resolve, reject) => {
            const database = JSON.parse(localStorage.getItem("database"))
            const id = JSON.parse(localStorage.getItem("id")) 

            // Cria novos objetos a partir da classe ProductBuilder para inserir na página novamente
            const newDatabase = database.map(({id, name, price, brand, img }) => {
                const produto = new ProductBuilder(name, price, brand, img)
                produto.setId(id)
                return produto
            })

            this[SYMBOLS.PRODUCTS_LIST] = newDatabase
            geraId._id = id
            resolve("Ok")
            reject("Não foi possível inserir gerar os produtos")
        })
        return promise
    }
}

const PRODUCT_HANDLER = new ProductController()

export default PRODUCT_HANDLER