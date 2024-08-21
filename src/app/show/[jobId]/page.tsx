"use client"
import { OfferModel } from "@/models/Offer";
import mongoose from "mongoose";
import { LinkedinIcon, LinkedinShareButton, WhatsappIcon, WhatsappShareButton } from "next-share";
import { useEffect, useState } from "react";


type PageProps = {
    params: {
        offerId: string;
    }
}
export default function SingleOfferPage(props: PageProps) {
    const[offerDoc,setOfferDoc] = useState({} as any)
    
    useEffect(() => {
        const connectToMongoose= async () => {
            await mongoose.connect(process.env.MONGO_URI as string);
            const offerDoc = await OfferModel.findById(props.params.offerId);
            console.log(offerDoc);
            setOfferDoc(offerDoc);
        }
        connectToMongoose();
       
        
        
    },[])
       

    return (
        <>
        <div className="container mx-auto my-6 flex">
            <div className="w-1/3 p-4 bg-white shadow-lg  rounded-lg">
                <h1 className="text-2xl font-bold mb-4 text-center">Account Manager</h1>
                <img src={offerDoc.contactPhoto} alt="Contact Photo" className="w-full h-40 object-cover rounded mb-4 shadow-lg shadow-gray-500/25" />
                <h5 className="mt-6 mb-2">
                    <span className="font-bold text-blue-gray-500">Name: </span>{offerDoc.contactName}
                </h5>
                <div className="mb-2">
                    <span className="font-semibold">Phone: </span>{offerDoc.contactPhone}
                </div>
                <div className="mb-2 flex items-center">
                    <span className="font-semibold">Email: </span>
                    <div className="ml-2">{offerDoc.contactEmail}</div>
                </div>

                <div className="mx-auto flex justify-center gap-4">
                    <div className="mb-2">
                    <WhatsappShareButton 
                    
                        url={'http://localhost:3000'} > 
                        <WhatsappIcon size={32} round /> 
                    </WhatsappShareButton> 
                    </div>
                    <div className="mb-2">
                    <LinkedinShareButton  
                    
                        url={'http://localhost:3000'} > 
                        <LinkedinIcon size={32} round /> 
                    </LinkedinShareButton> 
                    </div>
                </div>
            </div>
            <div className="w-2/3 p-4">
                {/* Product information will go here */}
                <h2 className="text-xl font-bold mb-4">Product Information</h2>
                <p>{offerDoc.description}</p>
            </div>
        </div>
        </>
    );
}
