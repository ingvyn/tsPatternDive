class Product {
  public id: number;
  public name: string;
  public price: number;

  constructor(id: number, name: string, price: number) {
    this.id  = id;
    this.name = name;
    this.price = price;
  }
}

class Address {
  public street: string;
  public building: string;
  public office: number;

  constructor(street: string, building: string, office: number) {
    this.street = street;
    this.building = building;
    this.office = office;
  }
}

class DeliveryDate {
  public setDate(date: Date) {
    let year: string = date.getFullYear().toString();
    let month: string = (1 + date.getMonth()).toString().padStart(2, '0');
    let day: string = date.getDate().toString().padStart(2, '0');
    return `${day}.${month}.${year}`;
  }
}

class ShopDelivery extends DeliveryDate {
  public deliveryDate: string = this.setDate(new Date());
  private shopId: number;

  constructor(id: number) {
    super();
    this.shopId = id;
  }
}

class HomeDelivery extends DeliveryDate {
  public deliveryDate: string;
  public address: Address;

  constructor(address: Address, date: Date) {
    super();
    this.deliveryDate = this.setDate(date);
    this.address = address;
  }
}

class Cart {
  private products: Product[] = [];
  public deliveryOptions: ShopDelivery | HomeDelivery;

  public addProduct(product: Product) {
    this.products.push(product);
  }

  public deleteProduct(product: Product) {
    this.products = this.products.filter((prod) => prod.id !== product.id);
  }

  public getCartSum(): number {
    return this.products.reduce((acc, prod) => acc + prod.price, 0);
  }

  public setDelivery(id: number): void;
  public setDelivery(adress: Address, date: Date): void;
  public setDelivery(addressOrId: number | Address, date?: Date): void {
    if (typeof addressOrId === 'number') {
      this.deliveryOptions = new ShopDelivery(addressOrId);
    } else {
      if (date !== undefined) {
      this.deliveryOptions = new HomeDelivery(addressOrId, date);
      } else {
        throw Error('не задана дата домашней доставки');
      }
    }
  }

  public chekout() {
    const isProducts: boolean = this.products.length > 0;
    const isDelivery: boolean = this.deliveryOptions !== undefined;
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
const dateOfDelivery: Date = nowDate;
console.log(nowDate);
cart.setDelivery(new Address('Уолкер', '63c', 12), dateOfDelivery);
console.log(cart.chekout());
console.log(cart.getCartSum());
console.log(cart);
console.log(cart.deliveryOptions.deliveryDate);