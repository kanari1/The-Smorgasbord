import type { NextApiRequest, NextApiResponse } from 'next';

import nextConnect from 'next-connect';
import multer from 'multer';

type NextApiRequestWithFormData = NextApiRequest & {
        files: any[],
}

const upload = multer({
  storage: multer.diskStorage({
    destination: '../../public/logos',
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
});

const apiRoute = nextConnect({
  onError(error, req: NextApiRequestWithFormData, res: NextApiResponse) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req: NextApiRequestWithFormData, res: NextApiResponse) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.single('logo')).post((req, res: NextApiResponse) => {
  res.status(200).json({ data: 'success' });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
