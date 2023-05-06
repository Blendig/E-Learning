<template>
    <div>
        <RouterLink :to='to' class='nvb-root flex-center--ver'>
            <img class='nvb1-icon' :src='imgUrl' alt='Icon'/>
             <div>
                <h2 class='nvb1-title'>{{title}}</h2>
                <p class='nvb1-subTitle'>{{subTitle}}</p>
             </div>
        </RouterLink>
    </div>
</template>
<script>
export default {
    name: "NavigationAdminBox",
    props: {
        imgUrl: "",
        title: "",
        to: "",
        subTitle: "",
    },
};
</script>
<style lang="css">
.flex-center--ver{
    display: flex;
    align-items: center;
}
.nvb1-icon {
    width: 2.5rem;
    height: 2.5rem;
    margin-right: 1.4rem;
}
.nvb1-title{
    color: var(--primary-color);
    font-size: 1.3rem;
    font-weight: 600;
    letter-spacing: 0.5px;
    text-transform: none;
}

</style>
