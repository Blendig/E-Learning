<template>
  <div>
    <div class="md-container">
      <section class="flex justify-content-center align-items-center">
        <div class="form-card">
          <PageTitle title="Choose from a vocabulary pack"></PageTitle>
          <form>
            <div class="input-container">
              <span>Word type</span>
              <div>
             
                <select>
                    <option value="">Select</option>
                </select>
            
              </div>
            </div>
          </form>
          <div>
            <div class="flex">
              <div class="modal-btn">
                <Button
                  text="COME BACK"
                  color="#fff"
                  bgcolor="grey"
                  width="150px"
                  
                />
              </div>
              <Button text="BEGIN" color="#fff" />
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import VModal from "../../components/Modal/index.vue";
import PageTitle from "../../components/PageTitle.vue";
import Button from "../../components/Button.vue";

export default {
  name: "CorrectWord",
  components: {
    VModal,
    PageTitle,
    Button,
  },
};
</script>
<style lang="css">
section {
  width: 100%;
}
.form-card {
  width: 100%;
}
</style>