import config from "../../config/config";
import {CommonUtils} from "../../utils/common-utils";
import {UrlUtils} from "../../utils/url-utils";
import {OrdersServices} from "../../services/orders-services";

export class OrdersView {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        const id = UrlUtils.getUrlParam('id');
        if (!id) {
            return this.openNewRoute('/');
        }
        document.getElementById('edit-link').href = '/orders/edit?id=' + id;
        document.getElementById('delete-link').href = '/orders/delete?id=' + id;
        this.getOrder(id).then();
    }

    async getOrder(id) {
        const response = await OrdersServices.getOrder(id);
        if (response.error) {
            alert(response.error);
            return response.redirect ? this.openNewRoute(response.redirect) : null;
        }
        this.showOrder(response.order);
    }

    showOrder(order) {
        const statusInfo = CommonUtils.getStatusInfo(order.status);
        console.log(statusInfo)
        document.getElementById('order-status').classList.add('bg-' + statusInfo.color);//bg-success
        document.getElementById('order-status-icon').classList.add('fa-' + statusInfo.icon);//fa-clock
        document.getElementById('order-status-value').innerText = statusInfo.name;
        if (order.scheduledDate) {
            const date = new Date(order.scheduledDate);
            document.getElementById('scheduled').innerText = date.toLocaleDateString('ru-RU');
        }
        document.getElementById('complete').innerText = (order.completeDate) ? (new Date(order.completeDate)).toLocaleDateString('ru-RU') : 'In process...';
        if (order.deadlineDate) {
            const date = new Date(order.deadlineDate);
            document.getElementById('deadline').innerText = date.toLocaleDateString('ru-RU');
        }
        if (order.freelancer.avatar) {
            document.getElementById('freelancer-avatar').src = config.host + order.freelancer.avatar;
        }
        document.getElementById('freelancer-name').innerHTML = '<a href="/freelancers/view?id=' + order.freelancer.id + '">' + order.freelancer.name + ' ' + order.freelancer.lastName + '</a>';
        document.getElementById('number').innerText = order.number;
        document.getElementById('owner').innerText = order.owner.name + ' ' + order.owner.lastName;
        document.getElementById('amount').innerText = order.amount;
        document.getElementById('createdAt').innerText = (order.createdAt) ? (new Date(order.createdAt)).toLocaleString('ru-RU') : '';
    }
}