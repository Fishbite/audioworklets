console.log("Worklet.js connected");
/* a complete example of GainNode built on top of AudioWorkletNode and AudioWorkletProcessor. Dependends on `gain-processor.js */
const Btn = document.getElementById("btn");
Btn.addEventListener("click", showAlert, false);

function showAlert() {
  runWorklet();
}

function runWorklet() {
  Btn.innerHTML = "Running";

  const Actx = new AudioContext();

  // load module  via AudioWorklet
  Actx.audioWorklet.addModule("src/gain-processor.js").then(() => {
    let osc = new OscillatorNode(Actx);

    // after the mmodule is loaded, an AudioWorkletNode
    // can be constructed
    let gainWorkletNode = new AudioWorkletNode(Actx, "gain-processor");
    console.log(gainWorkletNode.parameters.get("gain"));
    let gainParam = gainWorkletNode.parameters.get("gain");

    // audioWorkletNode can be interoperable with other native nodes
    osc.connect(gainWorkletNode).connect(Actx.destination);
    window.addEventListener("keydown", play, false);

    function play(e) {
      window.addEventListener("keyup", stop, false);
      osc.start();
      function stop(e) {
        console.log(gainParam);
        gainParam.setValueAtTime(2, Actx.currentTime);
        gainParam.exponentialRampToValueAtTime(0.01, Actx.currentTime + 0.075);
        gainParam.linearRampToValueAtTime(0, Actx.currentTime + 0.75);

        osc.stop(Actx.currentTime + 3);
      }
    }
    // osc.start();
  });
}
