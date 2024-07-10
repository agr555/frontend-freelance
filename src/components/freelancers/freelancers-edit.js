import config from "../../config/config";
import {CommonUtils} from "../../utils/common-utils";
import {FileUtils} from "../../utils/file-utils";
import {ValidationUtils} from "../../utils/validation-utils";
import {UrlUtils} from "../../utils/url-utils";
import {FreelancersServices} from "../../services/freelancers-services";

export class FreelancersEdit {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        const id = UrlUtils.getUrlParam('id');
        if (!id) {
            return this.openNewRoute('/');
        }

        document.getElementById('updateButton').addEventListener('click', this.updateFreelancer.bind(this));
        bsCustomFileInput.init();

        this.findElements();

        this.validations = [
            {element: this.nameInputElement},
            {element: this.lastNameInputElement},
            {element: this.emailInputElement, options: {pattern: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/}},
            {element: this.educationInputElement},
            {element: this.locationInputElement},
            {element: this.skillsInputElement},
            {element: this.infoInputElement},
        ];

        this.getFreelancer(id).then();
    }

    findElements() {
        this.nameInputElement = document.getElementById('nameInput');
        this.lastNameInputElement = document.getElementById('lastNameInput');
        this.emailInputElement = document.getElementById('emailInput');
        this.educationInputElement = document.getElementById('educationInput');
        this.locationInputElement = document.getElementById('locationInput');
        this.skillsInputElement = document.getElementById('skillsInput');
        this.infoInputElement = document.getElementById('infoInput');
        this.avatarInputElement = document.getElementById('avatarInput');
        this.levelSelectElement = document.getElementById('levelSelect');
    }

    async getFreelancer(id) {
        const response = await FreelancersServices.getFreelancer(id);
        if (response.error) {
            alert(response.error);
            return response.redirect ? this.openNewRoute(response.redirect) : null;
        }
        this.showFreelancer(response.freelancer);
        this.freelancerOriginalData = response.freelancer;
    }

    showFreelancer(freelancer) {
        const breadcrumbsElement = document.getElementById("breadcrumbs-freelancer");
        breadcrumbsElement.href = '/freelancers/view?id=' + freelancer.id;
        breadcrumbsElement.innerText = freelancer.name + ' ' + freelancer.lastName;
        if (freelancer.avatar) {
            document.getElementById('avatar').src = config.host + freelancer.avatar;
        }
        document.getElementById('level').innerHTML = CommonUtils.getLevelHtml(freelancer.level);

        this.nameInputElement.value = freelancer.name;
        this.lastNameInputElement.value = freelancer.lastName;
        this.emailInputElement.value = freelancer.email;
        this.educationInputElement.value = freelancer.education;
        this.locationInputElement.value = freelancer.location;
        this.skillsInputElement.value = freelancer.skills;
        this.infoInputElement.value = freelancer.info;

        for (let i = 0; i < this.levelSelectElement.options.length; i++) {
            if (this.levelSelectElement.options[i].value === freelancer.level) {
                this.levelSelectElement.selectedIndex = i;
            }
        }
    }

    async updateFreelancer(e) {
        e.preventDefault();
        if (ValidationUtils.ValidateForm(this.validations)) {
            const changedData = {};
            if (this.nameInputElement.value !== this.freelancerOriginalData.name) {// So user edit this
                changedData.name = this.nameInputElement.value;
            }
            if (this.lastNameInputElement.value !== this.freelancerOriginalData.lastName) {// So user edit this
                changedData.lastName = this.lastNameInputElement.value;
            }
            if (this.emailInputElement.value !== this.freelancerOriginalData.email) {// So user edit this
                changedData.email = this.emailInputElement.value;
            }
            if (this.educationInputElement.value !== this.freelancerOriginalData.education) {// So user edit this
                changedData.education = this.educationInputElement.value;
            }
            if (this.locationInputElement.value !== this.freelancerOriginalData.location) {// So user edit this
                changedData.location = this.locationInputElement.value;
            }
            if (this.skillsInputElement.value !== this.freelancerOriginalData.skills) {// So user edit this
                changedData.skills = this.skillsInputElement.value;
            }
            if (this.infoInputElement.value !== this.freelancerOriginalData.info) {// So user edit this
                changedData.info = this.infoInputElement.value;
            }
            if (this.levelSelectElement.value !== this.freelancerOriginalData.level) {// So user edit this
                changedData.level = this.levelSelectElement.value;
            }
            //user get file of avatar
            if (this.avatarInputElement.files && this.avatarInputElement.files.length > 0) {
                changedData.avatarBase64 = await FileUtils.convertFileToBase64(this.avatarInputElement.files[0]);
            }
             //if  changedData
            if (Object.keys(changedData).length > 0) {
                const response = await FreelancersServices.updateFreelancers(this.freelancerOriginalData.id, changedData);
                if (response.error) {
                    alert(response.error);
                    return response.redirect ? this.openNewRoute(response.redirect) : null;
                }
                return this.openNewRoute('/freelancers/view?id=' + this.freelancerOriginalData.id);
            }
        }
    }
}