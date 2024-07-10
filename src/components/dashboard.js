import config from "../config/config";
import {OrdersServices} from "../services/orders-services";

export class Dashboard {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        this.getOrders().then();
    }

    async getOrders() {
        const response = await OrdersServices.getOrders();
        if (response.error) {
            alert(response.error);
            return response.redirect ? this.openNewRoute(response.redirect) : null;
        }
        this.loadOrderInfo(response.orders);
        this.loadCalendarInfo(response.orders);
    }

    loadOrderInfo(orders) {
        document.getElementById('count-orders').innerText = orders.length;
        document.getElementById('done-orders').innerText = orders.filter(order => order.status === config.orderStatuses.success).length;
        document.getElementById('progress-orders').innerText = orders.filter(order => [config.orderStatuses.new, config.orderStatuses.confirmed].includes(order.status)).length;
        document.getElementById('canceled-orders').innerText = orders.filter(order => order.status === config.orderStatuses.canceled).length;
    }

    loadCalendarInfo(orders) {
        const prepareEvents = [];
        for (let i = 0; i < orders.length; i++) {
            let color = null;
            if (orders[i].status === config.orderStatuses.success) {
                color = 'gray';
            }
            if (orders[i].scheduledDate) {
                prepareEvents.push({
                    title: orders[i].freelancer.name + ' ' + orders[i].freelancer.lastName + ' make order ' + orders[i].number,
                    start: new Date(orders[i].scheduledDate),
                    backgroundColor: color ? color : '#00c0ef',
                    borderColor: color ? color : '#00c0ef',
                    allDay: true
                })
            }
            if (orders[i].deadlineDate) {
                prepareEvents.push({
                    title: 'Order ' + orders[i].number + ' Deadline',
                    // start: new Date(scheduledDate.getFullYear(), scheduledDate.getMonth(), scheduledDate.getDate()),
                    start: new Date(orders[i].deadlineDate),
                    backgroundColor: color ? color : '#f39c12',
                    borderColor: color ? color : '#f39c12',
                    allDay: true
                })
            }
            if (orders[i].completeDate) {
                prepareEvents.push({
                    title: 'Order ' + orders[i].number + ' completed by ' + orders[i].freelancer.name + ' ' + orders[i].freelancer.lastName,
                    start: new Date(orders[i].completeDate),
                    backgroundColor: color ? color : '#00a65a',
                    borderColor: color ? color : '#00a65a',
                    allDay: true
                })
            }
        }
        (new FullCalendar.Calendar(document.getElementById('calendar'), {
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: ''//'dayGridMonth,timeGridWeek,timeGridDay'
            },
            firstDay: 1,
            locale: 'sk',
            themeSystem: 'bootstrap',
            events: prepareEvents
        })).render();
    }
}