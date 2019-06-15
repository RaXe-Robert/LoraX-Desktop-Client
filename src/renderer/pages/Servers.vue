<template>
    <div id="servers">
        <ul>
            <li v-for="(server, i) of servers" :key="i">
                <server-listing :url="server.url" :lobbyId="server.lobbyId" :data="server.data" v-on:onClickAutoJoin="startAutoJoin(i)"></server-listing>
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
    methods: {
        startAutoJoin(index) {
            
            console.log(index);
            
            var notification = new Notification("Lorax", {
                body: "Auto join started!" 
            });
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variables';

#servers {
    
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