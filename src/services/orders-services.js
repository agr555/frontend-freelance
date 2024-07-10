import {HttpUtils} from "../utils/http-utils";

export class OrdersServices {
    static async getOrders() {
        const returnObject = {
            error: false,
            redirect: null,
            orders: null
        };
        const result = await HttpUtils.request('/orders');

        if (result.redirect || result.error || !result.response || (result.response && (result.response.error || !result.response.orders))) {
            returnObject.error = 'Error get list of orders';
            if (result.redirect) {
                returnObject.redirect(result.redirect);
            }
            return returnObject;
        }
        returnObject.orders = result.response.orders;
        return returnObject;
    }

    static async getOrder(id) {
        const returnObject = {
            error: false,
            redirect: null,
            order: null
        };
        const result = await HttpUtils.request('/orders/' + id);

        if (result.redirect || result.error || !result.response || (result.response && result.response.error)) {
            returnObject.error = 'Error get freelancer';
            if (result.redirect) {
                returnObject.redirect(result.redirect);
            }
            return returnObject;
        }
        returnObject.order = result.response;
        return returnObject;
    }

    static async createOrders(data) {
        const returnObject = {
            error: false,
            redirect: null,
            id: null
        };
        const result = await HttpUtils.request('/orders', 'POST', true, data);

        if (result.redirect || result.error || !result.response || (result.response && result.response.error )) {
            returnObject.error = 'Order add error!';
            if (result.redirect) {
                returnObject.redirect(result.redirect);
            }
            return returnObject;
        }
        returnObject.id = result.response.id;
        return returnObject;
    }

    static async deleteOrders(id) {
        const returnObject = {
            error: false,
            redirect: null,
        };
        const result = await HttpUtils.request('/orders/' + id, 'DELETE', true);

        if (result.redirect || result.error || !result.response || (result.response && result.response.error )) {
            returnObject.error = 'Order deletion error!';
            if (result.redirect) {
                returnObject.redirect(result.redirect);
            }
            return returnObject;
        }
        return returnObject;
    }

    static async updateOrders(id, data) {
        const returnObject = {
            error: false,
            redirect: null,
        };
        const result = await HttpUtils.request('/orders/' + id, 'PUT', true, data);

        if (result.redirect || result.error || !result.response || (result.response && result.response.error )) {
            returnObject.error = 'Order update error!';
            if (result.redirect) {
                returnObject.redirect(result.redirect);
            }
            return returnObject;
        }
        return returnObject;
    }

}