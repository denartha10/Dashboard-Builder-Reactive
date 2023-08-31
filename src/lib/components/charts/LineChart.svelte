<script context="module">
	import { z } from 'zod';

	// use zod to check that the data is an array of objects with x and y keys
	export const lineChartSchema = z.array(
		z.object({
			x: z.any(),
			y: z.number()
		})
	);
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';
	import { safeAwait } from '$lib/utilities';

	let chartcanvas: HTMLCanvasElement;
	export let data: z.infer<typeof lineChartSchema>;
	export let color: string = 'rgb(75, 192, 192)';
	export let label: string = 'Dataset';
	export let yStartAtZero: boolean = true;
	export let xStartAtZero: boolean = true;

	function isRenderable(data: z.infer<typeof lineChartSchema>): boolean {
		try {
			lineChartSchema.parse(data).length > 0;
		} catch (e) {
			return false;
		}
		return true;
	}

	$: validData = isRenderable(data);

	onMount(() => {
        switch(validData){
            case true:
                let myChart = new Chart(chartcanvas, {
                    type: 'line',
                    data: {
                        datasets: [
                            {
                                label: label,
                                data: data,
                                borderColor: color
                            }
                        ]
                    },
                    options: {
                        scales: {
                            x: {
                                beginAtZero: xStartAtZero,
                                type: 'linear'
                            },
                            y: {
                                beginAtZero: yStartAtZero,
                                type: 'linear'
                            }
                        }
                    }
                });
        }
	});
</script>

{#if !validData}
	<div class="p-10">
		<h1 class="text-2xl font-bold">No data to render</h1>
	</div>
{:else}
	<div class="p-10 w-1/2">
		<canvas bind:this={chartcanvas} width={400} height={400} />
	</div>
{/if}
