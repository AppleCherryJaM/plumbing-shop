const path = require("path");
const uuid = require("uuid");
const fs = require("fs");

const ParserService = require("../services/file-parser-service");
const CreationService = require("../services/creation-service");

class AdminController {
	async importFile(req, res, next) { //отвечает за сохранение информации с файла

		if (!req.files || !req.files.importFile) {
			return next(ApiError.BadAPIRequest('Import file is required'));
		}

		const importFile = req.files.importFile;

		const fileType = ParserService.getFileType(importFile.name, importFile.mimetype);

		const tempDir = path.join(__dirname, '..', 'temp');
		if (!fs.existsSync(tempDir)) {
			fs.mkdirSync(tempDir, { recursive: true });
		}

		const tempFilePath = path.join(tempDir, `${uuid.v4()}.json`);

		try {
			await importFile.mv(tempFilePath);

			const parsedFile = await ParserService.parseFile(tempFilePath, fileType);
			fs.unlinkSync(tempFilePath);

			return res.status(200).json({ result: parsedFile });

		} catch (error) {
			if (fs.existsSync(tempFilePath)) {
				fs.unlinkSync(tempFilePath);
			}
			console.error("Controller error:", error);
			return next(ApiError.BadAPIRequest(error.message));
		}
	}

	async getExchange() {

	}

	async setExchange() {

	}
}

modules.exports = new AdminController();