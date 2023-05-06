<template>
  <div>
    <h6>
        {{ handleTimerDisplay }}
    </h6>
  </div>
</template>
<script>
import submitTestApi from "@/apis/submitTestApi";
import { convertTime } from "@/helper";

export default {
  name: "Timer",
  created() {
    const items = JSON.parse(localStorage.getItem("time"));
    console.log(items);
    if (items) {
      setTime(items);
    }
    let myInterval = setInterval(() => {
      setTime((time) => {
        const updatedTime = { ...time };
        if (time.seconds > 0) {
          updatedTime.seconds--;
        }
        if (time.seconds === 0) {
          if (time.hours === 0 && time.minutes === 0) {
            clearInterval(myInterval);
            onSubmitTest();
          } else if (time.minutes > 0) {
            updatedTime.minutes--;
            updatedTime.seconds = 59;
          } else if (updatedTime.hours > 0) {
            updatedTime.hours--;
            updatedTime.minutes = 59;
            updatedTime.seconds = 59;
          }
        }
        localStorage.setItem("time", JSON.stringify(updatedTime));
        return updatedTime;
      });
    }, 1000);
    if (myInterval) clearInterval(myInterval);
  },
  props: {
    value,
    onSubmitTest,
  },
  data() {
    return {
      time: {
        hours: initTime.hours,
        minutes: initTime.minutes,
        seconds: initTime.seconds,
      },
      timer: null,
    };
  },
  methods: {
    handleTimerDisplay() {
      let h = "";
      let m = "";
      let s = "";
      if (time.hours < 10 && time.hours !== 0) {
        h = `0${time.hours}:`;
      } else {
        h = time.hours >= 10 && `${time.hours}:`;
      }
      if (time.minutes < 10) {
        this.m = `0${time.minutes}`;
      } else {
        m = time.minutes;
      }
      if (time.seconds < 10) {
        s = `0${time.seconds}`;
      } else {
        s= time.seconds;
      }
      return `${h}${m}${s}`
    },
  },
};
</script>
<style lang="css">
</style>