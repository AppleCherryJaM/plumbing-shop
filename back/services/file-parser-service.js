const xml2js = require('xml2js');
const xlsx = require('xlsx');
const csv = require('csv-parse');
const fs = require('fs');

const ApiError = require('../exceptions/api-error');

class ParserService {
	static getFileType(filename, mimetype) {
		const ext = filename.toLowerCase().split('.').pop();

		const fileTypeMap = {
			'yml': 'yml',
			'yaml': 'yml',
			'xml': 'xml',
			'csv': 'csv',
			'json': 'json',
			'son': 'json',
			'xls': 'xls',
			'xlsx': 'xlsx'
		};

		if (!fileTypeMap[ext] && mimetype) {
			const mimeMap = {
				'application/json': 'json',
				'text/xml': 'xml',
				'application/vnd.ms-excel': 'xls',
				'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
				'text/csv': 'csv'
			};
			return mimeMap[mimetype] || ext;
		}

		return fileTypeMap[ext] || ext;
	}

	static async parseFile(filePath, fileType) {
		try {
			// Проверяем существование файла
			if (!fs.existsSync(filePath)) {
				throw new Error(`File not found: ${filePath}`);
			}

			switch (fileType) {
				case 'xml':
					return await this.parseXML(filePath);
				case 'yml':
					return await this.parseYML(filePath);
				case 'csv':
					return await this.parseCSV(filePath);
				case 'json':
					return await this.parseJSON(filePath);
				case 'xls':
				case 'xlsx':
					return await this.parseXLS(filePath);
				default:
					throw new Error(`Unsupported file type: ${fileType}`);
			}
		} catch (error) {
			console.error(`Error parsing ${fileType} file:`, error);
			throw new Error(`File parsing error: ${error.message}`);
		}
	}

	static async parseXML(filePath) {
		return new Promise((resolve, reject) => {
			const parser = new xml2js.Parser({
				explicitArray: true,
				mergeAttrs: false,
				explicitRoot: true,
				ignoreAttrs: true,
				trim: true
			});

			fs.readFile(filePath, 'utf8', (err, xmlData) => {
				if (err) {
					console.error("Error reading xml file: ", err);
					return;
				}

				parser.parseString(xmlData, (err, result) => {
					if (err) {
						console.error("Error reading xml file: ", err);
						return;
					}

					const jsonData = JSON.parse(JSON.stringify(result, null, 2));
					console.log('Converted JSON:', jsonData);
					resolve(jsonData);
				});
			})
		});
	}

	static async parseCSV(filePath) {
		return new Promise((resolve, reject) => {
			const results = [];

			fs.createReadStream(filePath, { encoding: 'utf8' })
				.pipe(csv.parse({
					columns: true,                    // Использовать первую строку как заголовки
					skip_empty_lines: true,           // Пропускать пустые строки
					trim: true,                       // Обрезать пробелы вокруг значений
					cast: true,                       // Автоматическое преобразование типов
					skip_records_with_error: true,    // Пропускать строки с ошибками
					bom: true                         // Поддержка BOM (для файлов из Excel)
				}))
				.on('data', (data) => {
					results.push(data);
				})
				.on('end', () => {

					const jsonData = JSON.parse(JSON.stringify(results, null, 2));
					resolve(jsonData);
				})
				.on('error', (error) => {
					console.error("Error parsing CSV file:", error);
					reject(ApiError.BadAPIRequest(`CSV parsing failed: ${error.message}`));
				});
		});
	}

	static async parseYML(filePath) {
		return new Promise((resolve, reject) => {
			const parser = new xml2js.Parser({
				explicitArray: true,
				mergeAttrs: true,
				explicitRoot: false
			});

			fs.readFile(filePath, 'utf8', (err, data) => {
				if (err) {
					console.error("Error reading yml file: ", err);
					return;
				}

				parser.parseString(data, (err, result) => {
					if (err) return reject(err);

					const jsonData = JSON.parse(JSON.stringify(result, null, 2));
					resolve(jsonData);
				});
			});
		});
	}

	static async parseJSON(filePath) {
		try {

			if (!fs.existsSync(filePath)) {
				throw new Error(`File not found: ${filePath}`);
			}

			const fileContent = fs.readFileSync(filePath, 'utf8');

			const jsonData = JSON.parse(fileContent);

			const formattedData = JSON.parse(JSON.stringify(jsonData, null, 2));

			return formattedData;

		} catch (error) {
			console.error(`JSON parsing failed:`, error);
			console.error(`Error stack:`, error.stack);
			throw new Error(`JSON parsing error: ${error.message}`);
		}
	}

	static async parseXLS(filePath) {
		try {
			const workbook = xlsx.readFile(filePath);

			const result = {
				success: true,
				sheets: [],
				fileInfo: {
					fileName: filePath.split('/').pop(),
					sheetCount: workbook.SheetNames.length,
					fileType: this.getFileType(filePath)
				}
			};

			workbook.SheetNames.forEach(sheetName => {
				const worksheet = workbook.Sheets[sheetName];

				const jsonData = xlsx.utils.sheet_to_json(worksheet, {
					raw: true,           // Использовать原始 значения (даты как числа)
					defval: '',          // Значение по умолчанию для пустых ячеек
				});

				result.sheets.push({
					name: sheetName,
					data: jsonData,
					rowCount: jsonData.length,
					range: worksheet['!ref'] || 'N/A'
				});
			});

			return JSON.parse(JSON.stringify(result, null, 2));

		} catch (error) {
			console.error("Error parsing Excel file:", error.message);
			throw new Error(`Excel parsing failed: ${error.message}`);
		}
	}
}

module.exports = ParserService;