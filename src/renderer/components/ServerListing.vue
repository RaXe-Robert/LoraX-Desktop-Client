<template>
    <div id="wrapper">
        <div v-bind:class="['info-container', !isOnline ? 'conditional-border-color' : '']">
            <div class="name">{{ name }}</div>
            <div v-bind:class="['mode', !isOnline ? 'conditional-border-color' : '']">{{ mode }}</div>
            <div v-bind:class="['player-count', !isOnline ? 'conditional-border-color' : '']"> {{ currentPlayers }} / {{ maxPlayers }}</div>
        </div>
        <div class="join-button" v-on:click="onClickAutoJoin">
            <div class="text">
                auto-join
            </div>
            <div v-bind:class="['lint', (!isOnline || !isServerFull) ? 'conditional-background-color' : '']"></div>
        </div>
        <div class="join-button" v-on:click="onClickJoin">
            <div class="text">
                join
            </div>
        </div>
    </div>
</template>

<script>
import { shell } from 'electron';

//'steam://run/489940//-server_port=7777 lobby_id=90126445494971392 map=Derailed',
const battalionLaunchCommand = 'steam://run/489940//-server_port=7777';

export default {
    name: 'server-listing',
    data() {
        return {
            name: 'Offline',
            mode: '...',
            currentPlayers: 0,
            maxPlayers: 24,
        }
    },
    watch: {
        data: {
            immediate: true,
            handler(newVal, oldVal) {
                let data = newVal;
                if (data)
                {
                    this.name = data.ServerName;
                    this.mode = data.Mode;
                    this.currentPlayers = data.CurrentPlayers;
                    this.maxPlayers = data.MaxPlayers;
                }
                else
                {
                    this.name = 'Offline';
                    this.mode = '...';
                    this.currentPlayers = 0;
                    this.maxPlayers = 24;
                }
            }
        }
    },
    computed: {
        isOnline() {
            return this.data != null;
        },
        isServerFull() {
            return this.isOnline && this.currentPlayers == this.maxPlayers;
        }
    },
    methods: {
        onClickJoin() {
            if (!this.data)
                return;
            shell.openExternal(`${battalionLaunchCommand}%20-lobby_id=${this.lobbyId}%20-map=${this.data.MapName}`);
        },
        onClickAutoJoin() {
            if (!this.data)
                return;
            shell.openExternal(`${battalionLaunchCommand}%20-lobby_id=${this.lobbyId}$20-map=${this.data.MapName}`);
        }
    },
    props: {
        url: String,
        lobbyId: Number,
        data: Object,
    }
}
</script>
<style lang="scss" scoped>
@import '~@/styles/variables';

$available: $accent;
$unavailable: #ff0000;

#wrapper {
    display: flex;
    justify-content: center;

    & > * {
        background-color: $primary-bg;

        -webkit-border-radius: 0.8em;
        -moz-border-radius: 0.8em;
        border-radius: 0.8em;

        padding: 8px;
        height: fit-content;
        margin: 5px;
        white-space: nowrap;
    }

    .info-container {

        border-left: 30px solid;
        border-color: $available;

        display: flex;
        justify-content: right;

        & > * {
            padding-left: 10px;
            padding-right: 10px;
            text-align: center;
            height: 30px;
            line-height: 30px;
            overflow: hidden;
        }

        .name {
            width: 370px - 20px;

            padding-left: 30px;
            text-align: left;

            flex-grow: 2;
        }

        .mode {
            border-left: 3px solid;
            border-color: $available;
            width: 120px - 20px;
        }

        .player-count {

            border-left: 3px solid;
            border-color: $available;
            width: 70px - 20px;
        }
    }

    .join-button {
        position: relative;
        font-weight: bold;
        cursor: pointer;

        .text {
            position: relative;

            width: 100%;
            min-width: 60px;
            height: 30px;
            line-height: 30px;
            text-align: center;
        }

        .lint {
            position: absolute;

            height: 3px;
            width: 25%;
            transform: translateX(112.5%);
            
            bottom: 0;
            opacity: .5;

            background: $available;
            transition: all .5s ease-in-out;
        }

    }
    .join-button:hover {
        background-color: $button-hover;
        transition: color .5s ease-in-out;
    }

    .conditional-border-color {
        border-color: $unavailable !important;
    }
    .conditional-background-color {
        background-color: $unavailable !important;
    }
}
</style>
