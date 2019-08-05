export class User{
    constructor(
        public _id:string,
        public name:string,
        public lastName:string,
        public userName:string,
        public email:string,
        public password:string,
        public image:string,
        public notifications:number
    ){}
}