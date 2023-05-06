<template>
    <div>
      <Header/>
      <div class="md-container">
        <PageTitle title="Test" />
        <div>
          <div class='root' v-if="state ===0">
            <div class='t-container'>
              <div class='title' variant="h2">
               {{test.Name}}
              </div>
              <div class='timeTotal' variant="h5">
                Total time: {{test.Duration}} minutes
              </div>
              <Button @click='createSubmit' :class="{button}" text="Start" color='#fff'/>
               
          </div>
          </div>
          <div v-if="state===1">
            <!-- pagination display -->
            <Pagination
                type="part"
                pages="7"
                setCurrentPage='setCurrentPage'
                submitId='submitId'
                submitAnswers1 ='submitAnswers1'
                submitAnswers2 ='submitAnswers2'
                submitAnswers3 ='submitAnswers3'
                submitAnswers4 ='submitAnswers4'
                submitAnswers5 ='submitAnswers5'
                submitAnswers6 ='submitAnswers6'
                submitAnswers7 ='submitAnswers7'
             
              ></Pagination>

              <Part 
              part='currentPage'
              testId='id' 
              submitId='submitId'
              setSubmitAnswers1='setSubmitAnswers1' 
              setSubmitAnswers2='setSubmitAnswers2'
              setSubmitAnswers3='setSubmitAnswers3'
              setSubmitAnswers4='setSubmitAnswers4'
              setSubmitAnswers5='setSubmitAnswers5'
              setSubmitAnswers6='setSubmitAnswers6'
              setSubmitAnswers7='setSubmitAnswers7'
             
              />
          </div>
  
        </div>
      </div>
    </div>
  </template>
  <script>
  import Header from "@/components/Header.vue";
  import PageTitle from "../components/PageTitle.vue";
  import testApi from "@/apis/testApi.js";
  import submitTestApi from "@/apis/submitTestApi.js";
  import Button from "../components/Button.vue";
  import Pagination from "@components/Test/Pagination.vue";
  
  
  export default {
    name: "TestListView",
    data() {
      return {
        currentPage: 1,
        test: "",
        id: this.$route.id,
        state: 0,
        submitItem: null,
        submitId: "",
        answers: {
          submitAnswers1: [],
          submitAnswers2: [],
          submitAnswers3: [],
          submitAnswers4: [],
          submitAnswers5: [],
          submitAnswers6: [],
          submitAnswers7: [],
        },
      };
    },
    methods: {
      async fetchTestsById() {
        const res = await testApi.getTestById(id);
        if (res) {
          this.test = res.data;
        }
        localStorage.setItem("page", JSON.stringify(this.currentPage));
        const items = JSON.parse(localStorage.getItem("page"));
        console.log(items);
        if (items) {
          this.currentPage = items;
        }
      },
      async createSubmit() {
        const resCheck = await submitTestApi.getSubmitByTest(this.id);
  
        if (resCheck.data === null) {
          const resSubmit = await submitTestApi.postSubmit(this.id);
          this.submitId = resSubmit.data._id;
          this.state = 1;
          return;
        } else {
          this.submitId = resCheck.data._id;
        }
        if (resCheck.data.IsFinish === true) {
          this.submitItem = resCheck.data;
          localStorage.clear();
          this.state = 2;
        } else {
          this.state = 1;
        }
      },
      async onSubmitTest() {
        if (currentPage === 1) {
          await submitTestApi.putSubmit(
            this.submitId,
            this.currentPage,
            this.submitAnswers1
          );
        }
  
        if (currentPage === 2) {
          await submitTestApi.putSubmit(
            this.submitId,
            this.currentPage,
            this.submitAnswers2
          );
        }
  
        if (currentPage === 3) {
          await submitTestApi.putSubmit(
            this.submitId,
            this.currentPage,
            this.submitAnswers3
          );
        }
  
        if (currentPage === 4) {
          await submitTestApi.putSubmit(
            this.submitId,
            this.currentPage,
            this.submitAnswers4
          );
        }
  
        if (currentPage === 5) {
          await submitTestApi.putSubmit(
            this.submitId,
            this.currentPage,
            this.submitAnswers5
          );
        }
  
        if (currentPage === 6) {
          await submitTestApi.putSubmit(
            this.submitId,
            this.currentPage,
            this.submitAnswers6
          );
        }
  
        if (currentPage === 7) {
          await submitTestApi.putSubmit(
            this.submitId,
            this.currentPage,
            this.submitAnswers7
          );
        }
  
        const res = await submitTestApi.getSubmitByTest(this.id);
        setSubmitItem(res.data);
        localStorage.clear();
        this.state = 2;
      },
      async onPlayAgain() {
        await submitTestApi.deleteSubmit(this.submitId);
        window.location.reload();
      },
    },
    components: {
      Header,
      Button,
      PageTitle,
    },
  };
  </script>
  <style lang="css" scoped>
   .root {
      min-height: 80vh;
      color: white;
      position: "relative",
    }
    .t-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: absolute;
      top: 50%;
      left: 50%;
      transform:translate(-50%, -50%);
    }
    .button {
      padding: 10px 25px;
      font-weight: 600;
      background-color: #68c2e8;
      color: #fff;
     
    }
    .button:hover {
        background-color: #56bde8;
        box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.25);
      }
    .title {
      margin-bottom: 10px;
      font-weight: 600;
      color: #68c2e8;
    }
    .timeTotal {
      margin-bottom: 15px;
      font-weight: 500;
    }
    .timeDetail {
      margin-bottom: 20px;
    }
    .control{
      margin: 5px 0;
      justify-content: center;
    }
  </style>