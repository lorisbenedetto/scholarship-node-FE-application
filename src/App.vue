<template>
    <div id="app">
        <div v-if="!isLoading">
            <div class="date-information">
                <h5>Sol {{ informations.sol }}</h5>
                <h6> {{ informations.LastUTC }}</h6>
            </div>

            <div class="temperature-information">
                <h1>{{ informations.av }}°{{ indexOfTemperature }}</h1>
                <h5>max {{ informations.mx }}°{{ indexOfTemperature }}</h5>
                <h5>min {{ informations.mn }}°{{ indexOfTemperature }}</h5>
            </div>

            <div class="button-information">
                <b-button @click="getInformation" class="button-refresh">Refresh</b-button>
                <b-button @click="changeInformation" class="button-change">C°/F°</b-button>
            </div>
        </div>
        <div v-else>
            <div>
                <h1>Waiting...</h1>
            </div>
        </div>
    </div>
</template>
<script>
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'

    export default {
        name: 'App',
        data() {
            return {
                informations: {},
                indexOfTemperature: 'C',
                isLoading: false,
            }
        },
        methods: {
            getInformation() {
                this.isLoading = true
                this.$axios.get('http://localhost:8000/api/mars-informations', {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                    }
                })
                    .then(response => {
                        this.informations = response.data
                        this.isLoading = false
                    })
                    .catch(e => {
                        console.log(e)
                        this.isLoading = false
                    })
            },
            changeInformation() {
                this.isLoading = true

                this.$axios.post('http://localhost:8000/api/change-index',
                    {
                        indexOfTemperature: this.indexOfTemperature,
                        temperature: this.informations.av
                    }
                )
                    .then(response => {
                        this.informations.av = response.data.value
                    })
                    .catch(e => {
                        console.log(e)
                    })

                this.$axios.post('http://localhost:8000/api/change-index',
                    {
                        indexOfTemperature: this.indexOfTemperature,
                        temperature: this.informations.mx
                    }
                )
                    .then(response => {
                        this.informations.mx = response.data.value
                    })
                    .catch(e => {
                        console.log(e)
                    })

                this.$axios.post('http://localhost:8000/api/change-index',
                    {
                        indexOfTemperature: this.indexOfTemperature,
                        temperature: this.informations.mn
                    }
                )
                    .then(response => {
                        this.informations.mn = response.data.value
                    })
                    .catch(e => {
                        console.log(e)
                    })

                this.indexOfTemperature = this.indexOfTemperature === 'C' ? 'F' : 'C'

                this.isLoading = false
            }
        },
        created() {
            this.getInformation()
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

    .temperature-information {
        margin-top: 150px;
    }

    .button-information {
        margin-top: 150px;
    }

    .button-refresh {
        background-color: blue !important;
    }

    .button-change {
        background-color: green !important;
    }
</style>
