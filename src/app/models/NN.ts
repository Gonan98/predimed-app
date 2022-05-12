export class Neuron {
    name: string;
    value: number;

    constructor(name: string, value: number) {
        this.name = name;
        this.value = value;
    }
}

export class NeuralNetwork {
    inputs: Neuron[];
    outputs: Neuron[];
    maxOutput: Neuron;

    constructor() {
        this.inputs = [];
        this.outputs = [];
        this.maxOutput = new Neuron('', 0);
    }
}