function readFileAsync(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsText(file);
  });
}

async function processFile(file) {
  try {
    return await readFileAsync(file);
  } catch (err) {
    throw "File extension is not valid";
  }
}

export function isCsvExtension(file) {
  let isCsv = true;
  if (!file || !file.name) isCsv = false;
  if (file.name.split(".").pop() != "csv") isCsv = false;
  return isCsv;
}

export async function convertCsvToArray(file, separator = ",", rowsToRemove = 0) {
  try {
    const isValid = isCsvExtension(file);
    if (!isValid) throw "File extension is not valid";

    const csv = await processFile(file);
    const rows = csv.split("\n");
    if (rowsToRemove > 0) {
      for (var i = 0; i < rowsToRemove; i++) {
        rows.shift();
      }
    }
    const array = [];
    const headers = rows[0].split(separator);

    for (var i = 1; i < rows.length; i++) {
      const obj = {};
      const currentRow = rows[i].split(separator);

      for (var idx = 0; idx < headers.length; idx++) {
        const key = headers[idx].trim().replace(" ", "_");
        const value = currentRow[idx]
          ? currentRow[idx].replace(/['"]+/g, "")
          : null;
        obj[key] = value;
      }

      array.push(obj);
    }

    return array;
  } catch (err) {
    throw "Unable to read the file";
  }
}
