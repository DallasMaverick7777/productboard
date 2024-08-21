import {AutoPaginatable, OrganizationMembership, User, WorkOS} from "@workos-inc/node";
import mongoose, {model, models, Schema} from 'mongoose';

export type Offer = {
    _id: string;
    phone: string;
    quality: string;
    color: string;
    quantity: string;
    price: string;
    description:  string;
    offerIcon: string;
    contactPhoto: string;
    contactName: string;
    contactPhone: string;
    contactEmail: string;
    orgId: string;
    createdAt: string;
    updatedAt: string;
    isAdmin?: boolean;
  };

const OfferSchema = new Schema({
  phone: {type: String, required: true},
  quality: {type: String, required: true},
  color: {type: String, required: true},
    quantity: {type: String, required: true},
    price: {type: String, required: true},
    description: {type: String, required: true},
    offerIcon: {type: String},
    contactPhoto: {type: String},
    contactName: {type: String, required: true},
    contactPhone: {type: String, required: true},
    contactEmail: {type: String, required: true},
    orgId: {type: String, required: true},
}, {
    timestamps: true,
  });


export async function addOrgAndUserData(offerDoc:Offer[], user:User|null) {
  offerDoc = JSON.parse(JSON.stringify(offerDoc));
  await mongoose.connect(process.env.MONGO_URI as string);
  const workos = new WorkOS(process.env.WORKOS_API_KEY);
  let oms:AutoPaginatable<OrganizationMembership>|null = null;
  if (user) {
    oms = await workos.userManagement.listOrganizationMemberships({
      userId: user?.id,
    });
  }
  for (const offer of offerDoc) {
    const org = await workos.organizations.getOrganization(offer.orgId);
    offer.orgId = org.name;
    if (oms && oms.data.length > 0) {
      offer.isAdmin = !!oms.data.find(om => om.organizationId === offer.orgId);
    }
  }
  return offerDoc;
}

export const OfferModel = models?.Offer || model('Offer', OfferSchema);