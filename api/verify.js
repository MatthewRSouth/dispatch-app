export default async function verify(req, res) {
    // This function verifies the user for signin
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    //Request Body

    try {
        const { username, password } = req.body ?? {};

        const ourPassword = process.env.LOGINPASSWORD;
        const ourUsername = process.env.LOGINUSERNAME;

        if (username === ourUsername && password === ourPassword) {
            return res.status(200).json({ message: 'Login Verified' });
        } else {
            return res
                .status(401)
                .json({ message: 'Unauthorized Username or Password' });
        }
    } catch (error) {
        console.error('API Error', error);
        return res
            .status(500)
            .json({ message: 'Internal Server Error', error: error.message });
    }
}
