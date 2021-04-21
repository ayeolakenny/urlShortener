import { Request, Response } from "express";
import { UrlModel } from "../entities/Url";

export const openShortLink = async (req: Request, res: Response) => {
  //get the random character from the req params
  const { random_characters } = req.params;

  try {
    //find the Url model that has that unique_name
    let url = await UrlModel.findOne({
      randomCharacter: random_characters,
    });

    /** if such Url exists, redirect the user to the originalUrl 
       of that Url Model, else send a 404 Not Found Response */
    if (url) {
      return res.redirect(301, url.originalUrl);
    } else {
      return res.status(404).json({ error: "Not found" });
    }
  } catch (err) {
    //catch any error, and return server error to user
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};
