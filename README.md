## Introduction

A simple way to convert a CSV file into an array.

## Install

*Install package in your package.json*

``` 
npm install read-csv-as-array --save
```

## How to use

You only need to pass your file for it to work. But, if the first row of your csv, for some reason, is not the *header* (the row that contains the keys that will be used to create the object), you can pass the number of rows that you want to remove from the beggining of the file.

By default, the separator is the comma (`,`), but you can specify others (depending on the file you're going to convert you may use `;`).

```JS
import { convertCsvToArray } from "read-csv-as-array";

const array = await convertCsvToArray(file, separator, rowsToRemove);
```

### Example of input/output:

#### Input

The `.csv` file:

```
name;age;gender
mauro;22;male
terrani;19;non-binary
thawanny;20;female
```

#### Output

The array:

```JS
const array = convertCsvToArray(file, ";");

[
    { name: "mauro", age: "22", gender: "male" },
    { name: "terrani", age: "19", gender: "non-binary" },
    { name: "thawanny", age: "20", gender: "female" }
]
```

> **Note!**
> If there is any white space in the header, it'll be replaced by an underscore.

## Helper Method

The conversion method already performs file type validation, however, if you want to take any action when identifying a different type of file you can use the `isCsvExtension` method, which returns a boolean:

```JS
import { isCsvExtension } from "read-csv-as-array";

const isCsv = await isCsvExtension(file);
```

---

If you spot any errors or have suggestions for improvement, feel free to [open an issue](https://github.com/mauroviniciussilva/read-csv-as-array/issues)!