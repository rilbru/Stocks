'use strict';

const PORT = 3000;

// The variable stocks has the same value as the variable stocks in the file 'stocks.js'
const stocks = require('./stocks.js').stocks;

const express = require("express");
const app = express();


app.use(express.urlencoded({
    extended: true
}))

app.use(express.static('public'));
// Note: Don't add or change anything above this line.


// POST route handler for when the form on the stock order page
// is submitted, req argument has the request
// res argument sends the response to the user
// findStockBySymbol is called to locate which stock is being ordered
// totalPrice calculates based off the quantity selected
// responseString uses toLocaleString method to format price values
app.post('/order', (req, res) => {
  const symbol = req.body.symbol;
  const quantity = req.body.quantity;
  const stock = findStockBySymbol(symbol);
  const totalPrice = stock.price * quantity;

  const responseString = `You placed an order to buy ${quantity} stock(s) of ${stock.company}. The price of one stock is ${stock.price.toLocaleString("en-us", { style: 'currency', currency: 'USD' })} and the total price for this order is ${totalPrice.toLocaleString("en-us", { style: 'currency', currency: "USD" })}`;

  res.send(responseString);
})

  // findStockBySymbol function takes 1 argument (symbol)
  // a for-of loop is used to iterate over the stocks object/array
  // it checks by the symbol specified in stocks.js
  // then returns the stock that matches that symbol
  function findStockBySymbol(symbol) {
    for (const stock of stocks) {
      if (stock.symbol === symbol) {
        return stock;
      }
    }
  }

  // POST route handler is used when the stock-search
  // has been selected. The findStockByPrice function is
  // called and the return value is stored in result
  // and displayed to the user
  app.post('/stock-search', (req,res) => {
    const option = req.body.option;
    const result = findStockByPrice(option);
    res.send(result);
  })


  // findStockByPrice function takes 1 argument (option)
  // then returns the stock with the highest or lowest price
  // based off what the user selects
  // the reduce method is used to iterate through the stocks
  // and compare which stock is the lowest/highest with the conditional/ternary operator
  function findStockByPrice(option) {
    let result = 0;
    if (option === "highest") {
      result = stocks.reduce((accumulator, current) => (accumulator.price > current.price ? accumulator : current));
    } else if (option === "lowest") {
      result = stocks.reduce((accumulator, current) => (accumulator.price < current.price ? accumulator : current));
    }
    return result;
  }
  

// Note: Don't add or change anything below this line.
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
})