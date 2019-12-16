require('dotenv').config();

const config = {
    square: {
        connectV1url: 'https://connect.squareup.com/v1',
        applicationId: process.env.SQUARE_APPLICATION_ID,
        accessToken: process.env.SQUARE_ACCESS_TOKEN,
        signatureKey: process.env.SQUARE_SIGNATURE_KEY,
    }
};

export default config;