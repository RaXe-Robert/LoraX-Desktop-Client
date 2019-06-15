<template>
    <div id="wrapper">
        <div v-bind:class="['info-container', !isOnline ? 'conditional-border-color' : '']">
            <div v-on:click="copyToClipBoard" v-bind:class="['copy-to-clipboard', !isOnline ? ['conditional-background-color', 'conditional-border-color'] : '']"></div>
            <div class="name">
                {{ name }}
            </div>
            <div v-bind:class="['mode', !isOnline ? 'conditional-border-color' : '']">
                {{ mode }}
            </div>
            <div v-bind:class="['player-count', !isOnline ? 'conditional-border-color' : '']">
                {{ currentPlayers }} / {{ maxPlayers }}
            </div>
        </div>
        <div class="join-button" v-on:click="$emit('onClickAutoJoin')">
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
        copyToClipBoard() {
            // Create new element
            var el = document.createElement('textarea');
            // Set value (string to be copied)
            el.value = 'blablabla';
            // Set non-editable to avoid focus and move outside of view
            el.setAttribute('readonly', '');
            el.style = {
                position: 'absolute',
                left: '-9999px'
            };
            document.body.appendChild(el);
            // Select text inside element
            el.select();
            // Copy text to clipboard
            document.execCommand('copy');
            // Remove temporary element
            document.body.removeChild(el);

            var notification = new Notification("Lorax", {
                body: "Copied to clipboard!" 
            });
        },
        onClickJoin() {
            if (!this.data)
                return;
                
            this.joinServer();
        },
        joinServer() {
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

        border-left: 13px solid;
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

        .copy-to-clipboard {
            width: 50px - 20px;

            padding: 0;
            border-right: 8px solid;
            border-color: $accent;
            height: 50px;
            margin: -8px;
            cursor: pointer;

            background: {
                color: $accent;
                image: url('~@/assets/copy_white.png');
                repeat: no-repeat;
                size: contain;
                position: center;
            }
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
            width: 70px - 20px;
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
