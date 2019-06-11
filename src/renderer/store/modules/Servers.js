const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';

export default {
    namespaced: true,
	state: { 
        list: [
            {
                url: 'http://liberation.lorax.me:7779',
                lobbyId: 90126408598897671,
                data: undefined
            },
            {
                url: 'http://coastal.lorax.me:7779',
                lobbyId: 90126445494971392,
                data: undefined
            },
            {
                url: 'http://95.179.185.15:7779',
                lobbyId: 90126492542649346,
                data: undefined
            }
        ],

        timeout: undefined,
        timeoutTime: 2000,
    },
    getters: {
        list: state => {
            return state.list;
        }
    },
	mutations: {
        STORE_SERVER_DATA (state, { i, data }) {
            state.list[i].data = data;
        },
        INCREASE_TIMEOUT_TIME (state) {
            if (state.timeoutTime < 64 * 1000)
                state.timeoutTime *= 2;
        }
    },
	actions: {
        async startUpdateLoop ({ commit, state, dispatch, getters }) {
            let servers = getters.list;

            for (let i = 0; i < servers.length; i++)
            {
                let server = servers[i];

                await fetch(PROXY_URL + server.url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                            "RequestType": "PingServer"
                        })
                    })
                    .then(response => response.json())
                        .then((data) => {
                            console.log(data);
                            commit('STORE_SERVER_DATA', { i, data });
                        })
                        .catch(err => {
                            console.log(err);
                        });
            }    

            setTimeout(() => {
                commit('INCREASE_TIMEOUT_TIME');
                dispatch('startUpdateLoop');
            }, state.timeoutTime);
        }
    }
};
