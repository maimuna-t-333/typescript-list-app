export interface item{
    id:string;
    item:string;
    checked:boolean;
}

export default class ListItem implements item{
    constructor(
        private_id:string="",
        private_item:string="",
        private_checked:boolean=false,
    ){}

    get id():string{
        return this.id;
    }

    set id(id:string){
        this.id=id;
    }
    get item():string{
        return this.item;
    }

    set item(item:string){
        this.item=item;
    }
    get checked():boolean{
        return this.checked;
    }

    set checked(checked:boolean){
        this.checked=checked;
    }
}