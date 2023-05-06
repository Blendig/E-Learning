<template>
    <div class="f-shell">

   
    <div class="f-main flex justify-content-center flex-direction-column align-items-center">
        <div class="f-container">
            <form>
                <div class="flex flex-direction-column align-items-center">
                    <div class="f-header">
                        <img src="" alt="logo"/>
                        <h1>Forgot password</h1>
                    </div>
                    <div class="input-container">
                        <span>Email</span>
                        <div>
                            <input type="email" placeholder="Enter email"/>
                        </div>
                    </div>
                    <div>
                        <Button type="submit" color="#fff" text="LOG IN"/>
                    </div>
                </div>
            </form>
        </div>
        <div>
            <br/>
        Quay lại trang 
            <RouterLink to="/login">Log in</RouterLink>
            
    </div>
    </div>
   
</div>
</template>

<script>
import Button from '../components/Button.vue'
    export default{
        name:'ForgotPasswordView',
        components:{
            Button
        }
    }
</script>

<style>
.f-header{
    color:#fff;
    margin:0 0 1rem;
}
.f-shell{
    width:100%; 
}
.f-cta{
    color:#eeb655;
    margin:0 0 2rem;
    float:right;
    text-align:right;
}
.f-main{
    height:100vh;
    width:100%;
}
.input-container{
    width:100%;
    padding:.2rem .5rem;
    display:block;
    border:1px solid var(--vt-c-divider-dark-1);
   
    border-radius:.3rem;
}
.input-container input{
    height:2rem;
    padding:.5rem 0;
    border:0;
    width:100%;
    background-color:inherit;
    color:#fff;
    font-size:1rem;
}
.input-container input:focus{
    border:0;
    outline:0;
}  
.input-container span{
    font-size:small;
} 
.f-container{
        width:23rem;
        border-radius:.4rem;
        height:auto;
        box-shadow:2px 4px 6px #111;
        padding:2rem;
    }
</style>