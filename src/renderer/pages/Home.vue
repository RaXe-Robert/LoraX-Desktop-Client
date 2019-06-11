<template>
    <div id="wrapper">
        <div id="nav-container">
            <div id="nav">
                <div class="servers-button" v-on:click="$router.push({ name: 'servers' })">SERVERS</div>
                <div class="stats-button" v-on:click="$router.push({ name: 'stats' })">STATS</div>
                <div class="group-finder-button" v-on:click="$router.push({ name: 'group-finder' })">GROUP FINDER</div>
                <div class="settings-button" v-on:click="$router.push({ name: 'settings' })">SETTINGS</div>
                <div class="about-button" v-on:click="$router.push({ name: 'about' })">ABOUT</div>
            </div>
        </div>
        <div id="content">
            <router-view></router-view>
        </div>
        <div id="footer">
            <div class="button-wrapper" v-for="(button, i) of buttons" :key="i">
                <div class="about" v-on:click="button.action()">
                    {{ button.name }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            buttons: []
        }
    },
    created() {
        this.buttons = this.$route.meta.buttons;
        this.$store.dispatch
    },
    mounted() {
        var notification = new Notification("It", { body: "works!" })
        console.log("Created Notification:", notification)
    },
    watch: {
        $route (to, from) {
            this.buttons = to.meta.buttons;
        }
    },
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variables';

#wrapper {

    height: 100%;
    display: flex;
    flex-direction: column;

    #nav-container {

            min-height: 40px;
            border-bottom: 0.01em solid $primary-bg;

        #nav {
            display: flex;
            justify-content: flex-end;
            width: 70%;
            margin-left: auto;

            font-size: 14px;

            & > * {
                font-weight: bold;
                line-height: 40px;
                text-align: center;
                flex-grow: 1;

                cursor: pointer;
            }
            & > *:hover  {
                background-color: $primary-bg;
            }
        }
        
    }

    #content {
        flex-grow: 2;

        overflow-x: hidden;
        overflow-y: scroll;
    }

    #footer {
        background-color: $secondary-bg;
        height: 5rem;
        border-top: 0.01em solid $primary-bg;

        display: flex;
        justify-content: flex-end;
        align-items: center;

        .button-wrapper {
            cursor: pointer;

            min-width: 60px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            margin: 10px;
            padding: 10px;

            background-color: $primary-bg;
            
            -webkit-border-radius: 0.8em;
            -moz-border-radius: 0.8em;
            border-radius: 0.8em;
        }
        .button-wrapper:hover {
            background-color: $button-hover;
            -webkit-transition: color 0.1s; /* For Safari 3.0 to 6.0 */
            transition: color 0.1s; /* For modern browsers */
        }
    }
}
</style>