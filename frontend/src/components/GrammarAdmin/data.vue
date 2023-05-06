<template>
    <ul class="makeStyles-list-231" style="list-style:none">
      <li>
        <div class="makeStyles-root-128" v-for="(item, i) in list" :key="i">
          <div class="makeStyles-root-67 flex-center-between">
            <div
              class="w1-100 flex-center--ver"
              role="button"
              @click="$router.push(`/admin/grammar/details/${item._id}`)"
            >
              <img class="makeStyles-picture-68" :src="item.Image" alt="" />
              <div class="ml-8 flex-grow-1">
                <h3 class="makeStyles-word-69">
                  <span class="makeStyles-type-70">
                    {{ item.Title }}
                  </span>
                </h3>
                <p class="makeStyles-phonetic-71 phonetic" v-if="item.Level">
                  Level: {{ item.Level }}
                </p>
                <p class="makeStyles-mean-72">
                 {{ item.Content }}
                </p>
              </div>
            </div>
            <div className="flex-center--ver" style="display:flex">
              <div className="mr-5">
                <button
                  class="icon-btn"
                  @click="$router.push(`/admin/grammar/edit/${item._id}`)"
                >
                  <PencilIcon />
                </button>
              </div>
              <button
                class="icon-btn"
                @click="$emit('remove-grammar-item', item._id)"
              >
                <DeleteIcon />
              </button>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </template>
    <script>
  import DeleteIcon from "@/assets/svgs/Delete.vue";
  import PencilIcon from "@/assets/svgs/Pencil.vue";
  
  export default {
    name: "GrammarAdminData",
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
    