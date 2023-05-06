<template>
    <Header />
    <div class="md-container">
        <div class="pg-wrapper">
            <h1> Level {{ $route.params.level }}</h1>
            <br />
            <div>
                <div v-if="list.length > 0">
                    <div v-for="(item, i) in list" :key="i">
                        <RouterLink :to="`/grammar/details/${item._id}`">
                            <div class="flex">
                                <div class="">
                                    <img
                                        :src="item.Image"
                                        alt=""
                                        height="80px"
                                        width="80px"
                                    />
                                </div>
                                <div class="desc-item">
                                    <p class="title-567">
                                        {{ item.Title }}
                                    </p>
                                    <div class="textlimit">
                                        <p class="tldetail">{{
                                            item.Content
                                        }}</p>
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
</template>
<script>
import Header from "../components/Header.vue";
import grammarApi from "@/apis/grammarApi";
import { cloudinaryImgOptimize } from "@/helper/index.js";

export default {
    name: "GrammarByLevelsView",
    created() {
        this.fetchGrammarLevel();
    },

    data() {
        return {
            level: Object,
            list: [],
        };
    },
    methods: {
        async fetchGrammarLevel() {
            try {
                const apiRes = await grammarApi.getGrammarByLevel(
                    this.$route.params.level
                );
                if (apiRes.status === 200) {
                    console.log(apiRes.data);
                    this.list = apiRes.data.grammars;
                }
            } catch (error) {
                throw error;
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
    components: {
        Header,
    },
};
</script>
<style lang="scss">
.g-wrapper {
    color: #fff;
    text-align: center;
}
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
  color: var(--secondary-color);
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
