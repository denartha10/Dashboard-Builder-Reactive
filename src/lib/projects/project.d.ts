export interface Project {
	author: string;
	collectionId: string;
	collectionName: string;
	created: TDateTime;
	datasourceurl: string;
	description: string;
	collaborators: string[];
	id: string;
	name: string;
	public: boolean;
	updated: TDateTime;
	expand: User | object;
	image: string;
}
