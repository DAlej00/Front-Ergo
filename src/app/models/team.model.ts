export class Team {
	constructor(
		public _id: string,
		public name: string,
		public description: string,
		public integrants: [
			{
				user: string;
				rol: string;
				supervisor:string;
			}
		],
		public manager:string
	) {}
}
