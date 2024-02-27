const canvas = document.getElementById('chart')
const ctx = canvas.getContext('2d')

function drawLine (start, end, style) {
  ctx.beginPath()
  ctx.strokeStyle = style || 'black'
  ctx.moveTo(...start)
  ctx.lineTo(...end)
  ctx.stroke()
}

function drawTriangle (apex1, apex2, apex3) {
  ctx.beginPath()
  ctx.moveTo(...apex1)
  ctx.lineTo(...apex2)
  ctx.lineTo(...apex3)
  ctx.fill()
}

//step 5 created a function will will get the stock symbol from the backend
async function fetchStocks() {
  const response = await fetch('/stocks');
  console.log(response);
  const { stockSymbols } = await response.json();
  console.log(stockSymbols);
  return stockSymbols;
}


//step 6 create a function will take the stock symbol as a parameter and fetch data related to that
async function fetchStockData(stockSymbol) {
  const response = await fetch(`/stocks/${stockSymbol}`);
  console.log(response);
  return response.json();
}


//step 6 this is the main function which is made using a try catch block to prevent application hanging
//the fuction initally gets the stock symbol using the fetchStock funtion 
//then create a constatnt promise whihc will map through all the stocks
//the Promise.all encapsulates all the seperate promise requests into one array until they are all resolved
//the catch part send an error message in case of error as the build of the system is such that there is 10% change of failure
//once there the main block and executed or there has been an error the sprinner is hidden to suggets loading has completed
async function loadData() {
  const spinner = document.querySelector('.spinner');
  try {
    const stocks = await fetchStocks();
    console.log(stocks);
    const promises = stocks.map(stock => fetchStockData(stock));
    console.log(promises);
    const results = await Promise.all(promises);
    console.log(results);
  } catch (error) {
    console.error('Error fetching stock data:', error);
  } finally {
    spinner.style.display = 'none';
  }
}

loadData();

drawLine([50, 50], [50, 550])
drawTriangle([35, 50], [65, 50], [50, 35])

drawLine([50, 550], [950, 550])
drawTriangle([950, 535], [950, 565], [965, 550])
