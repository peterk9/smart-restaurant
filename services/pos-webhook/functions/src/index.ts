import * as functions from 'firebase-functions';
import axios from 'axios';
import config from './config';

export const squareWebhook = functions.https.onRequest(async (request, response) => {
    try {
        const { merhant_id, location_id, event_type, entity_id } = request.body;
        if (event_type === 'PAYMENT_UPDATED') {
            const order = await fetchOrderDetails(location_id, entity_id);
            await publishOrderEvent(order);
            response.status(200).send(order);
        }
        response.status(200).send(`non-payment event. merchant-${merhant_id} location-${location_id} event-${event_type}`);
    } catch (err) {
        console.error(err.data);
        response.status(err.status).send(err.data);
    }
});

const fetchOrderDetails = async (locationId: string, entityId: string): Promise<any> => {
    try {
        const url = `${config.square.connectV1url}/location/${locationId}/payments/${entityId}`;
        const configs = {
            headers: {
                Authorization: `Bearer ${config.square.accessToken}`
            }
        };
        const response = await axios.get(url, configs);
        const order = response.data;
        return order;
    } catch (err) {
        if (err.response) {
            const { status, data } = err.response;
            throw { status, data };
        }
    }
};

const publishOrderEvent = async (order: any) => {
    console.log('publishing order', order);
};

