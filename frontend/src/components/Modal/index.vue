<template lang="">
    <div class='modal-container'>
       
      <div class='flex'>
        <div class='modal-btn'>
            <Button text='COME BACK' color='#fff' bgcolor='grey' width='150px'/>
        </div>
            <Button text='BEGIN' color='#fff' />
    </div>
    </div>
</template>
<script>
import Button from "../Button.vue";

export default {
  name: "VModal ",
  components: {
    Button,
  },
};
</script>
<style lang="css">
.modal-container {
  height: 100%;
  width: 100%;
}
.modal-btn {
  margin-right: 1rem;
}
</style>