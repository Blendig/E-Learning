<template>
   
    <div v-if="detail !== null && loading === false">
      <div class="admin-container">
        <div class="admin-container-chd" style="color: #fff">
          <div class="admin-container-chd english-container">
            <div class="">
              <h1>{{ detail.Title }}</h1>
              <p>{{ detail.Content }}</p>
              <br />
              <div style="width: 500px; height: 300px; border: 1px solid #ddd">
                <div v-if="detail.Video">
                  <section>
                    <iframe width="500" height="300" :src='detail.
                    Video'></iframe>
                  </section>
                </div>

                <div 
                style="width: 500px;
                 height: 300px; 
                 border: 1px solid #ddd"
                 v-else
                 >

                    <img :src='detail.Image' alt=''/>
                </div>
              </div>
              <br />
              <section>
              <h2>SCRIPT :</h2>
              <div v-html='detail.Script'>
               
              </div>
              <br/>
              <br/>
            </section>
              <section>
              <h2>GRAMMAR :</h2>
              <div style='width:'>
               
                <div style='margin:2rem 0' v-for='(item,i) in detail.Items' :key='i'>
                    
                    <h2 
                    style='background-color:var(--primary-color);
                    width:100%;
                    padding:.5rem'>
                      <b>Points:</b>  {{item.Point}}
                </h2>
                <p>{{item.Examples}}</p>
                <br/>
                </div>
              </div>
            </section>
              <br />
              <div class="adui8 flex">
                <Button color="grey" variant="outlined" bgcolor="transparent"  @click="$router.back()" text="GO BACK" />
  
                <Button
                text="EDIT"
                color="#fff"
                  @click="$router.push(`/admin/grammar/edit/${detail._id}`)"
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
  import grammarApi from '@/apis/grammarApi.js'
  import Button from "../../components/Button.vue";
  export default {
    name: "GrammarAdminDetail",
    created() {
      this.fetchListenById();
      this.fetchGrammar()
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
            console.log(this.$route.params.id)
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
     async fetchGrammar(){
        try {
            const response = await grammarApi.getGrammar(this.$route.params.id);
          if(response.status===200){
          this.detail = response.data.grammar
          console.log(this.detail)
          }
        } catch (error) {
            throw error
        }
      },
      
   getText(text) {
    let Text =[];
    if(text){
    Text = text.split("\n");
    } 
    return Text;
  }
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