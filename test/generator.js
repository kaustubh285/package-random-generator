const RandomGenerator = require("../index.js");

const expect = require("chai").expect;

describe("RandomGenerator", () => {
  describe("#Output Length", () => {
    it("should generate a string of default length (10) without arguments", () => {
      const generator = new RandomGenerator();
      const randomString = generator.generate();

      expect(randomString).to.have.lengthOf(10);
    });

    it("should generate a string of length (20) if passed to generate", () => {
      const generator = new RandomGenerator();
      const randomString = generator.generate(20);

      expect(randomString).to.have.lengthOf(20);
    });
  });

  describe("#String output Check", () => {
    it("should generate a string which will not contain uppercase characters", () => {
      const generator = new RandomGenerator();
      const randomString = generator.generate(10, ["lowercase"]);

      expect(randomString).to.match(/^[^A-Z]+$/);
    });

    it("should generate a string which will not contain lowercase characters", () => {
      const generator = new RandomGenerator();
      const randomString = generator.generate(10, ["numeric"]);

      expect(randomString).to.match(/^[^a-z]+$/);
    });
  });
});
