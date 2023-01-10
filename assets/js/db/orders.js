const orders = {}

const ORDERDATA = {
    dish:[],
    drink:[],
    dessert:[]
}

// orders.insertOrder = (productData) =>{
//     const type = productData.type
//     if(ORDERDATA[type]){
//         ORDERDATA[type].push(productData)
//     }
// }

orders.getAllOrders = () =>{
    return {...ORDERDATA}
}

export { orders }