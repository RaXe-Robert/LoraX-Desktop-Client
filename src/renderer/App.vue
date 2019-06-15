<template>
	<div id="app">
		<div id="title-bar">
            <div class="logo" v-on:click="openWebsite"></div>
            <div class="draggable-spacer"></div>
            <div class="button-wrapper">
                <div class="minimize-application-button" v-on:click="minimizeApplication"></div>
            </div>
            <div class="button-wrapper">
                <div class="close-application-button" v-on:click="closeApplication"></div>
            </div>
        </div>
        <div id="main">
		    <router-view></router-view>
        </div>
	</div>
</template>

<script>
import { ipcRenderer, shell, remote } from 'electron';

export default {
    name: 'lorax-app',
    mounted() {
        console.log(remote.getGlobal("appUserModelId"));
    },
    methods: {
        openWebsite() {
            shell.openExternal('https://loraX.me');
        },
        minimizeApplication() {
            ipcRenderer.send('minimize-app');
        },
        closeApplication() {
            ipcRenderer.send('close-app');
        }
    }
}
</script>
<style lang="scss" scoped>
@import './styles/variables';

#app {
    width: 100%;
    height: 100%;

    #main {
        position: absolute;
        top: 50px;
        bottom: 0;
        width: 100%;
    }

    #title-bar {
        background-color: $primary-bg;
        height: 50px;

        display: flex;

        & > * {
            height: 100%;
        }

        .logo {
            background-image: url('~@/assets/logo-lorax-simple.jpg');
            background-size: cover;
            width: 50px;

            flex-shrink: 0;
            cursor: pointer;
        }

        .draggable-spacer {
            -webkit-app-region: drag;
            flex-grow: 2;
        }

        .button-wrapper {
            width: 50px;
            line-height: 30px;
            text-align: center;
            font-size: x-large;
            background-color: #2F2F2F;
            cursor: pointer;

            color: $primary-text;

            & > * {
                margin: 20%;
                height: 60%;

                background-repeat: no-repeat;
                background-size: cover;
            }

            .minimize-application-button {
                background-image: url('~@/assets/minimize_white.png');
            }

            .close-application-button {
                background-image: url('~@/assets/close_white.png');
            }
        }
        .button-wrapper:hover {
            background-color: $button-hover;
            -webkit-transition: color 0.1s; /* For Safari 3.0 to 6.0 */
            transition: color 0.1s; /* For modern browsers */
        }
    }
}
</style>
