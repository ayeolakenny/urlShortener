import { Url, UrlModel } from "../entities/Url";
import { Arg, Resolver, Query } from "type-graphql";
import { generateRandomCharacters } from "../utils/generateCharacters";
import * as dotenv from "dotenv";
dotenv.config();

let baseUrl = process.env.BASE_URL;

@Resolver(() => Url)
export class UrlResolver {
  @Query(() => String, { nullable: true })
  async shortenURL(@Arg("url") url: string): Promise<string> {
    //generate random character
    let randomCharacter = generateRandomCharacters();
    let originalUrl = url;

    //check if it exists before
    const checkIfCharacterExist = await UrlModel.findOne({ randomCharacter });

    if (checkIfCharacterExist) {
      //generate another if it exists
      randomCharacter = generateRandomCharacters();
    }

    if (!originalUrl.includes("https")) {
      originalUrl = `https://${originalUrl}`;
    }

    if (!originalUrl.includes(".com")) {
      originalUrl = `${originalUrl}.com`;
    }

    //create shorturl
    const shortUrl = `${baseUrl}/i/${randomCharacter}`;

    //save new url to db
    const newUrl = new UrlModel({
      originalUrl,
      randomCharacter,
      shortUrl,
    } as Url);
    await newUrl.save();

    //return shorturl
    return shortUrl;
  }
}
