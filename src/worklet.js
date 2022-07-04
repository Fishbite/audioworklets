console.log("Worklet.js connected");
/* a complete example of GainNode built on top of AudioWorkletNode and AudioWorkletProcessor. */
const actx = new AudioContext();

// load module  via AudioWorklet
actx.audioWorklet.addModule("src/gain-processor.js").then(() => {
  let osc = new OscillatorNode(actx);

  // after the mmodule is loaded, an AudioWorkletNode
  // can be constructed
  let gainWorkletNode = new AudioWorkletNode(actx, "gain-processor");

  // audioWorkletNode can be interoperable with other native nodes
  osc.connect(gainWorkletNode).connect(actx.destination);
  osc.start();
});
