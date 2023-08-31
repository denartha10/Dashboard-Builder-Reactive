import { safeAwait, serialiseNonPOJO } from '$lib';
import { createProjectSchema } from '$lib/projects/CreateProjectForm.svelte';
import { updateProjectSchema } from '$lib/projects/UpdateProjectForm.svelte';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { message, superValidate } from 'sveltekit-superforms/client';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/loginorregister');
	}

	// create form for each imported schema
	const createProjectForm = await superValidate(createProjectSchema);
	const updateProjectForm = await superValidate(updateProjectSchema);

	const projectList = await safeAwait(
		locals.pb.collection('projects').getFullList<App.Project>({
			sort: 'created'
		})
	).then((r) => serialiseNonPOJO(r));

	switch (projectList[1]) {
		case null:
			return {
				flash: { type: 'error', message: 'An error occurred while loading the project list.' }
			};
		default:
			return {
				createProjectForm,
				updateProjectForm,
				projectList: projectList[1] ?? []
			};
	}
};

export const actions: Actions = {
	createProject: async ({ locals, request }) => {
		const createProjectForm = await superValidate(request, createProjectSchema);

		if (!createProjectForm.valid) {
			return message(createProjectForm, { type: 'error', message: 'Invalid form data.' });
		}

		const userIDs = await locals.pb
			.collection('users')
			.getFullList<App.User>()
			.then((r) => {
				return structuredClone(r)
					.filter((u) => createProjectForm.data.collaborators.includes(u.username))
					.map((u) => u.id);
			});

		const project = await safeAwait(
			locals.pb.collection('projects').create<App.Project>({
				name: createProjectForm.data.name,
				datasourceurl: createProjectForm.data.datasourceurl,
				description: createProjectForm.data.description,
				author: (locals.user as App.User).id,
				collaborators: userIDs
			})
		);

		switch (project[1]) {
			case null:
				return message(createProjectForm, {
					type: 'error',
					message: 'An error occcured when fetching the projects'
				});
			default:
				return message(createProjectForm, {
					type: 'success',
					message: 'Project created successfully'
				});
		}
	},

	updateProject: async ({ locals, request }) => {
		const updateProjectForm = await superValidate(request, updateProjectSchema);

		if (!updateProjectForm.valid) {
			console.log(updateProjectForm);
			return message(updateProjectForm, { type: 'error', message: 'Invalid form data.' });
		}

		const projectUpdate = await safeAwait(
			locals.pb.collection('projects').update<App.Project>(updateProjectForm.data.id, {
				name: updateProjectForm.data.name,
				datasourceurl: updateProjectForm.data.datasourceurl,
				description: updateProjectForm.data.description,
				collaborators: updateProjectForm.data.collaborators,
				public: updateProjectForm.data.public
			})
		);

		switch (projectUpdate[1]) {
			case null:
				return message(updateProjectForm, {
					type: 'error',
					message: 'An error occcured when updating'
				});
			default:
				return message(updateProjectForm, {
					type: 'success',
					message: 'Project updated successfully'
				});
		}
	},

	//now similarly for delete
	deleteProject: async ({ locals, request }) => {
		const formData = await request.formData();
		const id = formData.get('id');

		if (!id) {
			return fail(400);
		}

		const projectDelete = await safeAwait(locals.pb.collection('projects').delete(id as string));

		switch (projectDelete[1]) {
			case null:
				return fail(500);
		}
	}
};
