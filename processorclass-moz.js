console.log("processorclass.js running");
class MyAudioProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
  }

  process(inputList, outputList, params) {
    /* using the inputs as needed, write the output
         into each of the outputs.

         Each input is an array of channels, left / right
         speakers etc. Each input is an array of
         `Float32Array` objects

         Also, there can be multiple inputs, so the input list
         is an array of `Float32Array` ojects.

         Each input may have a different number of channels and
         each channel has its own array of samples.

         The output list is structured in the same way, it's an
         array of channels, each of which is an array of
         Float32Array objects, which contain the samples for
         that channel.
          */

    // process each input, with each input being used to generate
    // the corresponding output.
    // ignore any extra inputs.
    const sourceLimit = Math.min(inputList.length, outputList.length);

    for (let inputNum = 0; inputNum < sourceLimit; inputNum++) {
      let input = inputList[inputNum];
      let output = outputList[inputNum];

      let channelCount = Math.min(input.length, output.length);

      for (let channelNum = 0; channelNum < channelCount; channelNum++) {
        let sampleCount = input[channelNum].length;

        for (let i = 0; i < sampleCount; i++) {
          let sample = input[channelNum][i];

          // manipulate the sample:
          output[channelNum][i] = sample;
        }
      }
    }

    // keep the processor alive
    return true;
  }
}

registerProcessor("my-audio-processor", MyAudioProcessor);
