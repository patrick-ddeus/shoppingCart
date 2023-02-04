import { geraId, SYMBOLS } from "../utils/utils.js"

class ProductBuilder {
    constructor(name, price, brand, img) {
        this[SYMBOLS.ID] = geraId.id;
        this[SYMBOLS.NAME] = name;
        this[SYMBOLS.PRICE] = price;
        this[SYMBOLS.BRAND] = brand;
        this[SYMBOLS.IMG] = img;
    }

    getId() {
        return this[SYMBOLS.ID];
    }

    getName() {
        return this[SYMBOLS.NAME];
    }

    getPrice() {
        return this[SYMBOLS.PRICE];
    }

    getBrand() {
        return this[SYMBOLS.BRAND];
    }

    getImg() {
        return this[SYMBOLS.IMG];
    }
}

export default ProductBuilder