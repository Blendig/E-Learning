<script>

 export default{
        data(){
            return {
                text:'Welcome to the English Website',
                subText:'Where to start learning English from 0'
            }
        },
        methods:{
          
        },
      
    }
</script>
<template>
    <div  class="landing-container">
    <div class="c-wrap">
        <img src='../assets/resources/images/logo-lg.png' alt=""/>
        <div>
            <h1>{{text}}</h1>
        </div>
        <p class="sub-text">{{subText}}</p>
        <div>
            <RouterLink to="/home">
                <button>
                    BEGIN 
                </button>
            </RouterLink>
        </div>
    </div>
</div>
</template>

<style scoped>
    h1{
        font-size:3rem;
        color:#68c2e8;
        font-weight:bold;
    }
    img{
        margin-bottom:1.2rem;
        width:12rem;
        height:auto;
    }
    button{
        margin:2rem 0 1rem;
        height:3.2rem;
        min-width:7rem;
        font-size:1rem;
        background-color:#68c2e8;
        font-weight:bold;
        color:#fff;
        cursor:pointer;
    }
    .sub-text{
        font-size:1.5rem;
    }
    .c-wrap{
        display:flex;
        justify-content:center;
        flex-direction:column;
        align-items:center;
       
    }

</style>
