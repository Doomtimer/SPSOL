require("dotenv").config();

const { Client, Intents, MessageEmbed } = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const axios = require("axios");

const data = require("./data/index.json");

client.once("ready", () => {
  console.log("Ready!");
});

async function getData({ power, minRange, maxRange }) {
  return (
    await axios.get(
      `https://api-mainnet.magiceden.dev/rpc/getListedNFTsByQuery?q={ "$match": { "collectionSymbol": "solderland_bunnies", "takerAmount": { "$gte": 0, "$lte": 8883000000000 }, "$and": [{ "$or": [{ "rarity.howrare": { "$exists": true } } ] },{ "$or": [{ "rarity.howrare.rank": { "$gte": ${minRange}, "$lte": ${maxRange} } } ] } ] }, "$sort": { "takerAmount": 1 }, "$skip": 0, "$limit": 1, "status": [] }`
    )
  ).data.results[0];
}

const calcData = [];

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === "sphelp") {
    await interaction.deferReply();
    const embed = new MessageEmbed()
      .setColor("#EFFF00")
      .setTitle("SPSOL Info")
      .addFields(
        {
          name: "SPSOL is a Discord bot which displays the SP per SOL ratio of every ranking category from the magiceden API in combination with the howrare ranking.",
          value: "\u200b",
        },
        {
          name: "It gives the user an overview of how much SP they would get in each category for spending 1 SOL and displays the floor price with the corresponding link to the bunny on the marketplace.",
          value: "\u200b",
        },
        {
          name: 'You can use it by using the command "/spsol".',
          value: "\u200b",
        },
        {
          name: "**DISCLAIMER:**",
          value:
            "**this information is only as accurate as the howrare ranking on Magic eden! Bunnies, which do not have the howrare ranking applied will not be taken into account!**",
        }
      )
      .setFooter({ text: "by Doomtime" });
    interaction.editReply({ embeds: [embed] });
  } else if (commandName === "spsol") {
    try {
      await interaction.deferReply();

      for (let i = 0; i < data.length; i++) {
        const item = data[i];

        const minRange = i > 0 ? data[i - 1].maxRange + 1 : 0;

        const results = await getData({ ...item, minRange });
          var marketLink = 'empty';
          var complMarketLink = 'empty';
          var price = 0;
          var solRate = 0;
          
          if(results!=null)
              {
        marketLink = results.mintAddress;
        complMarketLink =
          "https://magiceden.io/item-details/" + marketLink.toString();
        price = parseFloat(results.price);
        console.log(item.power, price);
        solRate = Math.round((item.power / price) * 100) / 100;
              }

        calcData.push({
          complMarketLink,
          price: price.toFixed(2),
          solRate: solRate.toFixed(2),
          ...item,
          minRange,
        });
      }

      const embed = new MessageEmbed()
        .setColor("#EFFF00")
        .setTitle("SPSOL")
        .setFooter({ text: "by Doomtime" });

      calcData.forEach((item) => {
        embed.addFields({
          name: `Rank ${item.minRange} - ${item.maxRange} - ${item.power} SP`,
          value: `*${item.solRate} SP/SOL* - [Magiceden Link](${item.complMarketLink}) - FP: ${item.price} SOL`,
        });
      });

      // const embed = new MessageEmbed()
      //   .setColor("#EFFF00")
      //   .setTitle("SPSOL")
      //   .addFields(
      //     {
      //       name: "Rank 1-4 - 400SP",
      //       value:
      //         "*" +
      //         spsol1.toString() +
      //         " SP/SOL* - " +
      //         `[Magiceden Link](${complMarketlink})` +
      //         " - " +
      //         " FP: " +
      //         price.toString() +
      //         " SOL",
      //     },
      //     {
      //       name: "Rank 5-35 - 300SP",
      //       value:
      //         "*" +
      //         spsol2.toString() +
      //         " SP/SOL* - " +
      //         `[Magiceden Link](${complMarketlink2})` +
      //         " - " +
      //         " FP: " +
      //         price2.toString() +
      //         " SOL",
      //     },
      //     {
      //       name: "Rank 6-671 - 175SP",
      //       value:
      //         "*" +
      //         spsol3.toString() +
      //         " SP/SOL* - " +
      //         `[Magiceden Link](${complMarketlink3})` +
      //         " - " +
      //         " FP: " +
      //         price3.toString() +
      //         " SOL",
      //     },
      //     {
      //       name: "Rank 672-1671 - 150SP",
      //       value:
      //         "*" +
      //         spsol4.toString() +
      //         " SP/SOL* - " +
      //         `[Magiceden Link](${complMarketlink4})` +
      //         " - " +
      //         " FP: " +
      //         price4.toString() +
      //         " SOL",
      //     },
      //     {
      //       name: "Rank 1672-2671 - 90SP",
      //       value:
      //         "*" +
      //         spsol5.toString() +
      //         " SP/SOL* - " +
      //         `[Magiceden Link](${complMarketlink5})` +
      //         " - " +
      //         " FP: " +
      //         price5.toString() +
      //         " SOL",
      //     },
      //     {
      //       name: "Rank 2672-3671 - 70SP",
      //       value:
      //         "*" +
      //         spsol6.toString() +
      //         " SP/SOL* - " +
      //         `[Magiceden Link](${complMarketlink6})` +
      //         " - " +
      //         " FP: " +
      //         price6.toString() +
      //         " SOL",
      //     },
      //     {
      //       name: "Rank 3672-4671 - 60SP",
      //       value:
      //         "*" +
      //         spsol7.toString() +
      //         " SP/SOL* - " +
      //         `[Magiceden Link](${complMarketlink7})` +
      //         " - " +
      //         " FP: " +
      //         price7.toString() +
      //         " SOL",
      //     },
      //     {
      //       name: "Rank 4672-5671 - 50SP",
      //       value:
      //         "*" +
      //         spsol8.toString() +
      //         " SP/SOL* - " +
      //         `[Magiceden Link](${complMarketlink8})` +
      //         " - " +
      //         " FP: " +
      //         price8.toString() +
      //         " SOL",
      //     },
      //     {
      //       name: "Rank 5672-6666 - 40SP",
      //       value:
      //         "*" +
      //         spsol9.toString() +
      //         " SP/SOL* - " +
      //         `[Magiceden Link](${complMarketlink9})` +
      //         " - " +
      //         " FP: " +
      //         price9.toString() +
      //         " SOL",
      //     }
      //   )
      //   .setFooter({ text: "by Doomtime" });

      //Rank 1-4 - 400SP
      // const res = await axios.get(
      //   'https://api-mainnet.magiceden.dev/rpc/getListedNFTsByQuery?q={ "$match": { "collectionSymbol": "solderland_bunnies", "takerAmount": { "$gte": 0, "$lte": 8883000000000 }, "$and": [{ "$or": [{ "rarity.howrare": { "$exists": true } } ] },{ "$or": [{ "rarity.howrare.rank": { "$gte": 0, "$lte": 4 } } ] } ] }, "$sort": { "takerAmount": 1 }, "$skip": 0, "$limit": 1, "status": [] }'
      // );

      // const [answer] = res.data.results;
      // const marketlink = answer.mintAddress;
      // const complMarketlink =
      //   "https://magiceden.io/item-details/" + marketlink.toString();
      // const price = parseFloat(answer.price);
      // const spsol1 = Math.round((400 / price) * 100) / 100;

      // //rank 5-35 - 300SP
      // const res2 = await axios.get(
      //   'https://api-mainnet.magiceden.dev/rpc/getListedNFTsByQuery?q={ "$match": { "collectionSymbol": "solderland_bunnies", "takerAmount": { "$gte": 0, "$lte": 8883000000000 }, "$and": [{ "$or": [{ "rarity.howrare": { "$exists": true } } ] },{ "$or": [{ "rarity.howrare.rank": { "$gte": 5, "$lte": 35 } } ] } ] }, "$sort": { "takerAmount": 1 }, "$skip": 0, "$limit": 1, "status": [] }'
      // );

      // const [answer2] = res2.data.results;
      // const marketlink2 = answer2.mintAddress;
      // const complMarketlink2 =
      //   "https://magiceden.io/item-details/" + marketlink2.toString();
      // const price2 = parseFloat(answer2.price);
      // const spsol2 = Math.round((300 / price2) * 100) / 100;

      // //rank 6-671 - 175SP
      // const res3 = await axios.get(
      //   'https://api-mainnet.magiceden.dev/rpc/getListedNFTsByQuery?q={ "$match": { "collectionSymbol": "solderland_bunnies", "takerAmount": { "$gte": 0, "$lte": 8883000000000 }, "$and": [{ "$or": [{ "rarity.howrare": { "$exists": true } } ] },{ "$or": [{ "rarity.howrare.rank": { "$gte": 6, "$lte": 671 } } ] } ] }, "$sort": { "takerAmount": 1 }, "$skip": 0, "$limit": 1, "status": [] }'
      // );
      // const [answer3] = res3.data.results;
      // const marketlink3 = answer3.mintAddress;
      // const complMarketlink3 =
      //   "https://magiceden.io/item-details/" + marketlink3.toString();
      // const price3 = parseFloat(answer3.price);
      // const spsol3 = Math.round((175 / price3) * 100) / 100;

      // //rank 672-1671 - 150SP
      // const res4 = await axios.get(
      //   'https://api-mainnet.magiceden.dev/rpc/getListedNFTsByQuery?q={ "$match": { "collectionSymbol": "solderland_bunnies", "takerAmount": { "$gte": 0, "$lte": 8883000000000 }, "$and": [{ "$or": [{ "rarity.howrare": { "$exists": true } } ] },{ "$or": [{ "rarity.howrare.rank": { "$gte": 672, "$lte": 1671 } } ] } ] }, "$sort": { "takerAmount": 1 }, "$skip": 0, "$limit": 1, "status": [] }'
      // );

      // const [answer4] = res4.data.results;
      // const marketlink4 = answer4.mintAddress;
      // const complMarketlink4 =
      //   "https://magiceden.io/item-details/" + marketlink4.toString();
      // const price4 = parseFloat(answer4.price);
      // const spsol4 = Math.round((150 / price4) * 100) / 100;

      // //rank 1672-2671 - 90SP
      // const res5 = await axios.get(
      //   'https://api-mainnet.magiceden.dev/rpc/getListedNFTsByQuery?q={ "$match": { "collectionSymbol": "solderland_bunnies", "takerAmount": { "$gte": 0, "$lte": 8883000000000 }, "$and": [{ "$or": [{ "rarity.howrare": { "$exists": true } } ] },{ "$or": [{ "rarity.howrare.rank": { "$gte": 1672, "$lte": 2671 } } ] } ] }, "$sort": { "takerAmount": 1 }, "$skip": 0, "$limit": 1, "status": [] }'
      // );
      // const [answer5] = res5.data.results;
      // const marketlink5 = answer5.mintAddress;
      // const complMarketlink5 =
      //   "https://magiceden.io/item-details/" + marketlink5.toString();
      // const price5 = parseFloat(answer5.price);
      // const spsol5 = Math.round((90 / price5) * 100) / 100;

      // //rank 2672-3671 - 70SP
      // const res6 = await axios.get(
      //   'https://api-mainnet.magiceden.dev/rpc/getListedNFTsByQuery?q={ "$match": { "collectionSymbol": "solderland_bunnies", "takerAmount": { "$gte": 0, "$lte": 8883000000000 }, "$and": [{ "$or": [{ "rarity.howrare": { "$exists": true } } ] },{ "$or": [{ "rarity.howrare.rank": { "$gte": 2672, "$lte": 3671 } } ] } ] }, "$sort": { "takerAmount": 1 }, "$skip": 0, "$limit": 1, "status": [] }'
      // );
      // const [answer6] = res6.data.results;
      // const marketlink6 = answer6.mintAddress;
      // const complMarketlink6 =
      //   "https://magiceden.io/item-details/" + marketlink6.toString();
      // const price6 = parseFloat(answer6.price);
      // const spsol6 = Math.round((70 / price6) * 100) / 100;

      // //rank 3672-4671 - 60SP
      // const res7 = await axios.get(
      //   'https://api-mainnet.magiceden.dev/rpc/getListedNFTsByQuery?q={ "$match": { "collectionSymbol": "solderland_bunnies", "takerAmount": { "$gte": 0, "$lte": 8883000000000 }, "$and": [{ "$or": [{ "rarity.howrare": { "$exists": true } } ] },{ "$or": [{ "rarity.howrare.rank": { "$gte": 3672, "$lte": 4671 } } ] } ] }, "$sort": { "takerAmount": 1 }, "$skip": 0, "$limit": 1, "status": [] }'
      // );
      // const [answer7] = res7.data.results;
      // const marketlink7 = answer7.mintAddress;
      // const complMarketlink7 =
      //   "https://magiceden.io/item-details/" + marketlink7.toString();
      // const price7 = parseFloat(answer7.price);
      // const spsol7 = Math.round((60 / price7) * 100) / 100;

      // //rank 4672-5671 - 50SP
      // const res8 = await axios.get(
      //   'https://api-mainnet.magiceden.dev/rpc/getListedNFTsByQuery?q={ "$match": { "collectionSymbol": "solderland_bunnies", "takerAmount": { "$gte": 0, "$lte": 8883000000000 }, "$and": [{ "$or": [{ "rarity.howrare": { "$exists": true } } ] },{ "$or": [{ "rarity.howrare.rank": { "$gte": 4672, "$lte": 5671 } } ] } ] }, "$sort": { "takerAmount": 1 }, "$skip": 0, "$limit": 1, "status": [] }'
      // );
      // const [answer8] = res8.data.results;
      // const marketlink8 = answer8.mintAddress;
      // const complMarketlink8 =
      //   "https://magiceden.io/item-details/" + marketlink8.toString();
      // const price8 = parseFloat(answer8.price);
      // const spsol8 = Math.round((50 / price8) * 100) / 100;

      // //rank 5672-6666 - 40SP
      // const res9 = await axios.get(
      //   'https://api-mainnet.magiceden.dev/rpc/getListedNFTsByQuery?q={ "$match": { "collectionSymbol": "solderland_bunnies", "takerAmount": { "$gte": 0, "$lte": 8883000000000 }, "$and": [{ "$or": [{ "rarity.howrare": { "$exists": true } } ] },{ "$or": [{ "rarity.howrare.rank": { "$gte": 5672, "$lte": 6666 } } ] } ] }, "$sort": { "takerAmount": 1 }, "$skip": 0, "$limit": 1, "status": [] }'
      // );
      // const [answer9] = res9.data.results;
      // const marketlink9 = answer9.mintAddress;
      // const complMarketlink9 =
      //   "https://magiceden.io/item-details/" + marketlink9.toString();
      // const price9 = parseFloat(answer9.price);
      // const spsol9 = Math.round((40 / price9) * 100) / 100;

      interaction.editReply({ embeds: [embed] });
    } catch (error) {
      console.log(error);
      interaction.deleteReply();
    }
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
