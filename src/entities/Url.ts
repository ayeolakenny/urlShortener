import { ObjectId } from "mongodb";
import { Field, ObjectType } from "type-graphql";
import { getModelForClass, prop as Property } from "@typegoose/typegoose";

@ObjectType()
export class Url {
  @Field()
  readonly _id: ObjectId;

  @Field()
  @Property({ required: true })
  originalUrl: string;

  @Field()
  @Property({ required: true, unique: true })
  shortUrl: string;

  @Field()
  @Property({ required: true, unique: true })
  randomCharacter: string;

  @Field()
  createdAt: Date;
}

export const UrlModel = getModelForClass(Url, {
  schemaOptions: {
    timestamps: {
      createdAt: "createdAt",
    },
  },
});
