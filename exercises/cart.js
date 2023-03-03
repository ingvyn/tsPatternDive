"use strict";
class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}
class Address {
    constructor(street, building, office) {
        this.street = street;
        this.building = building;
        this.office = office;
    }
}
class DeliveryDate {
    setDate(date) {
        let year = date.getFullYear().toString();
        let month = (1 + date.getMonth()).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');
        return `${day}.${month}.${year}`;
    }
}
class ShopDelivery extends DeliveryDate {
    constructor(id) {
        super();
        this.deliveryDate = this.setDate(new Date());
        this.shopId = id;
    }
}
class HomeDelivery extends DeliveryDate {
    constructor(address, date) {
        super();
        this.deliveryDate = this.setDate(date);
        this.address = address;
    }
}
class Cart {
    constructor() {
        this.products = [];
    }
    addProduct(product) {
        this.products.push(product);
    }
    deleteProduct(product) {
        this.products = this.products.filter((prod) => prod.id !== product.id);
    }
    getCartSum() {
        return this.products.reduce((acc, prod) => acc + prod.price, 0);
    }
    setDelivery(addressOrId, date) {
        if (typeof addressOrId === 'number') {
            this.deliveryOptions = new ShopDelivery(addressOrId);
        }
        else {
            if (date !== undefined) {
                this.deliveryOptions = new HomeDelivery(addressOrId, date);
            }
            else {
                throw Error('не задана дата домашней доставки');
            }
        }
    }
    chekout() {
        const isProducts = this.products.length > 0;
        const isDelivery = this.deliveryOptions !== undefined;
        return { success: isProducts && isDelivery };
    }
}
const cart = new Cart();
const prod1 = new Product(1, 'колбаса', 13);
const prod2 = new Product(1, 'картофель', 6);
cart.addProduct(prod1);
cart.addProduct(prod2);
const nowDate = new Date();
nowDate.setDate(nowDate.getDate() + 2);
const dateOfDelivery = nowDate;
console.log(nowDate);
cart.setDelivery(new Address('Уолкер', '63c', 12), dateOfDelivery);
console.log(cart.chekout());
console.log(cart.getCartSum());
console.log(cart);
console.log(cart.deliveryOptions.deliveryDate);
