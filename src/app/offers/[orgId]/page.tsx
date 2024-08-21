import Offers from "@/app/components/Devices";
import { OfferModel, addOrgAndUserData } from "@/models/Offer";
import {getUser} from "@workos-inc/authkit-nextjs";
import {AutoPaginatable, OrganizationMembership, WorkOS} from "@workos-inc/node";
import mongoose from "mongoose";

type PageProps = {
  params: {
    orgId: string;
  }
};

export default async function CompanyOffersPage(props:PageProps) {
  const workos = new WorkOS(process.env.WORKOS_API_KEY);
  const org = await workos.organizations.getOrganization(props.params.orgId);
  const {user} = await getUser();
  let offerDocs = JSON.parse(JSON.stringify(await OfferModel.find({orgId: org.id})));
  offerDocs = await addOrgAndUserData(offerDocs, user);
  return (
    <div>
      <div className="container">
        <h1 className="text-xl my-6">{org.name} Offers</h1>
      </div>
        <Offers offers={offerDocs} header={"Offers posted by "+org.name} />
    </div>
  );
}