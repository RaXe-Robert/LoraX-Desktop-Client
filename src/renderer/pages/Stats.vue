<template>
    <div id="stats">
        <div id="search-bar-container">
            <div id="search-bar">
                <input v-model="searchBarInput" placeholder="steamid"/>
                <div class="custom-button" v-on:click="search">Search</div>
            </div>
        </div>
        <h3>Stats</h3>
        <ul>
            <li>Kills</li>
            <li>Deaths</li>
            <li>Assists</li>
            <li>Assists</li>
            <li>Last seen</li>
        </ul>
        <h3>Weapons</h3>
        <ul>
            <li>Kar98k</li>
            <li>Kar98k Scopes</li>
            <li>Stg44</li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            searchBarInput: '',
        }
    },
	methods: {
        search() {
            console.log(this.searchBarInput);
        }
	}
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variables';

#stats {

    #search-bar-container {
        width: 80%;
        height: 30px;
        padding: 10px;
        margin: 0 auto;

        #search-bar {
            text-align: center;
            vertical-align: middle;

            & > * {
                -webkit-border-radius: 0.8em;
                -moz-border-radius: 0.8em;
                border-radius: 0.8em;
            }

            input {
                background-color: $secondary-bg;
                border: 1px solid $primary-bg;

                width: 50%;
                line-height: 30px;
                color: #ffffff;
                text-align: center;
            }

            .custom-button {
                cursor: pointer;
                width: 60px;
                line-height: 30px;
                text-align: center;
                display: inline-block;

                background-color: $primary-bg;
            }
            .custom-button:hover {
                background-color: $button-hover;
                -webkit-transition: color 0.1s; /* For Safari 3.0 to 6.0 */
                transition: color 0.1s; /* For modern browsers */
            }
        }
    }
}
</style>