'use client';
import { faEnvelope, faPhone, faStar, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, RadioGroup, TextArea, TextField, Theme } from '@radix-ui/themes';
import { redirect } from "next/navigation";
import { useState } from "react";
import OfferUpload from './OfferUpload';
import type { Offer } from "@/models/Offer";
import { saveOfferAction } from "@/app/actions/offerActions";

export default function OfferForm({ orgId, offerDoc }: { orgId: string; offerDoc?: Offer }) {
    const [phoneName, setPhoneName] = useState(offerDoc?.phone || 'iPhone 15 Pro');
    const [qualityName, setQualityName] = useState(offerDoc?.quality || 'A+');
    const [colorName, setColorName] = useState(offerDoc?.color || 'black');
    const [quantity, setQuantity] = useState(offerDoc?.quantity || '10');
    const [price, setPrice] = useState(offerDoc?.price || '500');
    const [description, setDescription] = useState(offerDoc?.description || '');
    const [offerIcon, setOfferIcon] = useState(offerDoc?.offerIcon || '');

    async function handleSaveOffer(data:FormData) {
        console.log("data:",data)
        data.set('phone', phoneName);
        data.set('quality', qualityName);
        data.set('color', colorName);
        data.set('quantity', quantity);
        data.set('price', price);
        data.set('description', description);
        data.set('orgId', orgId);
        data.set('offerIcon', offerIcon); 

        const offerDoc = await saveOfferAction(data);

        console.log('Saved offer document:', offerDoc);

        redirect(`/offers/${offerDoc.orgId}`);
    }
        console.log(' offer document:', offerDoc);

    return (
        <Theme accentColor="blue">
            <form action={handleSaveOffer} className="container mt-6 flex-col gap-4">
                <div className="sm:flex">

                    <div className="w-1/3">
                        <h3>Product icon</h3>
                        <OfferUpload name="offerIcon" icon={faStar} defaultValue={offerDoc?.offerIcon || ''} />
                    </div>

                    <div className="grow">
                        <h3>Contact person</h3>
                        <div className="flex gap-2">
                            <div className="">
                                <OfferUpload name="contactPhoto" icon={faUser} defaultValue={offerDoc?.contactPhoto || ''} />
                            </div>

                            <div className="grow flex flex-col gap-1">
                                <TextField.Root
                                    placeholder="John Doe"
                                    name="contactName"
                                    defaultValue={offerDoc?.contactName || ''}
                                >
                                    <TextField.Slot>
                                        <FontAwesomeIcon icon={faUser} />
                                    </TextField.Slot>
                                </TextField.Root>

                                <TextField.Root
                                    placeholder="Phone"
                                    type="tel"
                                    name="contactPhone"
                                    defaultValue={offerDoc?.contactPhone || ''}
                                >
                                    <TextField.Slot>
                                        <FontAwesomeIcon icon={faPhone} />
                                    </TextField.Slot>
                                </TextField.Root>
                                <TextField.Root
                                    placeholder="Email"
                                    type="email"
                                    name="contactEmail"
                                    defaultValue={offerDoc?.contactEmail || ''}
                                >
                                    <TextField.Slot>
                                        <FontAwesomeIcon icon={faEnvelope} />
                                    </TextField.Slot>
                                </TextField.Root>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid mt-6 sm:grid-cols-3 gap-6 *:grow">
                    <div>
                        Model?
                        <RadioGroup.Root
                            defaultValue={offerDoc?.phone || 'iPhone 15 Pro'}
                            name="phone"
                            onValueChange={(value) => {
                                setPhoneName(value);
                                console.log('Phone model changed to:', value);
                            }}
                        >
                            <RadioGroup.Item value="iPhone 15 Pro">iPhone 15 Pro</RadioGroup.Item>
                            <RadioGroup.Item value="iPhone 15 Pro Max">iPhone 15 Pro Max</RadioGroup.Item>
                            <RadioGroup.Item value="iPhone 15">iPhone 15</RadioGroup.Item>
                            <RadioGroup.Item value="iPhone 14 Pro">iPhone 14 Pro</RadioGroup.Item>
                            <RadioGroup.Item value="iPhone 14 Pro Max">iPhone 14 Pro Max</RadioGroup.Item>
                            <RadioGroup.Item value="iPhone 14">iPhone 14</RadioGroup.Item>
                            <RadioGroup.Item value="iPhone 13 Pro">iPhone 13 Pro</RadioGroup.Item>
                            <RadioGroup.Item value="iPhone 13 Pro Max">iPhone 13 Pro Max</RadioGroup.Item>
                            <RadioGroup.Item value="iPhone 13">iPhone 13</RadioGroup.Item>
                            <RadioGroup.Item value="iPhone 12">iPhone 12</RadioGroup.Item>
                        </RadioGroup.Root>
                    </div>
                    <div>
                        Quality?
                        <RadioGroup.Root
                            defaultValue={offerDoc?.quality || 'A+'}
                            name="quality"
                            onValueChange={(value) => {
                                setQualityName(value);
                                console.log('Quality changed to:', value);
                            }}
                        >
                            <RadioGroup.Item value="A+">A+</RadioGroup.Item>
                            <RadioGroup.Item value="A">A</RadioGroup.Item>
                            <RadioGroup.Item value="B+">B+</RadioGroup.Item>
                            <RadioGroup.Item value="B">B</RadioGroup.Item>
                            <RadioGroup.Item value="C+">C+</RadioGroup.Item>
                            <RadioGroup.Item value="C">C</RadioGroup.Item>
                        </RadioGroup.Root>
                    </div>

                    <div>
                        Color?
                        <RadioGroup.Root
                            defaultValue={offerDoc?.color || 'black'}
                            name="color"
                            onValueChange={(value) => {
                                setColorName(value);
                                console.log('Color changed to:', value);
                            }}
                        >
                            <RadioGroup.Item value="black">black</RadioGroup.Item>
                            <RadioGroup.Item value="blue">blue</RadioGroup.Item>
                            <RadioGroup.Item value="green">green</RadioGroup.Item>
                            <RadioGroup.Item value="yellow">yellow</RadioGroup.Item>
                            <RadioGroup.Item value="pink">pink</RadioGroup.Item>
                        </RadioGroup.Root>
                    </div>

                    <div>
                        Quantity?
                        <TextField.Root
                            name="quantity"
                            defaultValue={offerDoc?.quantity || '10'}
                            onChange={(e) => setQuantity(e.target.value)}
                        >
                            <TextField.Slot>
                                pieces
                            </TextField.Slot>
                        </TextField.Root>
                    </div>

                    <div>
                        Price?
                        <TextField.Root
                            name="price"
                            defaultValue={offerDoc?.price || '500'}
                            onChange={(e) => setPrice(e.target.value)}
                        >
                            <TextField.Slot>
                                €
                            </TextField.Slot>
                        </TextField.Root>
                    </div>
                </div>

                <TextArea
                    className="mt-6"
                    defaultValue={offerDoc?.description || ''}
                    placeholder="Offer description"
                    resize="vertical"
                    name="description"
                    onChange={(e) => setDescription(e.target.value)}
                />
                <div className="flex mt-6 justify-center">
                    <Button size="3">
                        <span className="px-8">Save</span>
                    </Button>
                </div>
            </form>
        </Theme>
    );
}
