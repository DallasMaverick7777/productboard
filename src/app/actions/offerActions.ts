'use server';

import { OfferModel } from "@/models/Offer";
import mongoose from "mongoose";
import {revalidatePath} from "next/cache";

export async function saveOfferAction(formData: FormData) {
   await mongoose.connect(process.env.MONGO_URI as string);
   const {id, ...offerData} = Object.fromEntries(formData);
   const offerDoc = (id)
     ? await OfferModel.findByIdAndUpdate(id, offerData)
     : await OfferModel.create( offerData );
   if ('orgId' in offerData) {
     revalidatePath('/offers/'+offerData?.orgId);
   }
   return JSON.parse( JSON.stringify(offerDoc) );
 }

