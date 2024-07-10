import {Dashboard} from "./components/dashboard";
import {SignUp} from "./components/auth/sign-up";
import {Login} from "./components/auth/login";
import {Logout} from "./components/auth/logout";
import {FreelancersList} from "./components/freelancers/freelancers-list";
import {FileUtils} from "./utils/file-utils";
import {FreelancersView} from "./components/freelancers/freelancers-view";
import {FreelancersCreate} from "./components/freelancers/freelancers-create";
import {FreelancersEdit} from "./components/freelancers/freelancers-edit";
import {FreelancersDelete} from "./components/freelancers/freelancers-delete";
import {OrdersList} from "./components/orders/orders-list";
import {OrdersView} from "./components/orders/orders-view";
import {OrdersCreate} from "./components/orders/orders-create";
import {OrdersEdit} from "./components/orders/orders-edit";
import {OrdersDelete} from "./components/orders/orders-delete";
import {AuthUtils} from "./utils/auth-utils";

// import autoFillBootstrap4 from "admin-lte/plugins/datatables-autofill/js/autoFill.bootstrap4.mjs";

export class Router { // экспортируем
    constructor() {
        this.initEvents();
        this.titlePageElement = document.getElementById('title');
        this.contentPageElement = document.getElementById('content');
        this.adminlteStyleElement = document.getElementById('adminlte-style-number');
        this.userName = null;
        this.routes = [
            {
                route: '/',
                title: "Dashboard",
                filePathTemplate: "/templates/pages/dashboard.html",
                useLayout: '/templates/layout.html',
                load: () => {
                    new Dashboard(this.openNewRoute.bind(this));
                },
                styles: ['fullcalendar.css'],
                scripts: ['moment.min.js', 'moment-sk-locale.js',
                    'fullcalendar.js',
                    'fullcalendar-locale-sk.js']
            },
            {
                route: '/freelancers',
                title: "Freelancers",
                filePathTemplate: "/templates/pages/freelancers/list.html",
                useLayout: '/templates/layout.html',
                load: () => {
                    // new FreelancerList(); //error! если без параметров:this.openNewRoute is not a function
                    new FreelancersList(this.openNewRoute.bind(this));//!!важно не потерять контекст

                },
                styles: ['dataTables.bootstrap4.min.css', 'responsive.bootstrap4.min.css'],
                scripts: ['jquery.dataTables.min.js', 'dataTables.bootstrap4.min.js', 'dataTables.responsive.min.js', 'responsive.bootstrap4.min.js']
            },
            {
                route: '/freelancers/view',
                title: "Freelancer",
                filePathTemplate: "/templates/pages/freelancers/view.html",
                // useLayout: '../../templates/layout.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    // new FreelancersView(); //error! если без параметров:this.openNewRoute is not a function
                    new FreelancersView(this.openNewRoute.bind(this));//!!важно не потерять контекст
                },
            },
            {
                route: '/freelancers/create',
                title: "Add freelancer",
                filePathTemplate: "/templates/pages/freelancers/create.html",
                // useLayout: '../../templates/layout.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new FreelancersCreate(this.openNewRoute.bind(this));//!!важно не потерять контекст
                },
                scripts: ['bs-custom-file-input.min.js']
            },
            {
                route: '/freelancers/edit',
                title: "Edit freelancer",
                filePathTemplate: "/templates/pages/freelancers/edit.html",
                useLayout: '/templates/layout.html',
                load: () => {
                    new FreelancersEdit(this.openNewRoute.bind(this));//!!важно не потерять контекст
                },
                scripts: ['bs-custom-file-input.min.js']
            },
            {
                route: '/freelancers/delete',
                load: () => {
                    new FreelancersDelete(this.openNewRoute.bind(this));//!!важно не потерять контекст
                },
            },
            {
                route: '/orders',
                title: "Orders",
                filePathTemplate: "/templates/pages/orders/list.html",
                useLayout: '/templates/layout.html',
                load: () => {
                    new OrdersList(this.openNewRoute.bind(this));//!!важно не потерять контекст
                },
                styles: ['dataTables.bootstrap4.min.css', 'responsive.bootstrap4.min.css'],
                scripts: ['jquery.dataTables.min.js', 'dataTables.bootstrap4.min.js', 'dataTables.responsive.min.js', 'responsive.bootstrap4.min.js']
            },
            {
                route: '/orders/view',
                title: "Order",
                filePathTemplate: "/templates/pages/orders/view.html",
                useLayout: '/templates/layout.html',
                load: () => {
                    new OrdersView(this.openNewRoute.bind(this));//!!важно не потерять контекст
                },
            },
            {
                route: '/orders/create',
                title: "Add order",
                filePathTemplate: "/templates/pages/orders/create.html",
                useLayout: '/templates/layout.html',
                load: () => {
                    new OrdersCreate(this.openNewRoute.bind(this));//!!важно не потерять контекст
                },
                styles: ['tempusdominus-bootstrap-4.min.css', 'select2.min.css', 'select2-bootstrap4.min.css'],
                scripts: ['moment.min.js',
                    'moment-sk-locale.js',
                    'tempusdominus-bootstrap-4.min.js',
                    'select2.full.min.js'
                ]
            },
            {
                route: '/orders/edit',
                title: "Edit order",
                filePathTemplate: "/templates/pages/orders/edit.html",
                useLayout: '/templates/layout.html',
                load: () => {
                    new OrdersEdit(this.openNewRoute.bind(this));//!!важно не потерять контекст
                },
                styles: ['tempusdominus-bootstrap-4.min.css', 'select2.min.css', 'select2-bootstrap4.min.css'],
                scripts: ['moment.min.js',
                    'moment-sk-locale.js',
                    'tempusdominus-bootstrap-4.min.js',
                    'select2.full.min.js'
                ]
            },
            {
                route: '/orders/delete',
                load: () => {
                    new OrdersDelete(this.openNewRoute.bind(this));//!!важно не потерять контекст
                },
            },
            {
                route: '/404',
                title: "Page not found",
                filePathTemplate: "/templates/404.html",
                useLayout: false

            },
            {
                route: '/login',
                title: "Login",
                filePathTemplate: "/templates/pages/auth/login.html",
                useLayout: false, /*'',*/
                load: () => {
                    document.body.classList.add('login-page');
                    document.body.style.height = '100vh';// !important;;
                    new Login(this.openNewRoute.bind(this));//!!важно не потерять контекст
                },
                unload: () => {
                    document.body.classList.remove('login-page');
                    document.body.style.height = 'auto';// !important;;
                },
                styles: ['icheck-bootstrap.min.css'] //добавить персональные стили вместо подкл в index.html
                // <link rel="stylesheet" href="../../plugins/icheck-bootstrap/icheck-bootstrap.min.css">
            },
            {
                route: '/sign-up',
                title: "Registration",
                filePathTemplate: "/templates/pages/auth/sign-up.html",
                useLayout: '',
                load: () => {
                    document.body.classList.add('register-page');
                    document.body.style.height = '100vh';// !important;;
                    new SignUp(this.openNewRoute.bind(this));//!!важно не потерять контекст
                },
                unload: () => {
                    document.body.classList.remove('register-page');
                    document.body.style.height = 'auto';// !important;;
                },
                styles: ['icheck-bootstrap.min.css']
            },
            {
                route: '/logout',
                load: () => {
                    new Logout(this.openNewRoute.bind(this));//!!важно не потерять контекст
                },
            }
        ]
    }

    initEvents() {
        window.addEventListener('DOMContentLoaded', this.activateRoute.bind(this));
        //при открытии отловить событие и добавить функцию, которая сработает, когда весь контент будет загружен=DOMContentLoaded
        //bind (this) ==если это не сделать, то через эту ф addEventListener будет привязан контекст именно
        // этого события, а нам это не надо
        // window.addEventListener('DOMContentLoaded', this.activateRoute.bind(this)) //????
        window.addEventListener('popstate', this.activateRoute.bind(this));
        //при смене урл =popstate
        /*эта часть для реализации без #*/
        document.addEventListener('click', this.clickHAndler.bind(this));
    }

    async openNewRoute(url) {
        const currentRoute = window.location.pathname;
        history.pushState({}, '', url);//меняет адрес строки.. 9000/sign-up
        // console.log(url);
        await this.activateRoute(null, currentRoute);//Здесь 1 param-event!!!-если эта ф-я запускается по какому то из событий
        // or null-если мы сами запускаем ф-ю
    }

    async clickHAndler(e) {
        let element = null;
        if (e.target.nodeName === 'A') { //если элемент ссылка
            element = e.target; // возьмем сам элемент
        } else if (e.target.parentNode.nodeName === 'A') { //если родительский элемент тоже ссылка
            element = e.target.parentNode;//возьмем родительский элемент
        }
        if (element) {
            //что не жмешь, ссылка, только н удалить доменное имя!
            //    console.log(element.href);
            //     console.log(e.target);
            //      console.log(e);
            //  console.log(e.target); // !!!! вывести, на что нажали?

            e.preventDefault();
            const currentRoute = window.location.pathname;
            const url = element.href.replace(window.location.origin, ''); //http localhost port заменили на пустую строку
            //  console.log(element.href);//  http://localhost:9002/freelancers
            //  console.log(url); //  freelancers

            if (!url || url === '#' || (currentRoute === url.replace('#', '')) || url.startsWith('javascript:void(0)')) {
                return;
            }
            await this.openNewRoute(url);
        }
    }

    async activateRoute(e, oldRoute = null) {//1 param-event!!!
        if (oldRoute) {
            const currentRoute = this.routes.find(item => item.route === oldRoute);
            //  console.log(currentRoute);
            if (currentRoute.styles && currentRoute.styles.length > 0) {
                currentRoute.styles.forEach(style => {
                    document.querySelector(`link[href='/css/${style}']`).remove();
                });
            }
            if (currentRoute.scripts && currentRoute.scripts.length > 0) {
                currentRoute.scripts.forEach(script => {
                    document.querySelector(`script[src='/js/${script}']`).remove();
                });
            }
            if (currentRoute.unload && typeof currentRoute.unload === 'function') {
                currentRoute.unload();
            }
        }

        const urlRoute = window.location.pathname; // как получить строку, которая идет ПОСЛЕ доменого узла
        const newRoute = this.routes.find(item => item.route === urlRoute);//ищем совпадающую строку по нашему массиву this.routes =[...]

        if (newRoute) {
            if (newRoute.styles && newRoute.styles.length > 0) {
                newRoute.styles.forEach(style => {
                    /*                 //        <link rel="stylesheet" href="/css/adminlte.min.css" id="adminlte-style-number">
                                     // создаем стили до adminLTE, а ту ищем по id
                                     const link = document.createElement('link');
                                     link.rel = 'stylesheet';
                                     link.href = '/css/' + style;
                                     document.head.insertBefore(link, this.adminlteStyleElement);*/
                    FileUtils.loadPageStyle('/css/' + style, this.adminlteStyleElement)
                });
            }
            if (newRoute.scripts && newRoute.scripts.length > 0) {
                for (const script of newRoute.scripts) {
                    await FileUtils.loadPageScript('/js/' + script);
                }
            }
            if (newRoute.title) {
                this.titlePageElement.innerText = newRoute.title + ' | Freelance Studio';
            }

            if (newRoute.filePathTemplate) {//1:38
                // document.body.className = ''; //clear classes for body in change
                let contentBlock = this.contentPageElement;
                if (newRoute.useLayout) {// +1 nsert layout, 2 then insert content in layout
                    this.contentPageElement.innerHTML = await fetch(newRoute.useLayout).then(response => response.text())
                    //      console.log(this.contentPageElement.innerHTML);
                    //      console.log(newRoute.useLayout);
                    contentBlock = document.getElementById('content-layout');
                    document.body.classList.add('sidebar-mini');
                    document.body.classList.add('layout-fixed');

                    //!get username for layout
                    this.profileNameElement = document.getElementById('profile-name');
                    if (!this.userName) {
                        let userInfo = AuthUtils.getAuthInfo(AuthUtils.userInfoTokenKey);
                        if (userInfo) {
                            userInfo = JSON.parse(userInfo);
                            if (userInfo && userInfo.name) {
                                this.userName = userInfo.name;
                            }
                        }
                    }
                        this.profileNameElement.innerText = this.userName;

                    this.activateMenuItem(newRoute);//только в Layout!

                } else {
                    document.body.classList.remove('sidebar-mini');
                    document.body.classList.remove('layout-fixed');
                }
                //insert content: <div id="content"></div>
                contentBlock.innerHTML = await fetch(newRoute.filePathTemplate).then(response => response.text())
            }
            if (newRoute.load && typeof newRoute.load === 'function') {
                newRoute.load();
            }
        } else {
            console.log('No route found');
            history.pushState({}, '', '/404');
            await this.activateRoute('/404');
            //window.location = '/404'; // это нельзя исп, тк повторно вызвает загрузку стр, как новой
        }
    }

    activateMenuItem(route) {
        document.querySelectorAll('.sidebar .nav-link').forEach(item => {
            // console.log(item);
            const href = item.getAttribute('href');
            if ((route.route.includes(href) && href !== '/') || (route.route === '/' && href === '/')) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }

        })
    }

}