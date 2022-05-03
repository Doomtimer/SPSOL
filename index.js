const { Client, Intents, MessageEmbed } = require('discord.js');
const { token } = require('./config.json');
const fetch = require('node-fetch');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const cloudscraper = require('cloudscraper');

const trim = (str, max) => (str.length > max ? `${str.slice(0, max - 3)}...` : str);


client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;


	if (commandName === 'spsol') {
		const fetchUrl = async (url) => {
			const delay = m => new Promise((resolve, reject) => { setTimeout(_ => resolve(), m) });
			try {
				const response = await cloudscraper.get(url).catch(async (err) => {
					if (err.statusCode) return;
					await delay(1000);
					return fetchUrl(url);
				});
				if (!response) return;
				return JSON.parse(response);
			}
			catch (e) {
				await delay(1000);
				return fetchUrl(url);
			}
		};
		await interaction.deferReply();
		//Rank 1-4 - 400SP
		const res = await fetchUrl('https://api-mainnet.magiceden.io/rpc/getListedNFTsByQuery?q={ "$match": { "collectionSymbol": "solderland_bunnies", "takerAmount": { "$gte": 0, "$lte": 8883000000000 }, "$and": [{ "$or": [{ "rarity.howrare": { "$exists": true } } ] },{ "$or": [{ "rarity.howrare.rank": { "$gte": 0, "$lte": 10 } } ] } ] }, "$sort": { "takerAmount": 1 }, "$skip": 0, "$limit": 1, "status": [] }');
		
		const [answer] = res.results;
		const marketlink = answer.mintAddress;
		const complMarketlink = 'https://magiceden.io/item-details/' + marketlink.toString();
		const price = parseFloat(answer.price);
		const spsol1 = Math.round((400 / price) * 100) / 100;

		//rank 5-35 - 300SP
		const res2 = await fetchUrl('https://api-mainnet.magiceden.io/rpc/getListedNFTsByQuery?q={ "$match": { "collectionSymbol": "solderland_bunnies", "takerAmount": { "$gte": 0, "$lte": 8883000000000 }, "$and": [{ "$or": [{ "rarity.howrare": { "$exists": true } } ] },{ "$or": [{ "rarity.howrare.rank": { "$gte": 5, "$lte": 35 } } ] } ] }, "$sort": { "takerAmount": 1 }, "$skip": 0, "$limit": 1, "status": [] }');

		const [answer2] = res2.results;
		const marketlink2 = answer2.mintAddress;
		const complMarketlink2 = 'https://magiceden.io/item-details/' + marketlink2.toString();
		const price2 = parseFloat(answer2.price);
		const spsol2 = Math.round((300 / price2) * 100) / 100;

		//rank 6-671 - 175SP
		const res3 = await fetchUrl('https://api-mainnet.magiceden.io/rpc/getListedNFTsByQuery?q={ "$match": { "collectionSymbol": "solderland_bunnies", "takerAmount": { "$gte": 0, "$lte": 8883000000000 }, "$and": [{ "$or": [{ "rarity.howrare": { "$exists": true } } ] },{ "$or": [{ "rarity.howrare.rank": { "$gte": 6, "$lte": 671 } } ] } ] }, "$sort": { "takerAmount": 1 }, "$skip": 0, "$limit": 1, "status": [] }');

		const [answer3] = res3.results;
		const marketlink3 = answer3.mintAddress;
		const complMarketlink3 = 'https://magiceden.io/item-details/' + marketlink3.toString();
		const price3 = parseFloat(answer3.price);
		const spsol3 = Math.round((175 / price3) * 100) / 100;

		//rank 672-1671 - 150SP
		const res4 = await fetchUrl('https://api-mainnet.magiceden.io/rpc/getListedNFTsByQuery?q={ "$match": { "collectionSymbol": "solderland_bunnies", "takerAmount": { "$gte": 0, "$lte": 8883000000000 }, "$and": [{ "$or": [{ "rarity.howrare": { "$exists": true } } ] },{ "$or": [{ "rarity.howrare.rank": { "$gte": 672, "$lte": 1671 } } ] } ] }, "$sort": { "takerAmount": 1 }, "$skip": 0, "$limit": 1, "status": [] }');

		const [answer4] = res4.results;
		const marketlink4 = answer4.mintAddress;
		const complMarketlink4 = 'https://magiceden.io/item-details/' + marketlink4.toString();
		const price4 = parseFloat(answer4.price);
		const spsol4 = Math.round((150 / price4) * 100) / 100;

		//rank 1672-2671 - 90SP
		const res5 = await fetchUrl('https://api-mainnet.magiceden.io/rpc/getListedNFTsByQuery?q={ "$match": { "collectionSymbol": "solderland_bunnies", "takerAmount": { "$gte": 0, "$lte": 8883000000000 }, "$and": [{ "$or": [{ "rarity.howrare": { "$exists": true } } ] },{ "$or": [{ "rarity.howrare.rank": { "$gte": 1672, "$lte": 2671 } } ] } ] }, "$sort": { "takerAmount": 1 }, "$skip": 0, "$limit": 1, "status": [] }');

		const [answer5] = res5.results;
		const marketlink5 = answer5.mintAddress;
		const complMarketlink5 = 'https://magiceden.io/item-details/' + marketlink5.toString();
		const price5 = parseFloat(answer5.price);
		const spsol5 = Math.round((90 / price5) * 100) / 100;

		//rank 2672-3671 - 70SP
		const res6 = await fetchUrl('https://api-mainnet.magiceden.io/rpc/getListedNFTsByQuery?q={ "$match": { "collectionSymbol": "solderland_bunnies", "takerAmount": { "$gte": 0, "$lte": 8883000000000 }, "$and": [{ "$or": [{ "rarity.howrare": { "$exists": true } } ] },{ "$or": [{ "rarity.howrare.rank": { "$gte": 2672, "$lte": 3671 } } ] } ] }, "$sort": { "takerAmount": 1 }, "$skip": 0, "$limit": 1, "status": [] }');

		const [answer6] = res6.results;
		const marketlink6 = answer6.mintAddress;
		const complMarketlink6 = 'https://magiceden.io/item-details/' + marketlink6.toString();
		const price6 = parseFloat(answer6.price);
		const spsol6 = Math.round((70 / price6) * 100) / 100;

		//rank 3672-4671 - 60SP
		const res7 = await fetchUrl('https://api-mainnet.magiceden.io/rpc/getListedNFTsByQuery?q={ "$match": { "collectionSymbol": "solderland_bunnies", "takerAmount": { "$gte": 0, "$lte": 8883000000000 }, "$and": [{ "$or": [{ "rarity.howrare": { "$exists": true } } ] },{ "$or": [{ "rarity.howrare.rank": { "$gte": 3672, "$lte": 4671 } } ] } ] }, "$sort": { "takerAmount": 1 }, "$skip": 0, "$limit": 1, "status": [] }');

		const [answer7] = res7.results;
		const marketlink7 = answer7.mintAddress;
		const complMarketlink7 = 'https://magiceden.io/item-details/' + marketlink7.toString();
		const price7 = parseFloat(answer7.price);
		const spsol7 = Math.round((60 / price7) * 100) / 100;

		//rank 4672-5671 - 50SP
		const res8 = await fetchUrl('https://api-mainnet.magiceden.io/rpc/getListedNFTsByQuery?q={ "$match": { "collectionSymbol": "solderland_bunnies", "takerAmount": { "$gte": 0, "$lte": 8883000000000 }, "$and": [{ "$or": [{ "rarity.howrare": { "$exists": true } } ] },{ "$or": [{ "rarity.howrare.rank": { "$gte": 4672, "$lte": 5671 } } ] } ] }, "$sort": { "takerAmount": 1 }, "$skip": 0, "$limit": 1, "status": [] }');

		const [answer8] = res8.results;
		const marketlink8 = answer8.mintAddress;
		const complMarketlink8 = 'https://magiceden.io/item-details/' + marketlink8.toString();
		const price8 = parseFloat(answer8.price);
		const spsol8 = Math.round((50 / price8) * 100) / 100;
		
		//rank 5672-6666 - 40SP
		const res9 = await fetchUrl('https://api-mainnet.magiceden.io/rpc/getListedNFTsByQuery?q={ "$match": { "collectionSymbol": "solderland_bunnies", "takerAmount": { "$gte": 0, "$lte": 8883000000000 }, "$and": [{ "$or": [{ "rarity.howrare": { "$exists": true } } ] },{ "$or": [{ "rarity.howrare.rank": { "$gte": 5672, "$lte": 6666 } } ] } ] }, "$sort": { "takerAmount": 1 }, "$skip": 0, "$limit": 1, "status": [] }');

		const [answer9] = res9.results;
		const marketlink9 = answer9.mintAddress;
		const complMarketlink9 = 'https://magiceden.io/item-details/' + marketlink9.toString();
		const price9 = parseFloat(answer9.price);
		const spsol9 = Math.round((40 / price9) * 100) / 100;
		


		const embed = new MessageEmbed()
			.setColor('#EFFF00')
			.setTitle('SPSOL')
			.setAuthor({ name: 'Doomtime' })
			.addFields(
				{ name: 'Rank 1-4 - 400SP', value: '```' + spsol1.toString() + ' SP/SOL```' + `[Magiceden Link](${complMarketlink})` },
				{ name: 'Rank 5-35 - 300SP', value: '```' + spsol2.toString() + ' SP/SOL```' + `[Magiceden Link](${complMarketlink2})` },
				{ name: 'Rank 6-671 - 175SP', value: '```' + spsol3.toString() + ' SP/SOL```' + `[Magiceden Link](${complMarketlink3})` },
				{ name: 'Rank 672-1671 - 150SP', value: '```' + spsol4.toString() + ' SP/SOL```' + `[Magiceden Link](${complMarketlink4})` },
				{ name: 'Rank 1672-2671 - 90SP', value: '```' + spsol5.toString() + ' SP/SOL```' + `[Magiceden Link](${complMarketlink5})` },
				{ name: 'Rank 2672-3671 - 70SP', value: '```' + spsol6.toString() + ' SP/SOL```' + `[Magiceden Link](${complMarketlink6})` },
				{ name: 'Rank 3672-4671 - 60SP', value: '```' + spsol7.toString() + ' SP/SOL```' + `[Magiceden Link](${complMarketlink7})` },
				{ name: 'Rank 4672-5671 - 50SP', value: '```' + spsol8.toString() + ' SP/SOL```' + `[Magiceden Link](${complMarketlink8})` },
				{ name: 'Rank 5672-6666 - 40SP', value: '```' + spsol9.toString() + ' SP/SOL```' + `[Magiceden Link](${complMarketlink9})` },
			);
		interaction.editReply({ embeds: [embed] });
	}
});

client.login(token);