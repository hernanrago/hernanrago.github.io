import { getInstrument } from './instrument.mjs';

async function main() {
const tickers = ['S14O4', 'S29N4', 'S31E5'];
const date = new Date('2024-05-16');

try {
const promises = tickers.map(ticker => getInstrument(ticker, date));
const instruments = await Promise.all(promises);
const rows = instruments.map(instrument => [ 'liquidez', instrument.ticker, instrument.price * 10 ]);
const instrumentList = document.getElementById('instrument-list');
rows.forEach(instrument => {
const listItem = document.createElement('li');
listItem.textContent = `${instrument.ticker}: ${instrument.price}`;
instrumentList.appendChild(listItem);
});
await renderChart(rows);

} catch (error) {
console.error('Error fetching instruments:', error);
}
}

main();