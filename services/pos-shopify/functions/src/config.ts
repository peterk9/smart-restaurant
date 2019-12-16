require('dotenv').config();

const config = {
    shopify: {
        apiSecretKey: process.env.SHOPIFY_API_SECRET_KEY
    }
};

export default config;