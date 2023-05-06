<template lang="">
   <span class="MuiButton-endIcon MuiButton-iconSizeMedium">
        
        <svg class="MuiSvgIcon-root ani-spin" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
					<path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z">

					</path>
				</svg>
            </span>
</template>
<script>
export default {
  name: "SpinnerIcon",
};
</script>
<style lang="scss" scoped>

.ani-spin {
  -webkit-animation-name: spinAni;
  animation-name: spinAni;
  -webkit-animation-duration: 800ms;
  animation-duration: 800ms;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  -webkit-animation-timing-function: linear;
  animation-timing-function: linear;
  color:var(--primary-color);
}

@-webkit-keyframes spinAni {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes spinAni {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

// fade
.ani-fade {
  -webkit-animation: fadeAni 0.45s ease-in-out;
  animation: fadeAni 0.45s ease-in-out;
}

@-webkit-keyframes fadeAni {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeAni {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}


.ani-zoom {
  -webkit-animation: zoom 0.35s linear forwards;
  animation: zoom 0.35s linear forwards;
}

@-webkit-keyframes zoom {
  from {
    transform: scale(0);
  }
  to {
    transform: none;
  }
}

@keyframes zoom {
  from {
    transform: scale(0);
  }
  to {
    transform: none;
  }
}

.MuiButton-endIcon {
  display: inherit;
  margin-left: 8px;
  margin-right: -4px;
}
.MuiSvgIcon-root {
  fill: currentColor;
  width: 1em;
  height: 1em;
  display: inline-block;
  font-size: 2rem;
  transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  flex-shrink: 0;
  user-select: none;
}

.ani-spin {
  animation-name: spinAni;
  animation-duration: 800ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
</style>