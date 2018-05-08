<template>
	<v-flex align-center>
	    <!-- <div class="time-unite" v-show="months" v-if="months > 0">
	        <p class="title">Months</p>
	        <p class="value">{{ months }}</p>
	    </div>
	    <div class="time-unite" v-show="days"  v-if="days > 0">
	        <p class="title">Days</p>
	        <p class="value">{{ days }}</p>
	    </div> -->
	    <v-layout align-center>
	        <v-flex class="value" v-if="hours > 0">{{ hours }}</v-flex>
            <v-flex class="value" v-if="hours > 0 || minutes > 0">{{ minutes }}</v-flex>
            <v-flex class="value" >{{ seconds }}</v-flex>
	    </v-layout>
        <v-layout align-center>
	        <v-flex class="text" v-if="hours > 0">hours</v-flex>
            <v-flex class="text" v-if="hours > 0 || minutes > 0">minutes</v-flex>
            <v-flex class="text" >seconds</v-flex>
	    </v-layout>
	</v-flex>
</template>

<script>
    import { mapState } from 'vuex'
	import moment from 'moment'
	export default {
        props: ["time"],
		data () {
			return {
                timelimit : 0,
				actualTime: moment().format('X'),
				months: 0,
				days: 0,
				hours: 0,
				minutes: 0,
				seconds: 0
			}
		},
		methods: {
            addOneSecondToActualTimeEverySecond () {
                if(this.timelimit>this.actualTime) {
                    var component = this
                    component.actualTime = moment().format('X')
                    setTimeout(function(){
                        component.addOneSecondToActualTimeEverySecond()
                    }, 1000);
                }
            },
            getDiffInSeconds () {
                return this.timelimit - this.actualTime
            },
            compute () {
                var duration = moment.duration(this.getDiffInSeconds(), "seconds")
                this.months = duration.months() > 0 ? duration.months() : 0
                this.days = duration.days() > 0 ? duration.days() : 0
                this.hours = duration.hours() > 0 ? duration.hours() : 0
                this.minutes = duration.minutes() > 0 ? duration.minutes() : 0
                this.seconds = duration.seconds() > 0 ? duration.seconds() : 0
            }
            },
            created () {
            this.timelimit = moment().add(this.time,'minutes').format('X')
            this.compute()
            this.addOneSecondToActualTimeEverySecond()
            },
            watch: {
                actualTime (val) {
                    this.compute()
                    if(val == this.timelimit) {
                        this.$store.dispatch('endTest')
                    }
                }

            }
	}
</script>
<style scoped>
/* @import url(https://fonts.googleapis.com/css?family=Roboto+Condensed:400|Roboto:100); */

.value {
    color: #ecf0f1;
    font-size: 20px;
    font-weight: 100;
    font-family: 'Roboto', serif;
    text-align: center;
}

.text {
    color: #ecf0f1;
    font-size: 10px;
    font-family: 'Roboto Condensed', serif;
    font-weight: 40;
    /* margin-top:10px; */
    /* margin-bottom: 10px; */
    text-align: center;
}

</style>
