export default async function CryptoPage() {
	const options = {
		method: "GET",
		headers: {
			"x-cg-demo-api-key": `${process.env.NEXT_PUBLIC_CRYPTO_API_KEY}`,
		},
	};
	const res = await fetch(
		"https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd",
		options
	);
	const data = await res.json();
	console.log(data);

	return (
		<div>
			<h2 className="">Crypto Page</h2>
			{data.map((coin: any) => (
				<div key={coin.id}>
					<h3>{coin.name}</h3>
					<p>{coin.current_price}</p>
				</div>
			))}
		</div>
	);
}
