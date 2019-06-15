<template>
    <div id="about">
        <h3>Join us at:</h3>
        <ul>
            <li><div v-on:click="open('https://twitter.com/loraXgaming')">Twitter</div></li>
            <li><div v-on:click="open('https://discordapp.com/invite/VcyXdFc')">Discord</div></li>
            <li><div v-on:click="open('https://steamcommunity.com/groups/lorax-gaming')">Steam</div></li>
        </ul>
        <h3>Contact</h3>
        <ul>
            <li><div v-on:click="open('https://steamcommunity.com/id/REALiAMcHETS')">iamchets</div></li>
            <li><div v-on:click="open('https://steamcommunity.com/profiles/76561198038068361')">Lazydps</div></li>
            <li><div v-on:click="open('https://steamcommunity.com/id/RaXe-Original')">Raxe</div></li>
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
#about {
    h3 {
        margin-bottom: 0;
        padding-bottom: 0;
    }
    
    li {
        cursor: pointer;
    }
}
</style>