<template>
  <div v-if="detail !== null && loading === false">
    <div class="admin-container">
      <div class="admin-container-chd" style="color: #fff">
        <div class="admin-container-chd english-container">
          <div class="">
            <h1>{{ detail.Name }}</h1>
            <p>{{ detail.Description }}</p>
            <br />
            <div style="width: 500px; height: 300px; border: 1px solid #ddd">
              <div v-if="detail.Video">
                <section>
                  <iframe width="500" height="300"></iframe>
                </section>
              </div>
            </div>
            <br />
            <h2>
              Topic :
              <span style="background-color: yellow; color: #333">{{
                detail.Topic
              }}</span>
            </h2>
            <h2>Script : <div v-html='detail.Script'></div></h2>
            <br />
            <div class="adui8 flex">
              <Button color="grey" variant="outlined" bgcolor="transparent"  @click="$router.back()" text="GO BACK" />

              <Button
              text="EDIT"
              color="#fff"
                @click="$router.push(`/admin/listening/edit/${detail._id}`)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <h1>header</h1>
</template>
<script>
import listeningApi from "../../apis/listeningApi";
import Button from "../../components/Button.vue";
export default {
  name: "ListeningDetail",
  created() {
    this.fetchListenById();
  },
  data() {
    return {
      detail: null,
      answers: [],
      isCorrect: [],
      isPlaying: true,
      loading: true,
    };
  },
  methods: {
    async fetchListenById() {
      try {
        const response = await listeningApi.getListening(this.$route.params.id);
        if (response.status === 200) {
          this.detail = response.data.listen;
          console.log(response.data);
          this.loading = false;
        }
        this.loading = false;
      } catch (error) {
        this.loading = false;
      }
    },
  },
  components: {
    Button,
  },
};
</script>
<style lang="css">
.adui8 :first-child{
    margin-right:.5rem;
}
</style>