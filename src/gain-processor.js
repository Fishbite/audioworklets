console.log("gain-processor.js connected");

class GainProcessor extends AudioWorkletProcessor {
  // add custom params with a statiic getter
  static get parameterDescriptors() {
    return [{ name: "gain", defaultValue: 2, minValue: 0, maxValue: 3 }];
  }

  constructor() {
    // .. the super call is required
    super();
  }

  process(inputs, outputs, params) {
    const input = inputs[0];
    const output = outputs[0];
    const volume = params.gain;

    for (let channel = 0; channel < input.length; channel++) {
      const inputChannel = input[channel];
      const outputchannel = output[channel];

      if (volume.length === 1) {
        for (let i = 0; i < inputChannel.length; i++) {
          outputchannel[i] = inputChannel[i] * volume[0];
        }
      } else {
        for (let i = 0; i < inputChannel.length; i++) {
          outputchannel[i] = inputChannel[i] * volume[i];
        }
      }
    }
    return true;
  }
}

registerProcessor("gain-processor", GainProcessor);
