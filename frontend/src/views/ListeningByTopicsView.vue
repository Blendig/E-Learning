<template>
  <div>
    <Header />
    <div class="md-container">
      <div class="pg-wrapper">
        <h1>{{ $route.params.topic }}</h1>
        <br/>
        <div>
          <div v-if="list.length > 0">
            <div v-for="(item, i) in list" :key="i">
              <RouterLink :to="`/listening/details/${item._id}`">
                <div class="flex">
                  <div class="">
                    <img
                      :src="getImage(item.Image)"
                      alt=""
                      height="80px"
                      width="80px"
                    />
                  </div>
                  <div class='desc-item'>
                  <p class="title-567">
                     {{ item.Name }}
                  </p>
                  <div class="textlimit">
                    <span class="tldetail">{{ item.Description }}</span>
                  </div>
                  </div>
                </div>
              </RouterLink>
              <br/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "../components/Header.vue";
import listeningApi from "../apis/listeningApi";
import { cloudinaryImgOptimize } from "@/helper/index.js";

export default {
  created() {
    this.getList();
  },
  data() {
    return {
      list: Array,
    };
  },
  methods: {
    async getList() {
      const topic = this.$route.params.topic;

      const res = await listeningApi.getListenByTopic(topic, "Newest");
      if (res && res.status === 200) {
        this.list = res.data.listens;
      }
    },
    getImage(image) {
      const imgSrc = cloudinaryImgOptimize(
        image ? image : DEFAULTS.IMAGE_SRC,
        200,
        200,
        true,
        true
      );
      return imgSrc;
    },
  },
  name: "ListeningByTopicsView",
  components: {
    Header,
  },
};
</script>
<style lang="scss">
.pg-wrapper {
  text-align: center;
  color: #fff;
}
.float-left {
  float: left;
  margin: 0 10px 10px 0px;
  padding: 2px;
}
.title-567 {
  display: inline-block;
  font-size: 1.5rem;
  font-weight: 400;
  color: var(--vt-title-color);
  text-align: left;
  &:hover,
  &:focus {
    color: "#CCC";
  }
}
.desc-item{
  text-align: left;
  padding:0 1rem;
}
.textlimit {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 500px;
  color:#fff;
}
.tldetail {
  font-weight: 400;
 
}
</style>
