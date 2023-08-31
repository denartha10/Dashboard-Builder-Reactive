import FormComponent from "./form/FormComponent.svelte";
import LineChart from "./charts/LineChart.svelte";

const componentRegistry: Record<string, ConstructorOfATypedSvelteComponent> = {
    "Form": FormComponent,
    "LineChart": LineChart
}

export default componentRegistry;