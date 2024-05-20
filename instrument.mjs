let https;
import('node:https')
  .then(module => {
    https = module;
  })
  .catch(err => {
    console.error('https support is disabled!');
  });

export function getInstrument(ticker, date) {
  const endDate = addDays(date, 1);
  const url = `https://iol.invertironline.com/api/cotizaciones/history?symbolName=${ticker}&exchange=BCBA&from=${Math.floor(date.getTime() / 1000)}&to=${Math.floor(endDate.getTime() / 1000)}&resolution=D`;

  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let data = [];
      const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
      console.log('Status Code:', res.statusCode);
      console.log('Date in Response header:', headerDate);

      res.on('data', chunk => {
        data.push(chunk);
      });

      res.on('end', () => {
        try {
          const parsed = JSON.parse(Buffer.concat(data).toString());
          const instrument = { ticker: ticker, price: parsed.bars[0].close };
          resolve(instrument);
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', err => {
      console.log('Error: ', err.message);
      reject(err);
    });
  });
}

function addDays(date, days) {
  const newDate = new Date(date);
  newDate.setDate(date.getDate() + days);
  return newDate;
}
