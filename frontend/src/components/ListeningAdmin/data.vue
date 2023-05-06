<template>
  <div>
    <div class="makeStyles-root-128" v-for="(item, i) in list" :key="i">
      <div class="makeStyles-root-67 flex-center-between">
        <div
          class="w1-100 flex-center--ver"
          role="button"
          @click="$router.push(`/admin/listening/details/${item._id}`)"
        >
          <img class="makeStyles-picture-68" :src="item.Image" alt="" />
          <div class="ml-8 flex-grow-1">
            <h3 class="makeStyles-word-69">
              <span class="makeStyles-type-70">
                {{ item.Name }}
              </span>
            </h3>
            <p class="makeStyles-phonetic-71 phonetic" v-if="item.Topic">
              {{ item.Topic }}
            </p>
            <p class="makeStyles-mean-72">Create Date: {{ item.CreateDate }}</p>
          </div>
        </div>
        <div className="flex-center--ver">
          <div className="mr-5">
            <button
              class="icon-btn"
              @click="$router.push(`/admin/listening/edit/${item._id}`)"
            >
              <PencilIcon />
            </button>
          </div>
          <button class="icon-btn" @click="$emit('delete-listen-item',item._id)">
            <DeleteIcon />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import DeleteIcon from "../../assets/svgs/Delete.vue";
import PencilIcon from "../../assets/svgs/Pencil.vue";

export default {
  name: "ListeningAdminData",
  props: {
    list: Array,
  },
  components: {
    DeleteIcon,
    PencilIcon,
  },
};
</script>
<style type="css"></style>
