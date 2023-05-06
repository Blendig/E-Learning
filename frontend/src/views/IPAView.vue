<template lang="">
    <div>
        <Header/>
        <div >
            <div class='ipa-header'>

            <h1 :style='{color: "#CA3600" }'>
                Pronunciation
            </h1>
            <h2 :style='{color: "#fff" }'>
                Introduction to The Sounds of English
            </h2>
        </div>
     <p align="center">
        <iframe
          src="https://www.youtube.com/embed/fdRmGvmeY1U?enablejsapi=1"
          width="500"
          height="300"
        ></iframe>
      </p>
        </div>
        <div class='flex justify-content-center'>
            This is the introductory video to our The sounds of English series
        </div>
        <div class='ipa-list'>
            <ol>
                <li>
                    <p>1. Vowels</p>
                </li>
                <li>
                    <p>2. Diphthongs</p>
                </li>
                <li>
                    <p>3. Consonants</p>
                </li>
            </ol>
        </div>
    </div>
</template>
<script>
import Header from "@/components/Header.vue";

export default {
  name: "IPAView",
  components: {
    Header,
  },
};
</script>
<style lang="css">
.ipa-header{
    text-align: center;
    line-height: 2;
}
.ipa-list{
    color:var(--title-color);
    font-size:1.7rem;

}
.ipa-list ol{
    list-style: none;
}
</style>