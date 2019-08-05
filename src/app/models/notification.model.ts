export class Notification{
    constructor(
        public _id:string,
        public from:string,
        public to:string,
        public title:string,
        public description:string,
        public checked:boolean,
        public answered:boolean
    ){}
}