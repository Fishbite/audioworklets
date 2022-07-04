console.log("audioWorkelt.js connected");

const actx = null;

async function createMyAudioProcessor() {
  if (!actx) {
    try {
      actx = new AudioContext();
      await actx.resume();
      console.log(actx.state);
      await actx.audioWorklet.addModule("src/processorclass.js");
    } catch (e) {
      return null;
    }
  }

  return new AudioWorkletNode(actx, "processorclass");
}

// now we can create a new audioProcessorNode like this:
let newProcessorNode = createMyAudioProcessor();
console.log(newProcessorNode);
