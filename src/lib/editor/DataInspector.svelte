<script lang="ts">
	export let dataForInspector: Record<string, any> = {};
</script>

<h2 class="h2">Data Inspector</h2>
<br/>
<textarea name="" id="" cols="30" rows="28" class="textarea">
	{JSON.stringify(dataForInspector, null, 2)}
</textarea>
