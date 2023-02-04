const SYMBOLS = {
    ID: Symbol("id"),
    NAME: Symbol("name"),
    PRICE: Symbol("price"),
    BRAND: Symbol("brand"),
    IMG: Symbol("img"),
    PRODUCTS_LIST: Symbol("product-list")
}

const geraId = {
    _id:0,
    get id(){
        return this._id++;
    }
}


export { geraId, SYMBOLS }