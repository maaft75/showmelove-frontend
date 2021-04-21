export class PatchCurrentAmount{
    op : string
    path: string
    value: Number

    constructor(op : string, path : string, value : Number){
        this.op = op
        this.path = path
        this.value = value
    }
}