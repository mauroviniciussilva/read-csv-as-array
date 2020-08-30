## Introduction

A simple way to convert a CSV file into an array.

## Install

*Install package in your package.json*

``` 
npm install read-csv-as-array --save
```

## How to use

You only need to pass your file and the separator for it to work. But, if the first line of your csv, for some reason, is not the *header* (the line that contains the keys that will be used to create the objects), you can pass the number of lines that you want to remove from the beggining of the file.

```JS
import { convertCsvToArray } from "read-csv-as-array";

const array = await convertCsvToArray(file, separator, linesToRemove);
```

### Example of input and output:

#### Input

The `.csv` file:

```
name;age;gender;
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

