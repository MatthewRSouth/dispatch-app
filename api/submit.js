import { google } from 'googleapis';
import { Readable } from 'stream';

export default async function handler(req, res) {
    // 1. Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { image, ...data } = req.body;

    try {
        // 2. Authenticate with Google
        // We use the environment variables from Vercel/Local .env
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_CLIENT_EMAIL,
                private_key: (process.env.GOOGLE_PRIVATE_KEY || '').replace(
                    /\\n/g,
                    '\n'
                ),
            },
            scopes: [
                'https://www.googleapis.com/auth/spreadsheets',
                'https://www.googleapis.com/auth/drive',
            ],
        });

        // 3. Handle Image Upload (If exists)
        let fileLink = 'No Image Uploaded';

        if (image) {
            const drive = google.drive({ version: 'v3', auth });

            // Convert Base64 string back to a file buffer
            const base64Data = image.split(',')[1];
            const buffer = Buffer.from(base64Data, 'base64');

            const fileMetadata = {
                name: `${data.childNameEnglish || 'Child'}_Photo.jpg`,
                parents: [process.env.GOOGLE_DRIVE_FOLDER_ID], // We will set this ID in your .env
            };

            const media = {
                mimeType: 'image/jpeg',
                body: Readable.from(buffer),
            };

            const file = await drive.files.create({
                resource: fileMetadata,
                media: media,
                fields: 'webViewLink',
            });

            fileLink = file.data.webViewLink;
        }

        // 4. Save to Sheets (Mapping your REAL fields)
        const sheets = google.sheets({ version: 'v4', auth });

        // This array determines the order of columns in your Google Sheet
        const rowValues = [
            data.fatherNameKanji || '', // Col A
            data.fatherNameFurigana || '', // Col B
            data.fatherPhoneNumber || '', // Col C

            data.motherNameKanji || '', // Col D
            data.motherNameFurigana || '', // Col E
            data.motherPhoneNumber || '', // Col F

            data.childNameEnglish || '', // Col G
            data.childNameFurigana || '', // Col H
            data.childNameKanji || '', // Col I
            data.childDateOfBirth || '', // Col J
            data.childSex || '', // Col K
            data.childNationality || '', // Col L
            data.childBloodType || '', // Col M
            data.childAddress || '', // Col N
            data.childContactNumber || '', // Col O (Emergency)

            data.hasAllergies || 'No', // Col P
            data.allergyDetails || '', // Col Q
            data.additionalInformation || '', // Col R

            data.agreesToAcknowledgement ? 'Yes' : 'No', // Col S
            data.signature || '', // Col T
            data.signDate || '', // Col U

            fileLink, // Col V (The Image Link)
            new Date().toISOString(), // Col W (Timestamp)
        ];

        await sheets.spreadsheets.values.append({
            spreadsheetId: process.env.GOOGLE_SHEET_ID,
            range: 'Sheet1!A2', // Start appending from row 2 (assuming row 1 is headers)
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [rowValues],
            },
        });

        return res.status(200).json({ success: true, link: fileLink });
    } catch (error) {
        console.error('API Error:', error);
        return res
            .status(500)
            .json({ message: 'Internal Server Error', error: error.message });
    }
}
