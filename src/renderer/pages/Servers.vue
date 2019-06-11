<template>
    <div id="wrapper">
        <ul>
            <li v-for="(server, i) of servers" :key="i">
                <server-listing :url="server.url" :lobbyId="server.lobbyId" :data="server.data"></server-listing>
            </li>
        </ul>
    </div>
</template>

<script>

export default {
    computed: {
        servers () {
            return this.$store.getters['Servers/list']
        }
    },
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variables';

#wrapper {
    
    ul {
        padding: 0;

        max-width: 100%;
        
        li {
            margin: 5px;
            width: 100%;
        }
    }
}
</style>