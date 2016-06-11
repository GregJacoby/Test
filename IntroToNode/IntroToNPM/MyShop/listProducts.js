var faker = require('faker');
var product = faker.commerce.product();
var price = faker.finance.amount();

for(i = 0; i <= 10; i++) {
    console.log(faker.commerce.product());
    console.log('$' + faker.finance.amount());
}