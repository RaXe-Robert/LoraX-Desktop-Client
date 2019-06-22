<template>
    <div id="about">
        <h3>Join us at:</h3>
        <ul>
            <li><a v-on:click="open('https://twitter.com/loraXgaming')">Twitter</a></li>
            <li><a v-on:click="open('https://discordapp.com/invite/VcyXdFc')">Discord</a></li>
            <li><a v-on:click="open('https://steamcommunity.com/groups/lorax-gaming')">Steam</a></li>
        </ul>
        <h3>Contact us:</h3>
        <ul>
            <li><a v-on:click="open('https://steamcommunity.com/id/REALiAMcHETS')">iamchets</a></li>
            <li><a v-on:click="open('https://steamcommunity.com/profiles/76561198038068361')">Lazydps</a></li>
            <li><a v-on:click="open('https://steamcommunity.com/id/RaXe-Original')">Raxe</a></li>
        </ul>
        <p>
            This application is in a very early stage of development. It's open-source so if you want to contribute do so at our <a v-on:click="open('https://github.com/Raxe-Robert/LoraX-Desktop-Client')">GitHub</a>.
        </p>
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
    padding: 10px;

    p {
        margin: 0;
    }

    h3 {
        margin-bottom: 0;
        padding-bottom: 0;
    }
    
    a {
        cursor: pointer;
        text-decoration: underline;
    }
}
</style>