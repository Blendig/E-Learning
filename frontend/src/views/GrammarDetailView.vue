<template>
	<div>
		<Header />
		<section class="md-container">
			<div>
				<div style="color: #fff">
					<h1 align="center">{{ grammar?.Title }}</h1>
					<br />
					<h3>{{ grammar?.Content }}</h3>
					<br />
				</div>
				<div class="tab-lv-panel">
					<div
						:class="[
							(currentTab === 0 && 'current tab-lv') || 'tab-lv',
						]"
						role="button"
						@click="toggleTab(0)"
					>
						<Button
							text="SCRIPT"
							bgcolor="transparent"
							color="#fff"
						/>
					</div>
					<div
						:class="[
							(currentTab === 1 && 'current tab-lv') || 'tab-lv',
						]"
						role="button"
						@click="toggleTab(1)"
					>
						<Button
							text="GRAMMAR"
							bgcolor="transparent"
							color="#fff"
						/>
					</div>
					<div
						:class="[
							(currentTab === 2 && 'current tab-lv') || 'tab-lv',
						]"
						role="button"
						@click="toggleTab(2)"
					>
						<Button
							text="QUIZ"
							bgcolor="transparent"
							color="#fff"
						/>
					</div>
				</div>
				<article v-if="currentTab === 0">
					<div v-html="grammar?.Script" v-if="grammar !== null"></div>
				</article>
			</div>
			<div v-if="currentTab === 2">
				<p>Answer the following questions about the interview.</p>
				<ol style="color: #fff">
					<div :key="i" v-for="(q, i) in questions">
						<li>
							<div class="">
								<h2>{{ q.Content }}</h2>
								<div class="mark-q flex">
									<img
										:src="corrImg"
										v-if="
											checkAnswer &&
											q.Answers[f(q._id)].isCorrect
										"
									/>
									<img
										:src="incorrImg"
										v-else-if="checkAnswer"
									/>
								</div>
							</div>

							<div
								role="radio"
								class="answer-box-031"
								v-for="(c, j) in q.Answers"
								:key="j"
							>
								<span style="width: 100%">
									<input
										type="radio"
										:id="`${j}${c.content}`"
										:name="q._id"
										:value="c._id"
										@change="
											handleCheck(q._id, c.content, j)
										"
								/></span>
								<label
									:class="[
										showAnswer && c.isCorrect && 'correct',
									]"
									:for="`${j}${c.content}`"
								>
									{{ c.content }}
								</label>
							</div>
						</li>
					</div>
				</ol>

				<div class="lv-btn-group flex">
					<Button
						text="Check Answers"
						bgcolor="transparent"
						color="var(--primary-color)"
						variant="outlined"
						@click="onCheckAnswer"
					/>
					<Button
						text="Reset Quiz"
						bgcolor="transparent"
						color="var(--primary-color)"
						variant="outlined"
						@click="reset"
					/>
					<Button
						text="Show Answers"
						bgcolor="transparent"
						color="var(--primary-color)"
						variant="outlined"
						@click="onShowAnswers"
					/>
				</div>
			</div>
			<!--  -->
			<div v-if="currentTab === 1">
				<div style="width: 100%">
					<div
						style="margin: 2rem 0"
						v-for="(item, i) in grammar.Items"
						:key="i"
					>
						<h2
							style="
								background-color: var(--primary-color);
								width: 100%;
								padding: 0.5rem;
							"
						>
							<b>Points:</b> {{ item.Point }}
						</h2>
						<p>{{ item.Examples }}</p>
						<br />
					</div>
				</div>
			</div>
		</section>
	</div>
</template>
<script>
import Header from "@/components/Header.vue";
import incorrectIcon from "@/assets/resources/icons/checkAnswer/incorrect.gif";
import correctIcon from "@/assets/resources/icons/checkAnswer/correct.gif";
import Button from "@/components/Button.vue";
import grammarApi from '@/apis//grammarApi.js'
export default {
	name: "GrammarDetailView",
	created() {
		this.fetchGrammar()
	},
	data() {
		return {
			checkAnswer: false,
      		showAnswer: false,
			currentTab: 0,
			corrImg: correctIcon,
			incorrImg: incorrectIcon,
			showScore: false,
			score: 0,
			correctAnswers: [],
			grammar: [],
			questions: [],
			answers:[],
		};
	},
	methods: {
		reset() {
			if (window.confirm("Do you want reload page again?")) {
				window.location.reload();
			}
		},
		toggleTab(t) {
			this.currentTab = t;
		},
		async fetchGrammar() {
			
			try {
				const response = await grammarApi.getGrammar(this.$route.params.id);
				if (response.status === 200) {
					this.grammar = response.data.grammar;
					this.questions= response.data.questions&&response.data.questions||[]
					console.log(response.data);
				}
			} catch (error) {
				throw error;
			}
		},
		onCheckAnswer(){
			 console.log(this.answers, this.correctAnswers);
      //check answers by qid
      if (this.answers.length>0&&this.answers.length !== this.questions.length) {
        if (window.confirm("Select the answer to all questions.")) {
          window.close();
        }
      } else {
        this.checkAnswer = true;
        this.showAnswer = true;

        this.setShowScores();
         this.showScore = true;
      }
		},
		onShowAnswers(){
			  this.showAnswer = true;
		},
		   setShowScores() {
      let score = 0;
      for (var i = 0; i < this.questions.length; i++) {
        for (var j = 0; j < this.answers.length; j++) {
          if (this.answers[j].qid === this.questions[i]._id) {
            if (this.questions[i].Answers[this.answers[j].ansIndex].isCorrect) {
              score += 1;
            }
          }
        }
      }
      this.score = score;
      console.log(score);
    },
     f(qid) {
      for (var i = 0; i < this.answers.length; i++) {
        if (this.answers[i].qid === qid) {
          return this.answers[i].ansIndex;
          break;
        }
      }
    },
        handleCheck(qid, ans, ansIndex) {
      try {
        const arr = this.answers;
        if (arr.length > 0) {
          //check if this question has a previous answer
          let index = arr.findIndex((a) => a.qid === qid);

          if (index !== -1) {
            //overwrite previous answer value
            arr[index]["answer"] = ans;
            arr[index]["ansIndex"] = ansIndex;
            // console.log('exists');
          } else {
            arr.push({ qid: qid, answer: ans, ansIndex: ansIndex });
            // console.log('not exists');
          }
          this.answers = arr;
          // console.log(arr,this.answers);
        } else {
          arr.push({ qid: qid, answer: ans, ansIndex: ansIndex });
          this.answers = arr;
          // console.log(this.answers);
        }
        console.log(qid, ans, this.answers);
      } catch (error) {
        throw error;
      }
    },
	},
	components: {
		Header,
		Button,
		incorrectIcon,
		correctIcon,
	},
};
</script>
<style></style>
