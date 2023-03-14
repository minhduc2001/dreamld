import * as exc from '@base/api/exception.reslover';

export function checkFiles(files: Array<Express.Multer.File>) {
  const fileName = [];
  for (const file of files) {
    if (
      file?.mimetype &&
      ['image/jpg', 'image/png', 'image/jpeg'].includes(file?.mimetype)
    ) {
      fileName.push(file.filename);
      continue;
    }
    throw new exc.UnsupportedMediaType({
      message: `unsupported file type ${file?.mimetype}`,
    });
  }
  return fileName;
}
