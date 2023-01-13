import fs from 'fs';
import multer from 'multer';

type FileType = 'pdf' | 'images';

const createFolder = (filePath: string) => {
  fs.mkdirSync(filePath, { recursive: true });
};

const createStorage = (filePath: string) => {
  return multer.diskStorage({
    destination: (_req, _file, cb) => {
      createFolder(filePath);
      cb(null, filePath);
    },
    filename: (_req, file, cb) => {
      cb(null, Date.now() + '_' + file.originalname);
    },
  });
};

const createUpload = (fileType: FileType, folderName: string) => {
  const filePath = `.tmp/${fileType}/${folderName}`;
  const storage = createStorage(filePath);
  return multer({ storage });
};

export { createUpload };
