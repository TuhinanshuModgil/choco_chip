const url = 'https://alpha-vantage.p.rapidapi.com/query?interval=5min&function=TIME_SERIES_INTRADAY&symbol=BANKNIFTY&datatype=json&output_size=compact';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '1a9b4be2b2msh8f0d8ec0a7cd483p1a2de9jsn8067a49c59cb',
		'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com'
	}
};



fetch(url, options)
.then(res => res.json())
.then(res => console.log(res));
// try  {
// 	const response = await fetch(url, options);
// 	const result = await response.text();
// 	console.log(result);
// } catch (error) {
// 	console.error(error);
// }