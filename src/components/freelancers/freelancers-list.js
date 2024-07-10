import config from "../../config/config";
import {CommonUtils} from "../../utils/common-utils";
import {FreelancersServices} from "../../services/freelancers-services";

export class FreelancersList {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        this.getFreelancers().then();
    }

    async getFreelancers() {
        const response = await FreelancersServices.getFreelancers();
        if (response.error) {
            alert(response.error);
            return response.redirect ? this.openNewRoute(response.redirect) : null;
        }
        this.showRecords(response.freelancers);
    }

    showRecords(freelancers) {
        // console.log(freelancers);
        const recordsElement = document.getElementById('records');
        for (let i = 0; i < freelancers.length; i++) {
            const trElement = document.createElement('tr');
            trElement.insertCell().innerText = i + 1;
            trElement.insertCell().innerHTML = freelancers[i].avatar ? '<img class="freelancer-avatar" src="' + config.host + freelancers[i].avatar + '" alt "User image">' : '';
            trElement.insertCell().innerText = freelancers[i].name + ' ' + freelancers[i].lastName;
            trElement.insertCell().innerText = freelancers[i].email;
            trElement.insertCell().innerHTML = CommonUtils.getLevelHtml(freelancers[i].level);
            trElement.insertCell().innerText = freelancers[i].education;
            trElement.insertCell().innerText = freelancers[i].location;
            trElement.insertCell().innerText = freelancers[i].skills;
            trElement.insertCell().innerHTML = CommonUtils.generateGridToolsColumn('freelancers', freelancers[i].id);
            recordsElement.appendChild(trElement);
        }
        new DataTable('#data-table', {
            language: {
                "info": "Показывать _PAGE_ of _PAGES_ страниц",
                "search": "Фильтр:",
                "paginate": {
                    "next": "Вперед",
                    "previous": "Назад"
                },
                "lengthMenu": "Показывать _MENU_ записей на странице",
            }
        })
    }
}