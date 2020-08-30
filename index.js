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
    console.log(err);
  }
}

export async function convertCsvToArray(file, separator = ",", linesToRemove = 0) {
  const csv = await processFile(file);
  const lines = csv.split("\n");
  if (linesToRemove > 0) {
    for (var i = 0; i < linesToRemove; i++) {
        lines.shift();
    }
  }
  const result = [];
  const headers = lines[0].split(separator);

  for (var i = 1; i < lines.length; i++) {
    const obj = {};
    const currentline = lines[i].split(separator);

    for (var idx = 0; idx < headers.length; idx++) {
      const key = headers[idx].trim();
      const value = currentline[idx]
        ? currentline[idx].replace(/['"]+/g, "")
        : null;
      obj[key] = value;
    }

    result.push(obj);
  }

  return result;
}
