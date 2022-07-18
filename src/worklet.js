console.log("Worklet.js connected");
/* a complete example of GainNode built on top of AudioWorkletNode and AudioWorkletProcessor. Depends on `gain-processor.js */
const Btn = document.getElementById("btn");
Btn.addEventListener("click", runWorklet, false);

// function showAlert() {
//   runWorklet();
// }

function runWorklet() {
  const Actx = new AudioContext();
  Btn.innerHTML = "Running";

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
    console.log(osc.context.state);
    window.addEventListener("keydown", play, false);
    osc.playing = false;

    function play(e) {
      window.addEventListener("keyup", stop, false);

      gainParam.setValueAtTime(1, Actx.currentTime);

      if (osc.playing === false) {
        osc.start();
        osc.playing = true;
      }
      console.log(osc.context.state);
      function stop(e) {
        // console.log(gainParam);
        // gainParam.setValueAtTime(1, Actx.currentTime);
        gainParam.linearRampToValueAtTime(0, Actx.currentTime + 0);
        // gainParam.linearRampToValueAtTime(0, Actx.currentTime + 6);

        // osc.stop(Actx.currentTime + 3);
      }
    }
    // osc.start();
  });
}
