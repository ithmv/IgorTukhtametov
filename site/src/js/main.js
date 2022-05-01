import $ from "jquery";
import { Form } from "./forms/form";
import ApiService from "./services/api-service";

window.onload = function () {
    const applicantForm = document.getElementById("form");
    const extendedForm = document.getElementById("extended-form");
    const priceBtn = document.querySelectorAll(".price__navigation ul>li>a");
    const priceBox = document.querySelectorAll(".price__box");

    for (let i = 0; i < priceBtn.length; i++) {
        priceBtn[i].addEventListener("click", (e) => {
            const tabsPath = e.target.dataset.tabsPath;
            priceBtn.forEach((el) => {
                el.classList.remove("navigation_active");
            });
            document
                .querySelector(`[data-tabs-path="${tabsPath}"]`)
                .classList.add("navigation_active");
            tabsHandler(tabsPath);
        });
    }

    const tabsHandler = (path) => {
        priceBox.forEach((el) => {
            el.classList.remove("price-box_active");
        });
        document
            .querySelector(`[data-tabs-target="${path}"]`)
            .classList.add("price-box_active");
        priceBtn.forEach((btn) => {
            btn.classList.remove("navigation_active-btn");
        });
        document
            .querySelector(`[data-tabs-path="${path}"]`)
            .classList.add("navigation_active-btn");
    };

    tabsHandler("Styling");

    function success(form) {
        alert('Мы свяжемся с вами в ближайшее время!')
    }

    async function handleFormSubmit(event) {
        event.preventDefault();
        const name = applicantForm.querySelector('[name="name"]');
        const phone = applicantForm.querySelector('[name="phone"]');
        if (!name.checkValidity() || !phone.checkValidity()) {
            return 0;
        }
        const formData = serializeForm(applicantForm);
        const response = await ApiService.createOrder(formData);

        if (response.ok) {
            success(applicantForm);
            applicantForm.reset();
        }
    }


    async function getFormValue(event) {
        event.preventDefault();
        const name = extendedForm.querySelector('[name="name"]');
        const phone = extendedForm.querySelector('[name="phone"]');
        if (!name.checkValidity() || !phone.checkValidity()) {
            return 0;
        }
        const formData = serializeForm(extendedForm);

        function toggleLoader() {
            const loader = document.getElementById("loader");
            loader.classList.toggle("loader_hidden");
        }

        toggleLoader();
        const response = await ApiService.createOrder(formData);
        toggleLoader();

        if (response.ok) {
            success(extendedForm);
            setTimeout(function () {
                extendedForm
                    .getElementsByClassName("fancybox-button")[0]
                    .click();
                extendedForm.reset();
                extendedForm.getElementsByClassName("alert")[0].remove();
            }, 10);
        }
    }

    function serializeForm(formNode) {
        const { elements } = formNode;
        const data = {};
        const data_raw = Array.from(elements)
            .filter((item) => !!item.name)
            .map((element) => {
                const { name, value } = element;

                return { name, value };
            });
        data_raw.forEach(function (el) {
            data[el["name"]] = el["value"];
        });

        return data;
    }

    function createValidator(form) {
        $(function () {
            $(form).validate({
                rules: {
                    name: {
                        required: true,
                        minlength: 2,
                    },
                },
                messages: {
                    name: {
                        required: "&laquo; Имя c обязательно к заполнению",
                        minlength:
                            "&laquo; Имя &laquo; должно содержать не менее 2-х символов",
                    },
                    phone: {
                        required:
                            "&laquo Телефон &raquo; обязателен к заполнению",
                    },
                },
            });
        });
    }

    extendedForm.addEventListener("submit", getFormValue);
    applicantForm.addEventListener("submit", handleFormSubmit);

    createValidator("#form");
    $(document).ready(function () {
        $(mask).inputmask({ mask: "+7 (999) 999-99-99" });
    });

    createValidator("#extended-form");
    $(document).ready(function () {
        $(extendedMask).inputmask({ mask: "+7 (999) 999-99-99" });
    });

    function init() {
        $(".portfolio__works").slick({
            slidesToShow: 4,
            prevArrow: ".slider-prev",
            nextArrow: ".slider-next",
        });

        new Form();
    }

    $(document).ready(init);
};

class ItcTabs {
    constructor(target, config) {
      const defaultConfig = {};
      this._config = Object.assign(defaultConfig, config);
      this._elTabs = typeof target === 'string' ? document.querySelector(target) : target;
      this._elButtons = this._elTabs.querySelectorAll('.tabs__btn');
      this._elPanes = this._elTabs.querySelectorAll('.tabs__pane');
      this._eventShow = new Event('tab.itc.change');
      this._init();
      this._events();
    }
    _init() {
      this._elTabs.setAttribute('role', 'tablist');
      this._elButtons.forEach((el, index) => {
        el.dataset.index = index;
        el.setAttribute('role', 'tab');
        this._elPanes[index].setAttribute('role', 'tabpanel');
      });
    }
    show(elLinkTarget) {
      const elPaneTarget = this._elPanes[elLinkTarget.dataset.index];
      const elLinkActive = this._elTabs.querySelector('.tabs__btn_active');
      const elPaneShow = this._elTabs.querySelector('.tabs__pane_show');
      if (elLinkTarget === elLinkActive) {
        return;
      }
      elLinkActive ? elLinkActive.classList.remove('tabs__btn_active') : null;
      elPaneShow ? elPaneShow.classList.remove('tabs__pane_show') : null;
      elLinkTarget.classList.add('tabs__btn_active');
      elPaneTarget.classList.add('tabs__pane_show');
      this._elTabs.dispatchEvent(this._eventShow);
      elLinkTarget.focus();
    }
    showByIndex(index) {
      const elLinkTarget = this._elButtons[index];
      elLinkTarget ? this.show(elLinkTarget) : null;
    };
    _events() {
      this._elTabs.addEventListener('click', (e) => {
        const target = e.target.closest('.tabs__btn');
        if (target) {
          e.preventDefault();
          this.show(target);
        }
      });
    }
}
new ItcTabs('.tabs');