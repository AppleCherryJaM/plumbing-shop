const multer = require('multer');
const uuid = require('uuid');

const MIME_TYPE_MAP = {
	'image/png': 'png',
	'image/jpeg': 'jpeg',
	'image/jpg': 'jpg',
}

const fileUpload = multer({
	storage: multer.diskStorage({
		destination: (req, file, callback) => {
			callback(null, 'static');
		},
		filename: (req, file, callback) => {
			const extension = MIME_TYPE_MAP[file.mimetype];
			callback(null, `${uuid.v4()}.${extension}`);
		}
	}),
	fileFilter: (req, file, callback) => {
		const isValid = !!MIME_TYPE_MAP[file.mimetype];
		const error = isValid ? null : new Error("Invalid mimetype");
		callback(error, isValid);
	}
});

module.exports = fileUpload;