import { google } from 'googleapis';
import { resolve } from 'path';
import { Readable } from 'stream';

export default async function handler(req, res) {
    // 1. Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { image, ...data } = req.body;
    //email Check
    const emailToTest = data.emailAddress;

    if (emailToTest) {
        try {
            const apiKey = process.env.BIGDATACLOUD_API_KEY;
            const verifyUrl = `https://api.bigdatacloud.net/data/email-verify?emailAddress=${encodeURIComponent(
                emailToTest
            )}&key=${apiKey}`;

            const response = await fetch(verifyUrl);
            const verifyData = await response.json();

            if (!verifyData.isValid || verifyData.isDisposable) {
                return res.status(400).json({
                    success: false,
                    message: 'Eメールを確認してください',
                });
            }
        } catch (error) {
            console.warn('BigDataCloud API Failed, but continuing submission');
        }
    }

    //stagger
    const initalDelay = Math.floor(Math.random() * 1300) + 200;
    await new Promise((resolve) => setTimeout(resolve, initalDelay));

    try {
        // 2. Authenticate with OAuth 2.0 (The New Way)
        const auth = new google.auth.OAuth2(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET
        );

        // This effectively "logs in" as you using the refresh token
        auth.setCredentials({
            refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
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
                parents: [process.env.GOOGLE_DRIVE_FOLDER_ID],
            };

            const media = {
                mimeType: 'image/jpeg',
                body: Readable.from(buffer),
            };
            let driveSuccess = false;

            for (let attempt = 1; attempt <= 2; attempt++) {
                try {
                    const file = await drive.files.create({
                        resource: fileMetadata,
                        media: media,
                        fields: 'webViewLink',
                    });

                    fileLink = file.data.webViewLink;
                    break;
                } catch (error) {
                    console.warn(
                        `Drive upload attempt ${attempt} failed: `,
                        error.message
                    );
                    if (attempt === 2) throw new Error('Google drive is busy.');
                    await new Promise((res) => setTimeout(res, 1000));
                }
            }
        }

        // 4. Save to Sheets (Corrected to match your Sheet Headers)
        const sheets = google.sheets({ version: 'v4', auth });

        const rowValues = [
            // 1. Account Info (Cols A & B)
            data.username || '', // Col A (username)
            data.password || '', // Col B (password)

            // 2. Father Info (Furigana FIRST in your sheet)
            data.fatherNameFurigana || '', // Col C
            data.fatherNameKanji || '', // Col D
            data.fatherPhoneNumber || '', // Col E

            // 3. Mother Info (Furigana FIRST in your sheet)
            data.motherNameFurigana || '', // Col F
            data.motherNameKanji || '', // Col G
            data.motherPhoneNumber || '', // Col H

            data.emailAddress || '', //Col I

            // 4. Child Info
            data.childNameEnglish || '', // Col I
            data.childNameFurigana || '', // Col J
            data.childNameKanji || '', // Col K
            data.childAddress || '', // Col L
            data.childContactNumber || '', // Col M
            data.childSex || '', // Col N
            data.childDateOfBirth || '', // Col O
            data.childNationality || '', // Col P
            data.childBloodType || '', // Col Q

            // 5. Medical & Extras
            data.hasAllergies || 'No', // Col R
            data.allergyDetails || '', // Col S
            data.additionalInformation || '', // Col T

            // 6. Agreement
            data.agreesToAcknowledgement ? 'Yes' : 'No', // Col U
            data.signature || '', // Col V
            data.signDate || '', // Col W

            // 7. Admin / System Cols
            '', // Col X (Spacer for "adminn1234")
            new Date().toISOString(), // Col Y (Timestamp)
            fileLink, // Col Z (Image Link)
            data.childCourse || '', //col AB
            data.childSchool || '', //col AC
            data.joinMonth || '', //col AD
            data.joinYear || '', //col AE
        ];
        const MAX_RETRIES = 3;
        let success = false;
        for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
            try {
                await sheets.spreadsheets.values.append({
                    spreadsheetId: process.env.GOOGLE_SHEET_ID,
                    range: 'Sheet1!A2',
                    valueInputOption: 'USER_ENTERED',
                    requestBody: {
                        values: [rowValues],
                    },
                });
                success = true;
                break;
            } catch (error) {
                console.warn(
                    `sheets API Attempt ${attempt} failed`,
                    error.message
                );
                if (attempt === MAX_RETRIES) {
                    throw new Error(
                        'Google Sheets is extremely busy. Please try submitting again.'
                    );
                }

                const waitTime = Math.floor(Math.random() * 1500) + 1000;
                await new Promise((resolve) => setTimeout(resolve, waitTime));
            }
        }
        if (!success) {
            throw new Error('Failed to save data after multiple attempts.');
        }
        return res.status(200).json({ success: true, link: fileLink });
    } catch (error) {
        console.error('API Error:', error);
        return res
            .status(500)
            .json({ message: 'Internal Server Error', error: error.message });
    }
}
