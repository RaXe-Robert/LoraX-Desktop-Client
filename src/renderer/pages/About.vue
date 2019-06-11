<template>
    <div id="wrapper">
        <ul>
            <li><div v-on:click="open('https://twitter.com/loraXgaming')">twitter</div></li>
            <li><div v-on:click="open('https://discordapp.com/invite/VcyXdFc')">discord</div></li>
            <li><div v-on:click="open('https://steamcommunity.com/groups/lorax-gaming')">steam</div></li>
        </ul>
    </div>
</template>

<script>
export default {
	methods: {
		open (link) {
			this.$electron.shell.openExternal(link)
		}
	}
}
</script>

<style lang="scss" scoped>
li {
    cursor: pointer;
}
</style>