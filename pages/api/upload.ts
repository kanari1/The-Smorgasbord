import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

export default async (req, res) => {
    const form = new formidable.IncomingForm();
    form.uploadDir = "public/logos";
    form.keepExtensions = true;
    let fileName = '';

    form.once('error', (err) => {
        res.status(501).json({ error: 'Formidable error.' });
    })
    .on('field', (fieldName, fieldValue) => {
        if (fieldName == 'fileName') {
            fileName = fieldValue;
        }
    })
    .on('fileBegin', (name, file) => {
        file.path = form.uploadDir + '/' + fileName;
    })
    .once('end', () => {
        res.status(200).json({ data: 'success'})
    });
    await form.parse(req)
};
