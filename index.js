const os = require("os");

class RandomGenerator {
  constructor(uniqueIntegers) {
    this.uniqueIntegers = uniqueIntegers;
    this.customCharacterSetAlphaLower = "abcdefghijklmnopqrstuvwxyz";
    this.customCharacterSetAlphaUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    this.customCharacterSetNumeric = "0123456789";

    this.customCharacterSetSymbols = "!@#$%^&*()-_+=<>?";
    this.customCharacterSetSpecial = "[]{}|;:',./";
    this.customCharacterSetSpace = " ";

    this.customCharacterSetPunctuation = ". , ; :";
    this.customCharacterSetMath = "=+-*/";
    this.selectedArrayHistory = [];
    this.vocabularyOptions = [];
  }

  getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  generateNum(nChars, maxGroups) {
    const random = Math.floor(Math.random() * (20 - 10 + 1) + 10);
    let currentT = (Date.now() * random).toString();

    let uniqueValue = (
      currentT.substring(3) * currentT.substring(3)
    ).toString();

    let trulyRandomNumber = uniqueValue.substring(4, nChars);

    const preNumber1 = this.getRndInteger(10, 20).toString();
    const preNumber2 = this.getRndInteger(10, 20).toString();

    let completeNumber = preNumber1 + preNumber2 + trulyRandomNumber;
    for (let i = 0; i < maxGroups; i++) {
      let temp = (parseInt(completeNumber) * preNumber1) / preNumber2;
      completeNumber = completeNumber + temp.toString().substring();
      console.log("________________");
      console.log(temp);
    }
    return completeNumber;
  }

  getCharFromString(value) {
    let arr_index = this.getRndInteger(0, this.vocabularyOptions.length);
    if (
      this.selectedArrayHistory[-1] == arr_index ||
      this.selectedArrayHistory[-2] == arr_index ||
      this.selectedArrayHistory[-3] == arr_index
    ) {
      console.log("had to skip!!");
      console.log(arr_index);
      console.log("^ OLD -------- v NEW");
      arr_index = this.getRndInteger(0, 7);
      console.log(arr_index);
    }
    this.selectedArrayHistory.push(arr_index);
    let selectedArray = this.vocabularyOptions[arr_index];
    let char_index = value % selectedArray.length;
    return selectedArray[char_index];
  }

  createVocabulary(vocabulary) {
    if (vocabulary.includes("all")) {
      this.vocabularyOptions.push(this.customCharacterSetAlphaLower);
      this.vocabularyOptions.push(this.customCharacterSetAlphaUpper);
      this.vocabularyOptions.push(this.customCharacterSetNumeric);
      return;
    }
    if (vocabulary.includes("lowercase")) {
      this.vocabularyOptions.push(this.customCharacterSetAlphaLower);
    }

    if (vocabulary.includes("uppercase")) {
      this.vocabularyOptions.push(this.customCharacterSetAlphaUpper);
    }

    if (vocabulary.includes("numeric")) {
      this.vocabularyOptions.push(this.customCharacterSetNumeric);
    }
    if (vocabulary.includes("symbols")) {
      this.vocabularyOptions.push(this.customCharacterSetSymbols);
    }

    if (vocabulary.includes("specials")) {
      this.vocabularyOptions.push(this.customCharacterSetSpecial);
    }

    if (vocabulary.includes("spaces")) {
      this.vocabularyOptions.push(this.customCharacterSetSpace);
    }
  }

  generate(nChars = 13, vocabulary = ["lowercase", "numeric"]) {
    let maxGroups = Math.floor(nChars / 13) + 1;

    this.createVocabulary(vocabulary);
    let trulyRandomNumber = this.generateNum(nChars, maxGroups);
    let trulyRandomString = "";
    for (let i = 0; i < trulyRandomNumber.length; i++) {
      let value = this.getCharFromString(trulyRandomNumber[i]);
      if (value != undefined) trulyRandomString += value;
    }
    console.log(trulyRandomNumber);
    return trulyRandomString.substring(trulyRandomString.length - nChars);
  }
}

const myConst = new RandomGenerator();

console.log(myConst.generate(20));
