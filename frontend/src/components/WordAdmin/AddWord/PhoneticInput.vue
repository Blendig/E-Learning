<template>
	<div>
		<div class="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12">
			<div class="phonetic-root-pn">
				<span v-for='(p,i) in IPA_CHARS' :key='i' role='button' @click="$emit('handle-phonetic-text',p)">
				
				{{p}}
			
			    </span>
				<span>
					<button type='button' @click='$emit("close-pho-kb")'>Close</button>
				</span>
			</div>
			
		</div>
	</div>
</template>
<script>
	

	export default{
		name:'PhoneticInput',
		data(){
			return{
				IPA_CHARS
			}
		}
	}
const IPA_CHARS = [
  "'",
  'ɪ',
  'iː',
  'ʊ',
  'uː',
  'e',
  'ə',
  'ɜː',
  'ɔː',
  'æ',
  'ʌ',
  'aː',
  'ɒ',
  'ɪə',
  'eɪ',
  'ʊə',
  'ɔɪ',
  'əʊ',
  'aɪ',
  'aʊ',
  'tʃ',
  'dʒ',
  'θ',
  'ð',
  'ʃ',
  'ŋ',
  'ʒ',
];

</script>
<style>
	
@media (min-width: 768px){
	.phonetic-root-pn {
    grid-template-columns: repeat(10, 1fr);
}
}

.phonetic-root-pn {
    gap: 0.6rem;
    display: grid;
    padding: 1.2rem;
    box-shadow: var(--box-shadow);
    border-radius: var(--border-radius);
    background-color: var(--bg-color-main);
  
    grid-template-columns: repeat(10, 1fr);
}
.MuiGrid-spacing-xs-3 > .MuiGrid-item {
    padding: 12px;
}

.MuiGrid-grid-xs-12 {
    flex-grow: 0;
    max-width: 100%;
    flex-basis: 100%;
}

.MuiGrid-item {
    margin: 0;
    box-sizing: border-box;
}

.phonetic-root-pn span {
   color: var(--text-color);
    cursor: pointer;
    padding: 0.1rem;
    font-size: 1.3rem;
    text-align: center;
    transition: all 0.25s;
    font-weight: 400;
    border-radius: var(--sm-border-radius);
    background-color: var(--bg-color-accent);
}
</style>