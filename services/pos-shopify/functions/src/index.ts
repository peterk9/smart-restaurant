import * as functions from 'firebase-functions';
import config from './config';

const safeCompare = require('safe-compare');
const JSONbigString = require('json-bigint')({ storeAsString: true });
const crypto = require('crypto');

export const shopifyWebhook = functions.https.onRequest(async (request, response) => {
    try {
        validateShopifyWebhook(request);
        const order = JSONbigString.parse(request.rawBody.toString());
        await publishOrderEvent(order);
        response.status(200).send(order);
    } catch (err) {
        console.error(err.data);
        response.status(err.status).send(err.data);
    }
});

const validateShopifyWebhook = (request: any): void => {
    console.debug(`validating incoming webhook.`);
    const data = request.rawBody;
    const hmac = request.get('x-shopify-hmac-sha256');
    const hash = crypto
        .createHmac('sha256', config.shopify.apiSecretKey)
        .update(data, 'utf8', 'hex')
        .digest('base64');
    if (!safeCompare(hmac, hash))
        throw {
            httpCode: 403,
            message: 'Warning! test did not come from shopify'
        };
}



const publishOrderEvent = async (order: any) => {
    console.log('publishing order');
};

