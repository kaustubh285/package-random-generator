/**
 * RandomGenerator - A class for generating customizable random strings.
 *
 * This class provides a flexible and customizable solution for generating random strings
 * based on various character sets and user-defined criteria. It incorporates a predefined
 * list of character groups, allowing users to create unique combinations for their specific needs.
 *
 * Usage:
 * - Instantiate the RandomGenerator class with an optional custom string.
 * - Utilize the `generate` method to generate random strings with specified characteristics.
 *
 * Important Considerations:
 * - The class supports a variety of character groups, including lowercase, uppercase, numeric,
 *   symbols, and specials. Users can customize string generation by specifying desired character
 *   groups in the `vocabulary` parameter of the `generate` method.
 * - The `generate` method takes two optional parameters: `nChars` (length of the generated string)
 *   and `vocabulary` (array of character groups to include).
 * - Users can easily extend or modify the predefined character sets to suit their requirements.
 * - A set of unit tests is provided to ensure the reliability of the class functionality.
 *
 * Example:
 * ```javascript
 * const generator = new RandomGenerator();
 * const randomString = generator.generate(15, ['lowercase', 'numeric']);
 * console.log(randomString); // Output: "a1b2c3d4e5f6g7"
 * ```
 *
 * @class
 */
class RandomGenerator {
  /**
    A class for generating random strings with customizable options. A predefined list of characters are used to generate a unique combination. Any custom strings will be saved as "customString"
    @function
    */
  constructor(customString) {
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
    this.defaultLength = 10;
  }

  /**
   * The only purpose of this function is to make sure nothing might throw an error
   * @function
   */
  handleEdgeCases = () => {
    if (this.vocabularyOptions.length == 0) {
      this.vocabularyOptions.push(this.customCharacterSetAlphaLower);
      this.vocabularyOptions.push(this.customCharacterSetAlphaUpper);
      this.vocabularyOptions.push(this.customCharacterSetNumeric);
    }
    // TODO: ADD MORE EDGE CASES
  };

  /**
    Generates a random integer within a specified range.
    Parameters:
      - min: Minimum value of the range.
      - max: Maximum value of the range.
    Returns: Random integer within the specified range.
    @function
    */
  getRandomIntBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  /**
        Generates a new random numeric string based on the specified req.
        Parameters:
          - nChars: Length of the string to be generated.
          - maxGroups: Maximum number of groups to be generated.
        Returns: Random numeric string with specified characteristics.
        @function
    */
  generateUniqueNumber = () => {
    let randomBigInt = BigInt(Date.now());
    let randomSmallInt = Math.floor(Math.random() * 10);
    randomBigInt *= BigInt(randomSmallInt);
    return randomBigInt;
  };

  /** 
    The max length of the unique number in version 1.0.0 is 13, hence the increaseLength function is called
    @function
    */
  increaseLength = (uniqueNumber, maxGroups) => {
    const preNumber1 = BigInt(this.getRandomIntBetween(10, 20));

    const preNumber2 = BigInt(this.getRandomIntBetween(10, 20));
    for (let i = 0; i < maxGroups; i++) {
      let temp = BigInt(uniqueNumber * preNumber1) / preNumber2;

      uniqueNumber = BigInt(uniqueNumber.toString() + temp.toString());
    }

    return uniqueNumber.toString();
  };

  /**
    Retrieves a character from the vocabulary based on the provided value.
    Parameters:
      - value: Numeric value used to determine the character.
    Returns: Character from the vocabulary based on the provided value.
    @function
    */
  getCharFromString = (value) => {
    let arr_index = this.getRandomIntBetween(0, this.vocabularyOptions.length);
    if (
      this.selectedArrayHistory[-1] == arr_index ||
      this.selectedArrayHistory[-2] == arr_index ||
      this.selectedArrayHistory[-3] == arr_index
    ) {
      arr_index = this.getRandomIntBetween(0, 7);
    }
    this.selectedArrayHistory.push(arr_index);
    let selectedArray = this.vocabularyOptions[arr_index];
    let char_index = value % selectedArray.length;
    return selectedArray[char_index];
  };

  /**
    Creates the vocabulary based on the provided criteria.
    Parameters:
      - vocabulary: Array specifying the character groups to include in the vocabulary.
    Returns: None
    @function
    */
  createVocabulary = (vocabulary) => {
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

    // TODO:CHECK IF SPACE NECESSARY
  };

  /** 
        Generates a truly random string based on the time and random calculations with specified characteristics.
        Parameters:
        nChars: Length of the string to be generated.
        vocabulary: Array specifying the character groups to include in the string.
        valid values : ["all", "uppercase", "lowercase", "numeric", "symbols", "specials"]
        Returns: Random string with specified characteristics
        @function
    */
  generate = (nChars = this.defaultLength, vocabulary = ["all"]) => {
    const maxGroups = Math.floor(nChars / this.currentLengthLimit) + 1;
    this.createVocabulary(vocabulary);

    // To handle edge cases
    this.handleEdgeCases();

    let trulyRandomNumber;

    while (true) {
      trulyRandomNumber = this.generateUniqueNumber();

      if (trulyRandomNumber !== 0n) {
        break;
      }
    }

    trulyRandomNumber = this.increaseLength(trulyRandomNumber, maxGroups);

    let trulyRandomString = "";
    const findAndAppendChar = (indexValue) => {
      let value = this.getCharFromString(indexValue);
      if (value === undefined)
        findAndAppendChar(this.getRandomIntBetween(0, 10));
      else {
        trulyRandomString += value;
      }
    };
    for (let i = 0; i < trulyRandomNumber.length; i++) {
      findAndAppendChar(trulyRandomNumber[i]);
    }
    return trulyRandomString.substring(trulyRandomString.length - nChars);
  };
}

module.exports = RandomGenerator;
