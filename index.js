class RandomGenerator {
  constructor(customString) {
    /*
    A class for generating random strings with customizable options. A predefined list of characters are used to generate a unique combination. Any custom strings will be saved as "customString"
    */
    // TODO: IMPLEMENT CUSTOM STRING REPEAT OR INCLUSION
    this.customString = customString;
    this.customCharacterSetAlphaLower = "abcdefghijklmnopqrstuvwxyz";
    this.customCharacterSetAlphaUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    this.customCharacterSetNumeric = "0123456789";

    this.customCharacterSetSymbols = "!@#$%^&*()-_+=<>?";
    this.customCharacterSetSpecial = "[]{}|;:',./";

    this.customCharacterSetPunctuation = ". , ; :";
    this.customCharacterSetMath = "=+-*/";
    this.selectedArrayHistory = [];
    this.vocabularyOptions = [];

    this.currentLengthLimit = 13;
  }

  getRndInteger(min, max) {
    /* 
    Generates a random integer within a specified range.
    Parameters:
      - min: Minimum value of the range.
      - max: Maximum value of the range.
    Returns: Random integer within the specified range.

    */
    return Math.floor(Math.random() * (max - min)) + min;
  }

  generateNum(nChars, maxGroups) {
    /* 
        Generates a new random numeric string based on the specified req.
        Parameters:
          - nChars: Length of the string to be generated.
          - maxGroups: Maximum number of groups to be generated.
        Returns: Random numeric string with specified characteristics.
    */
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
    }
    return completeNumber;
  }

  getCharFromString(value) {
    /*
    Retrieves a character from the vocabulary based on the provided value.
    Parameters:
      - value: Numeric value used to determine the character.
    Returns: Character from the vocabulary based on the provided value.
    */
    let arr_index = this.getRndInteger(0, this.vocabularyOptions.length);
    if (
      this.selectedArrayHistory[-1] == arr_index ||
      this.selectedArrayHistory[-2] == arr_index ||
      this.selectedArrayHistory[-3] == arr_index
    ) {
      arr_index = this.getRndInteger(0, 7);
    }
    this.selectedArrayHistory.push(arr_index);
    let selectedArray = this.vocabularyOptions[arr_index];
    let char_index = value % selectedArray.length;
    return selectedArray[char_index];
  }

  createVocabulary(vocabulary) {
    /*
    Creates the vocabulary based on the provided criteria.
    Parameters:
      - vocabulary: Array specifying the character groups to include in the vocabulary.
    Returns: None
    */

    const addCharSet = (name, set) => {
      if (vocabulary.includes(name)) {
        this.vocabularyOptions.push(set);
      }
    };

    if (vocabulary.includes("all")) {
      this.vocabularyOptions.push(this.customCharacterSetAlphaLower);
      this.vocabularyOptions.push(this.customCharacterSetAlphaUpper);
      this.vocabularyOptions.push(this.customCharacterSetNumeric);
      return;
    }

    addCharSet("lowercase", this.customCharacterSetAlphaLower);
    addCharSet("uppercase", this.customCharacterSetAlphaUpper);
    addCharSet("numeric", this.customCharacterSetNumeric);
    addCharSet("symbols", this.customCharacterSetSymbols);
    addCharSet("specials", this.customCharacterSetSpecial);

    // TODO:CHECK IF NECESSARY
    // if (vocabulary.includes("spaces")) {
    //   this.vocabularyOptions.push(this.customCharacterSetSpace);
    // }
  }

  generate(
    nChars = this.currentLengthLimit,
    vocabulary = ["lowercase", "numeric"]
  ) {
    /* 
        Generates a truly random string based on the time and random calculations with specified characteristics.
        Parameters:
        nChars: Length of the string to be generated.
        vocabulary: Array specifying the character groups to include in the string.
        valid values : ["all", "uppercase", "lowercase", "numeric", "symbols", "specials"]
        Returns: Random string with specified characteristics
    */
    let maxGroups = Math.floor(nChars / this.currentLengthLimit) + 1;
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

console.log(myConst.generate(40));
