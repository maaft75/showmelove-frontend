import { Fundraiser } from "../Interfaces/Fundraiser"

export class Transactions{
    CreatedAt : string
    UpdatedAt : string
    Amount : string
    Status : string
    Sender : string
    TransId : string
    Campaign : Fundraiser

    constructor(CreatedAt : string, UpdatedAt : string, Amount : string, 
        Status : string, Sender : string, TransId : string, Campaign : Fundraiser){
        this.CreatedAt = CreatedAt
        this.UpdatedAt = UpdatedAt
        this.Amount = Amount,
        this.Status = Status,
        this.Sender = Sender,
        this.TransId = TransId,
        this.Campaign = Campaign
    }
}