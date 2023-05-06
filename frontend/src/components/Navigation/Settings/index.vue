<template  >
  <div @click.stop="">
    <div class="__modal_wrapper __modal_backdrop">
      <div class="md-container">
        <div class="game-paper">
          <div class="game-content">
            <div class="game-form-title flex flex-space-between">
              <h2>Settings</h2>
              <button
                class="icon-btn cur-pointer"
                @click="$emit('open-settings')"
              >
                <CloseIcon />
              </button>
            </div>
            <div class="settings-pane">
              <div class="sc-content-item">
                <!-- theme setting -->
                <div class="sc-settings">
                  <h2 class="content-label">Topic</h2>
                  <div class="flex">
                    <button
                    :class="[current==='light'&&'icon-btn current'||'icon-btn']"

                      @click="toggleDarkLight(THEME_KEYS.LIGHT,'light')"
                    >
                      <SunIcon />
                    </button>
                    <button
                    :class="[current==='dark'&&'icon-btn current'||'icon-btn']"

                      @click="toggleDarkLight(THEME_KEYS.DARK,'dark')"
                    >
                      <MoonIcon />
                    </button>
                    <button 
                    :class="[current==='palette'&&'icon-btn current'||'icon-btn']"
                    @click='onCustomThemeClick'
                    ><ColorIcon /></button>
                  </div>
                  <br />
                  <div  class="flex">
                    <div
                      class="color-item"

                      v-for="(c, i) in colors"
                      :key="i"
                      :title="c.label"
                      :style="`background-color: ${c.color}`"
                    >
                      <input type="color" :value="c.color" />
                    </div>
                  </div>
                </div>
                <!-- Voice settings -->

                <div class="sc-content-item">
                  <h2 class="content-label">Accent</h2>
                  <div class="grid-container">
                    <div class="">
                      <div class="input-container">
                        <span>Voice</span>
                        <div>
                          <select v-model='form.voice'>
                            <option value='voice' v-for="(voice, i) in voices" :key="i">
                              {{ voice.name }}
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style="float: right">
                    <Button text="Close" color="#fff" @click="$emit('open-settings')"/>
                  </div>
                </div>

                <!-- Toggle nav button -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CloseIcon from "@/assets/svgs/Close.vue";
import MoonIcon from "@/assets/svgs/Moon.vue";
import SunIcon from "@/assets/svgs/Sun.vue";
import ColorIcon from "@/assets/svgs/Color.vue";
import Button from "../../Button.vue";
import { THEME_KEYS } from "@/constants/index";
import {
  debounce,
  getCustomPalettes,
  setRootPalettes,
} from "@/helper/index.js";

export default {
  name: "Settings",
  props:{
    open:Boolean

  },
  created() {
    this.loadData();
  },
  data() {
    return {
      colors: [],
      voices: [],
      currentTheme: null,
      palettes: null,
      THEME_KEYS,
      voice:null,
      form:{voice:null},
      current:'palette'
    };
  },
  methods: {
    setVoiceChoice(index){
       this.voice= this.voices[index]
       console.log(this.voice)
    },
    loadData() {
      let globalVoices = [];
      const intervalId = setInterval(() => {
        const voiceList = window.speechSynthesis.getVoices();
        if (voiceList.length > 0) {
          globalVoices = voiceList.filter((i) => i.lang.indexOf("en") !== -1);
          this.voices = voiceList.filter((i) => i.lang.indexOf("en") !== -1);
          clearInterval(intervalId);
         // console.log(globalVoices);
        }
      }, 50);
    
      this.colors = getCustomPalettes()
      this.palettes= getCustomPalettes()
      
      localStorage.getItem(THEME_KEYS.LS_KEY) || THEME_KEYS.LIGHT;
    },
    onColorChange(colorVal) {
      let debounceTimer = null;
      const htmlRoot = document.querySelector(":root");
      debounceTimer = debounce(debounceTimer, () => {
        // Update UI
        htmlRoot.style.setProperty(colorKey, colorVal);

        // update local storage
        const lsPalettes = JSON.parse(
          localStorage.getItem(THEME_KEYS.PALETTE_KEY)
        );

        localStorage.setItem(
          THEME_KEYS.PALETTE_KEY,
          JSON.stringify(
            lsPalettes.map((item) =>
              item.key === colorKey ? { ...item, color: colorVal } : item
            )
          )
        );

        // Update input color
        //setValue(colorVal);
      });
    },
    onChangeTheme(theme) {
       
      if (theme === this.currentTheme) return;

      const root = document.querySelector(":root");
      if (this.currentTheme === THEME_KEYS.CUSTOM) root.removeAttribute("style"); // reset style
      root.setAttribute(THEME_KEYS.ROOT_KEY, theme);
      localStorage.setItem(THEME_KEYS.LS_KEY, theme);
      console.log(THEME_KEYS,theme);
    },

    toggleDarkLight(theme,curr) {
      this.current=curr
      this.onChangeTheme(theme);
      this.currentTheme = theme;
    },

    onCustomThemeClick(theme) {
        this.current='palette'
      if (theme === this.currentTheme) return;
      this.palettes = getCustomPalettes();
      setRootPalettes();
      this.currentTheme = theme;
      this.onChangeTheme(theme);
    },
  },
  components: {
    CloseIcon,
    MoonIcon,
    SunIcon,
    ColorIcon,
    Button,
  },
};
</script>
<style lang="scss">
.color-item {
  height: 50px;
  width: 60px;

  input {
    width: 100%;
    cursor: pointer;
    height: 100%;
    opacity: 0;
  }
}
.flex-space-between {
  justify-content: space-between;
  svg {
    color: var(--title-color);
    font-size: 1rem;
    height: 1.5rem;
    font-size: 500;
  }
}
.sc-content-item {
  border: solid 1px var(--border-color);
  margin: 1.6rem 0;
  padding: 1.6rem;
  border-radius: var(--sm-border-radius);
  .input-container select{
    border:1px solid #ddd;
    height:2.5rem;
  }
}
.settings-pane {
  padding: 1rem 1.4rem;
  border-top: solid 1px var(--border-color);
  border-bottom: solid 1px var(--border-color);
  background-color: var(--bg-color-sec);
  .content-label {
    font-size: 1.3rem;
    font-weight: 400;
    margin-bottom: 1.2rem;
    text-transform: capitalize;
    color: var(--text-color);
  }
  .icon-btn {
    height: 50px;
    width: 50px;
    margin-right: 1.5rem;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      height: 1.8rem;
      color:var(--text-color);
    }
    :focus {
      border-radius: 1px solid var(--primary-color);
    }
  }
  .current {
    border: 1px solid var(--primary-color);
    svg {
      color: var(--primary-color);
    }
  }
}
.game-paper {
  width: 100%;
  border-radius: var(--border-radius);
  background-color: var(--bg-color-accent);
}
.game-form-title {
  color: var(--title-color);
  padding: 1rem 1.2rem;
  font-size: 1.1rem;
  font-weight: 500;
}
</style>
