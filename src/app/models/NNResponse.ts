class NNInput {
  s1: number;
  s2: number;
  s3: number;
  s4: number;
  s5: number;
  s6: number;
  s7: number;
  s8: number;
  s9: number;
  s10: number;
  s11: number;
  s12: number;
  s13: number;
  s14: number;
  s15: number;
  s16: number;
  s17: number;
  s18: number;
  s19: number;
  s20: number;
  s21: number;
  s22: number;
  s23: number;
  s24: number;
  s25: number;

  constructor() {
    this.s1 = 0;
    this.s2 = 0;
    this.s3 = 0;
    this.s4 = 0;
    this.s5 = 0;
    this.s6 = 0;
    this.s7 = 0;
    this.s8 = 0;
    this.s9 = 0;
    this.s10 = 0;
    this.s11 = 0;
    this.s12 = 0;
    this.s13 = 0;
    this.s14 = 0;
    this.s15 = 0;
    this.s16 = 0;
    this.s17 = 0;
    this.s18 = 0;
    this.s19 = 0;
    this.s20 = 0;
    this.s21 = 0;
    this.s22 = 0;
    this.s23 = 0;
    this.s24 = 0;
    this.s25 = 0;
  }
}

class NNOutput {
  e1: number;
  e2: number;
  e3: number;
  e4: number;
  e5: number;
  e6: number;
  e7: number;
  e8: number;
  e9: number;
  e10: number;

  constructor() {
    this.e1 = 0;
    this.e2 = 0;
    this.e3 = 0;
    this.e4 = 0;
    this.e5 = 0;
    this.e6 = 0;
    this.e7 = 0;
    this.e8 = 0;
    this.e9 = 0;
    this.e10 = 0;
  }
}

class NNOutputFormat {
    e1: string;
    e2: string;
    e3: string;
    e4: string;
    e5: string;
    e6: string;
    e7: string;
    e8: string;
    e9: string;
    e10: string;

    constructor() {
        this.e1= 'Leucemia',
        this.e2= 'Linfoma',
        this.e3= 'Tumores del sistema nervioso central',
        this.e4= 'Neuroblastoma',
        this.e5= 'Tumores Oseos',
        this.e6= 'Sarcomas de partes blandas',
        this.e7= 'Retinoblastomas',
        this.e8= 'Tumor de celulas germinales',
        this.e9= 'Tumor Hepatico',
        this.e10= 'Histiocitosis de celulas de Langerhans'
    }
}

export class NNResponse {
  inputs: NNInput;
  outputs: NNOutput;
  names: NNOutputFormat;

  constructor() {
    this.inputs = new NNInput();
    this.outputs = new NNOutput();
    this.names = new NNOutputFormat();
  }
}
