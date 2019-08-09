export class Task{
    constructor(
        public _id:string,
        public name:string,
        public description:string,
        public deadline:Date,
        public labels: [string],
        public taskOwner:string,
        public project:string,
        public finish:boolean,
        public checked:boolean
    ){}
}