const express = require('express')
const path = require('path')
const stocks = require('./stocks')

const app = express()
app.use(express.static(path.join(__dirname, 'static')))

//step 3 add console logging to see if stocks are available
app.get('/stocks', async (req, res) => {
  const stockSymbols = await stocks.getStocks()
  console.log(stockSymbols);
  res.send({ stockSymbols })
})

//step 4 add a try catch block to catch error when stocks are unavailable with the specified symbols this will prevent applciation from hanging
app.get('/stocks/:symbol', async (req, res) => {
  try {
    const { params: { symbol } } = req
    const data = await stocks.getStockPoints(symbol, new Date().getTime());
    res.send(data);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});


app.listen(3000, () => console.log('Server is running!'))
