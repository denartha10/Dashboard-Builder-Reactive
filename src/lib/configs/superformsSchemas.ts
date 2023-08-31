import { z } from 'zod';

// tableComponentSchem an object with title with min 1 and max 50 and table data key no constraints
const tableComponentSchema = z.object({
	title: z.string().min(1).max(50),
	tableDataKey: z.string()
});

//infoComponentSchema an object with title with min 1 and a description with min 1
const infoComponentSchema = z.object({
	title: z.string().min(4),
	description: z.string().min(20)
});

// formComponentSchema an object with a key named "fields" that is an array of objects with a inputName and inputType both strings of min 1
const formComponentSchema = z.object({
	field: z
		.object({
			inputName: z.string().min(1),
			inputType: z.string().min(1)
		})
		.array()
});

// delete project schema an object with id of positive int
const deleteProjectSchema = z.object({
	id: z.string().nonempty()
});

//export all schemas

export {
	tableComponentSchema,
	infoComponentSchema,
	formComponentSchema,
	deleteProjectSchema,
};
