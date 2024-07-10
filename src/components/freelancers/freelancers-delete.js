import {UrlUtils} from "../../utils/url-utils";
import {FreelancersServices} from "../../services/freelancers-services";

export class FreelancersDelete {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        const id = UrlUtils.getUrlParam('id');
        if (!id) {
            return this.openNewRoute('/');
        }
        this.deleteFreelancer(id).then();
    }

    async deleteFreelancer(id) {
        const response = await FreelancersServices.deleteFreelancers(id);
        if (response.error) {
            alert(response.error);
            return response.redirect ? this.openNewRoute(response.redirect) : null;
        }
        return this.openNewRoute('/freelancers');
    }
}