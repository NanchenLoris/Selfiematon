import { TwitterApi } from "twitter-api-v2"
//const { TwitterApi } = require("twitter-api-v2");


async function textTweet() {
  const client = new TwitterApi({
    appKey: "0MQZMiLhE5cyg8Zyo4yVNCuv0",
    appSecret: "p7T5YFe3OMvUlvLoqnO4NLKmZwzJUph3rW43FB9nfw10ENePCR",
    accessToken: "1702379902291324928-JgWQ1jiCWuwf3XcfunDOchMTaDZCzc",
    accessSecret: "xUSX3dXb0AnzRP476mnHZBsUb57XJwtTykYbdbLF6P3l5",
    bearerToken: "AAAAAAAAAAAAAAAAAAAAAMjLqAEAAAAAzO8hpR%2B8WMnyITkPDVU8d%2BbqWyc%3DuLljm3RoB3n6Q1aqdqMWsHKl5v1pYUjkqjoIfsuUldqmkgPpZ6",
    clientId: "ZEhtYUpWaWlvWXl3aXNYOUk4SlA6MTpjaQ",
    clientSecret: "mvucxTe301xF3-RSaynPT1QSpBJUAyczc6O-jvhnSzWjZAmCYv",
  });

  const rwClient = client.readWrite;

  try {
    await rwClient.v2.tweet(
        "This tweet has been created using nodejs");
    console.log("success");
  } catch (error) {
    console.log(error);
  }
}

export { textTweet }

// export async function textTweet() {
//     try {
//       await rwClient.v2.tweet(
//           "This tweet has been created using nodejs");
//       console.log("success");
//     } catch (error) {
//       console.log(error);
//     }
// };
    
const mediaTweet = async () => {
    try {
      const mediaId = await client.v1.uploadMedia("../assets/lion.png");
      await rwClient.v2.tweet({
            text: "Lmao",
            media: { media_ids: [mediaId] },
      });
      console.log("success");
    } catch (e) {
      console.log(e);
    }
};