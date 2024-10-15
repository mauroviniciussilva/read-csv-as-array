'use strict';

const isFileDefault = (file) => 'name' in file;
const isFileMulterExpress = (file) => 'filename' in file;

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
		if (isFileMulterExpress(file)) {
			return readFileAsync(file.buffer);
		} else {
			return readFileAsync(file);
		}
	} catch (err) {
		throw Error('File extension is not valid');
	}
}

function isCsvExtension(file) {
	let isCsv = !!file;
	if (isFileDefault(file) || isFileMulterExpress(file)) {
		const name = isFileDefault(file) ? file.name : file.filename;
		const isCsvExtension = name.split('.').pop() != 'csv';
		if (!isCsvExtension) isCsv = false;
	} else {
		isCsv = false;
	}
	return isCsv;
}

async function convertCsvToArray(
	file,
	separator = ',',
	rowsToRemove = 0
) {
	try {
		const isValid = isCsvExtension(file);
		if (!isValid) throw Error('File extension is not valid');

		const csv = await processFile(file);
		const rows = csv.split('\n');
		if (rowsToRemove > 0) {
			for (let i = 0; i < rowsToRemove; i++) {
				rows.shift();
			}
		}
		const array = [];
		const headers = rows[0].split(separator);

		for (let i = 1; i < rows.length; i++) {
			const obj = {};
			const currentRow = rows[i].split(separator);

			for (let idx = 0; idx < headers.length; idx++) {
				const key = headers[idx].trim().replace(' ', '_');
				const value = currentRow[idx]
					? currentRow[idx].replace(/['"]+/g, '')
					: null;
				obj[key] = value;
			}

			array.push(obj);
		}

		return array;
	} catch (err) {
		throw Error('Unable to read the file');
	}
}

exports.convertCsvToArray = convertCsvToArray;
exports.isCsvExtension = isCsvExtension;
