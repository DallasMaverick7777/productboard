import Hero from "@/app/components/Hero";

import {addOrgAndUserData, OfferModel} from "@/models/Offer";
import {getUser} from "@workos-inc/authkit-nextjs";
import mongoose from "mongoose";
import Offers from "./components/Devices";

export default async function Home() {
  const {user} = await getUser();
  await mongoose.connect(process.env.MONGO_URI as string);
  const latestOffers = await addOrgAndUserData(
    await OfferModel.find({},{},{limit:5,sort:'-createdAt'}),
    user,
  );
  return (
    <>
      <Hero />
      <Offers header={''} offers={latestOffers} />
    </>
  );
}