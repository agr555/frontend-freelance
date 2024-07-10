import {HttpUtils} from "../utils/http-utils";

export class FreelancersServices {
    static async getFreelancers() {
        const returnObject = {
            error: false,
            redirect: null,
            freelancers: null
        };
        const result = await HttpUtils.request('/freelancers');

        if (result.redirect || result.error || !result.response || (result.response && (result.response.error || !result.response.freelancers))) {
            returnObject.error = 'Error get list of freelancers';
            if (result.redirect) {
                returnObject.redirect(result.redirect);
            }
            return returnObject;
        }
        returnObject.freelancers = result.response.freelancers;
        return returnObject;
    }

    static async getFreelancer(id) {
        const returnObject = {
            error: false,
            redirect: null,
            freelancer: null
        };
        const result = await HttpUtils.request('/freelancers/' + id);

        if (result.redirect || result.error || !result.response || (result.response && result.response.error)) {
            returnObject.error = 'Error get freelancer';
            if (result.redirect) {
                returnObject.redirect(result.redirect);
            }
            return returnObject;
        }
        returnObject.freelancer = result.response;
        return returnObject;
    }

    static async createFreelancers(data) {
        const returnObject = {
            error: false,
            redirect: null,
            id: null
        };
        const result = await HttpUtils.request('/freelancers', 'POST', true, data);

        if (result.redirect || result.error || !result.response || (result.response && result.response.error )) {
            returnObject.error = 'Freelancer add error!';
            if (result.redirect) {
                returnObject.redirect(result.redirect);
            }
            return returnObject;
        }
        returnObject.id = result.response.id;
        return returnObject;
    }

    static async deleteFreelancers(id) {
        const returnObject = {
            error: false,
            redirect: null,
        };
        const result = await HttpUtils.request('/freelancers/' + id, 'DELETE', true);

        if (result.redirect || result.error || !result.response || (result.response && (result.response.error ))) {
            returnObject.error = 'Freelancer deletion error!';
            if (result.redirect) {
                returnObject.redirect(result.redirect);
            }
            return returnObject;
        }
        return returnObject;
    }

    static async updateFreelancers(id, data) {
        const returnObject = {
            error: false,
            redirect: null,
        };
        const result = await HttpUtils.request('/freelancers/' + id, 'PUT', true, data);

        if (result.redirect || result.error || !result.response || (result.response && result.response.error )) {
            returnObject.error = 'Freelancer update error!';
            if (result.redirect) {
                returnObject.redirect(result.redirect);
            }
            return returnObject;
        }
        return returnObject;
    }
}