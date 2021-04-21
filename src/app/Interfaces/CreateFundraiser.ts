import { campaignOwner } from "./CampaignOwner";

export interface CreateFundraiser{
    title: string,
    purpose: string,
    type: string,
    fundRaiserId: string,
    amount_Goal: Number,
    postalCode: Number,
    image: string,
    description: string,
    campaignOwner: campaignOwner,
    link: string
}