console.log("Worklet.js connected");
/* a complete example of GainNode built on top of AudioWorkletNode and AudioWorkletProcessor. Dependends on `gain-processor.js */
const Btn = document.getElementById("btn");
Btn.addEventListener("click", worklet, false);

function worklet(e) {
  Btn.innerHTML = "STOP";

  const Actx = new AudioContext();

  // load module  via AudioWorklet
  Actx.audioWorklet.addModule("src/gain-processor.js").then(() => {
    let osc = new OscillatorNode(Actx);

    // after the mmodule is loaded, an AudioWorkletNode
    // can be constructed
    let gainWorkletNode = new AudioWorkletNode(Actx, "gain-processor");

    // audioWorkletNode can be interoperable with other native nodes
    osc.connect(gainWorkletNode).connect(Actx.destination);
    osc.start();
    alert(
      "Thanks! That's all this test does at the moment,  please refresh the page to stop that noise!!!"
    );
  });
}
