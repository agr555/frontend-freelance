import {ValidationUtils} from "../../utils/validation-utils";
import {UrlUtils} from "../../utils/url-utils";
import {FreelancersServices} from "../../services/freelancers-services";
import {OrdersServices} from "../../services/orders-services";

export class OrdersEdit {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        const id = UrlUtils.getUrlParam('id');
        if (!id) {
            return this.openNewRoute('/');
        }

        document.getElementById('updateButton').addEventListener('click', this.updateOrder.bind(this));
        this.scheduledDate = null;
        this.deadlineDate = null;
        this.completeDate = null;
        this.findElements();
        this.validations = [
            {element: this.descriptionInputElement},
            {element: this.amountInputElement},
        ];
        this.init(id).then();
    }

    findElements() {
        this.freelancerSelectElement = document.getElementById('freelancerSelect');
        this.statusSelectElement = document.getElementById('statusSelect');
        this.amountInputElement = document.getElementById('amountInput');
        this.descriptionInputElement = document.getElementById('descriptionInput');
        this.scheduledCardElement = document.getElementById('scheduled-card');
        this.completedCardElement = document.getElementById('completed-card');
        this.deadlineCardElement = document.getElementById('deadline-card');
    }

    async init(id) {
        const orderData = await this.getOrder(id);
        if (orderData) {
            this.showOrder(orderData);
            if (orderData.freelancer) {
                await this.getFreelancers(orderData.freelancer.id);
            }
        }
    }

    async getOrder(id) {
        const response = await OrdersServices.getOrder(id);
        if (response.error) {
            alert(response.error);
            return response.redirect ? this.openNewRoute(response.redirect) : null;
        }
        this.orderOriginalData = response.order;//
        return response.order;

    }

    async getFreelancers(currentFreelancerId) {
        const response = await FreelancersServices.getFreelancers();
        if (response.error) {
            alert(response.error);
            return response.redirect ? this.openNewRoute(response.redirect) : null;
        }
        const freelancers = response.freelancers;
        for (let i = 0; i < freelancers.length; i++) {
            const option = document.createElement('option');
            option.value = freelancers[i].id;
            option.innerText = freelancers[i].name + ' ' + freelancers[i].lastName;
            if (currentFreelancerId === freelancers[i].id) {
                option.selected = true;
            }
            this.freelancerSelectElement.appendChild(option);
        }
        //Initialize Select2 Elements
        $(this.freelancerSelectElement).select2({
            theme: 'bootstrap4'
        })
    }

    showOrder(order) {
        const breadcrumbsElement = document.getElementById("breadcrumbs-order");
        breadcrumbsElement.href = '/orders/view?id=' + order.id;
        breadcrumbsElement.innerText = order.number;

        //create 3 Calendars
        const calendarScheduled = $("#calendar-scheduled");
        const calendarCompleted = $("#calendar-completed");
        const calendarDeadline = $("#calendar-deadline");

        const calendarOptions = {
            // format: 'L',
            inline: true,
            locale: "sk",
            icons: {
                time: 'far fa-clock'
            },
            useCurrent: false,
        };
        calendarScheduled.datetimepicker(Object.assign({}, calendarOptions, {date: order.scheduledDate}))
        calendarScheduled.on("change.datetimepicker", (e) => {
            this.scheduledDate = e.date;
        });

        calendarCompleted.datetimepicker(Object.assign({}, calendarOptions, {
            date: order.completeDate,
            buttons: {showClear: true}
        }));

        calendarCompleted.on("change.datetimepicker", (e) => {
            if (e.date) {// если дата выбрана - ее послать
                this.completeDate = e.date;
            } else if (this.orderOriginalData.completeDate) { //если ее очистили - установить false, но если пусто -не делать ничего
                this.completeDate = false;
            } else {
                this.completeDate = null;
            }
        });
        calendarDeadline.datetimepicker(Object.assign({}, calendarOptions, {date: order.deadlineDate}));
        calendarDeadline.on("change.datetimepicker", (e) => {
            this.deadlineDate = e.date;
        });

        this.amountInputElement.value = order.amount;
        this.descriptionInputElement.value = order.description;
        for (let i = 0; i < this.statusSelectElement.options.length; i++) {
            if (this.statusSelectElement.options[i].value === order.status) {
                this.statusSelectElement.selectedIndex = i;
            }
        }
    }

    async updateOrder(e) {
        e.preventDefault();
        if (ValidationUtils.ValidateForm(this.validations)) {
            const changedData = {};
            if (parseInt(this.amountInputElement.value) !== parseInt(this.orderOriginalData.amount)) {// So user edit this
                changedData.amount = parseInt(this.amountInputElement.value);
            }
            if (this.descriptionInputElement.value !== this.orderOriginalData.description) {// So user edit this
                changedData.description = this.descriptionInputElement.value;
            }
            if (this.statusSelectElement.value !== this.orderOriginalData.status) {// So user edit this
                changedData.status = this.statusSelectElement.value;
            }
            if (this.freelancerSelectElement.value !== this.orderOriginalData.freelancer.id) { // freelancer.id
                changedData.freelancer = this.freelancerSelectElement.value; //необх уточнить!!!
            }
            if ((this.completeDate) || (this.completeDate === false)) {
                changedData.completeDate = this.completeDate ? this.completeDate.toISOString() : null;
            }

            if (this.deadlineDate) {
                changedData.deadlineDate = this.deadlineDate.toISOString();
            }
            if (this.scheduledDate) {
                changedData.scheduledDate = this.scheduledDate.toISOString();
            }

            if (Object.keys(changedData).length > 0) {
                const response = await OrdersServices.updateOrders(this.orderOriginalData.id, changedData);
                if (response.error) {
                    alert(response.error);
                    return response.redirect ? this.openNewRoute(response.redirect) : null;
                }
                return this.openNewRoute('/orders/view?id=' + this.orderOriginalData.id);
            }
        }
    }
}