export class Task{
    constructor(
        public _id:string,
        public name:string,
        public descripcion:string,
        public deadline:Date,
        public labels: [string],
        public taskOwner:string,
        public project:string,
        public finish:boolean,
        public checked:boolean
    ){}
}