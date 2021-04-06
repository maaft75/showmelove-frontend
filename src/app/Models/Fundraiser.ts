import { campaignOwner } from "./CampaignOwner";

export interface Fundraiser {
    amount_Goal: Number,
    campaignOwner: campaignOwner,
    current_Amount: Number,
    description: String,
    fundRaiserId: String,
    id: Number,
    image: String,
    link: String,
    postalCode: 104211
    purpose: String,
    title: String,
    type: String,
}