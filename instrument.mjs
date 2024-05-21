export async function getInstrument(ticker, date) {
  const endDate = addDays(date, 1);
  const url = `https://iol.invertironline.com/api/cotizaciones/history?symbolName=${ticker}&exchange=BCBA&from=${Math.floor(date.getTime() / 1000)}&to=${Math.floor(endDate.getTime() / 1000)}&resolution=D`;

  try {
    const response = await fetch(url, { 
      mode: 'cors',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    })});
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    console.log('Status Code:', response.status);
    console.log('Date in Response header:', response.headers.get('date'));
    const data = await response.json();
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}

function addDays(date, days) {
  const newDate = new Date(date);
  newDate.setDate(date.getDate() + days);
  return newDate;
}
