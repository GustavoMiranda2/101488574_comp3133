//Name: Gustavo Miranda
//StudentID: 101488574

class Customer {
    firstName: string;
    lastName: string;

    public greeter() {
        console.log(`Hello ${this.firstName} ${this.lastName}`);
    }
}

let customer = new Customer();
customer.firstName = "John";
customer.lastName = "Smith";
customer.greeter();
