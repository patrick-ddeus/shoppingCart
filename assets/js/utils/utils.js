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
        return ++this._id;
    }
}

function updateTotalInHTML(total) {
    const totalSpan = document.querySelector(".total span");
    const formatedTotal = total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    totalSpan.innerHTML = formatedTotal;
  }

function callToast(text, colorFrom = "#00b09b", colorTo="#96c93d", position = "left"){
    Toastify({
        text,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position, // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: `linear-gradient(to right, ${colorFrom}, ${colorTo})`,
        },
        onClick: function(){} // Callback after click
      }).showToast();
}


export { geraId, SYMBOLS, callToast , updateTotalInHTML}