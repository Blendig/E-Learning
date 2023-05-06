let globalVoices = [];
const intervalId = setInterval(() => {
    const voiceList = window.speechSynthesis.getVoices();
    if (voiceList.length > 0) {
      globalVoices = voiceList.filter((i) => i.lang.indexOf('en') !== -1);
      setVoices(voiceList.filter((i) => i.lang.indexOf('en') !== -1));
      clearInterval(intervalId);
    }
  }, 50);
