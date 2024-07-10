import {UrlUtils} from "../../utils/url-utils";
import {OrdersServices} from "../../services/orders-services";

export class OrdersDelete {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        const id = UrlUtils.getUrlParam('id');
        if (!id) {
            return this.openNewRoute('/');
        }
        this.deleteOrder(id).then();
    }

    async deleteOrder(id) {
        const response = await OrdersServices.deleteOrders(id);
        if (response.error) {
            alert(response.error);
            return response.redirect ? this.openNewRoute(response.redirect) : null;
        }
        return this.openNewRoute('/orders');
    }
}