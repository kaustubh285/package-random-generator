# RandomGenerator

## Overview

`RandomGenerator` is a JavaScript class for generating customizable random strings. It offers flexibility and customization, allowing users to create unique combinations based on predefined character sets.

## Usage

1. Instantiate the `RandomGenerator` class with an optional custom string.

```javascript
const RandomGenerator = require("random-id-generate");

const generator = new RandomGenerator();
```

2. Utilize the `generate` method to generate random strings with specified characteristics.

```Javascript

const randomString = generator.generate(15, ["lowercase", "numeric"]);

console.log(randomString);  // Output: "a1b2c3d4e5f6g7"

```

### Instances

```javascript
const RandomGenerator = require("random-id-generate");

// Creating an instance with specific parameters
const generator = new RandomGenerator();
const upperNumericRandom = generator.instance(20, ["uppercase", "numeric"]);

console.log(upperNumericRandom(), upperNumericRandom(), upperNumericRandom());
// Output: 1F8J7B86HI5G6EI4C931 3GFBAF1DI84A12759CI9 GDA7AD957E628B1991FA
```

## Available options

```Javascript
['all','uppercase', 'lowercase', 'numeric', 'symbols', 'specials']
```

## Important Considerations

- The class supports various character groups, including lowercase, uppercase, numeric, symbols, and specials.

- Customize string generation by specifying desired character groups in the `vocabulary` parameter of the `generate` method.

- The `generate` method takes optional parameters: `nChars` (length of the generated string) and `vocabulary` (array of character groups).

- Easily extend or modify predefined character sets to suit your requirements.

- Unit tests are provided to ensure the reliability of the class functionality.

## Example

```javascript
const generator = new RandomGenerator();

const randomString = generator.generate(15, ["lowercase", "numeric"]);

console.log(randomString); // Output: "a1b2c3d4e5f6g7"
```

```javascript
const generator = new RandomGenerator();

const randomString = generator.generate(15, ["uppercase", "numeric"]);

console.log(randomString); // Output: "BDB5E2615942D09"
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Note

If you find `RandomGenerator` helpful in your projects, please consider starring the project on GitHub. As an individual developer, I am creating useful packages for fellow developers and your support is greatly appreciated!

To star the project, visit the [GitHub repository](https://github.com/kaustubh285/package-random-generator) and click on the ⭐️ icon in the top right corner.

Thank you for your support!
