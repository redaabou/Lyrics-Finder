import multer, { FileFilterCallback } from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { cloudinary } from '../config/cloudinary'; // Use named import
import path from 'path';
import { Request } from 'express';

// Check file type
function checkFileType(file: Express.Multer.File, cb: FileFilterCallback): void {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    cb(null, true);
  } else {
    // Log debug information
    console.log('File type check failed:', file.originalname);
    console.log('Expected file types:', filetypes);
    console.log('Received mimetype:', file.mimetype);
    
    cb(new Error('Error: Images Only!'));
  }
}

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'artistImg',
    format: async (req: Request, file: Express.Multer.File) => {
      const extname = path.extname(file.originalname).toLowerCase().replace('.', '');
      return extname;
    },
    public_id: (req: Request, file: Express.Multer.File) => `${Date.now()}_${file.originalname}`
  } as unknown as { [key: string]: unknown }, // Type assertion to bypass typing issue
  
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 }, // Limit file size to 5MB
  fileFilter: (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    checkFileType(file, cb);
  }
}).single('image'); // 'image' is the name of the form field

export default upload;
