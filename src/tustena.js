/**
 * Return all the selectors used in this script
 * @returns {{HEAD: string, FORM: string, FORM_COMPANY: string, STYLE: string, FORM_LUNCH: string, REPORT_TITLE: string, REPORT_START: string, REPORT_END: string, SPAN: string, DYNA_FRAME: string, REPORT_H: string, REPORT_TO_DO: string, MODAL: string, FORM_START: string, DIV: string, REPORT_BRAND: string, REPORT_M: string, FORM_END: string, FORM_DATE: string, BODY: string, REPORT_COMPANY: string, REPORT_DESCRIPTION: string, REPORT_ACTIVITY: string}}
 */
function selectors() {
    return {
        BODY: "body",
        HEAD: "head",
        STYLE: "style",
        DIV: "div",
        SPAN: "span",
        FORM: "#k-form",
        DYNA_FRAME: "#dynaframe",
        MODAL: "#k-modal",
        FORM_DATE: "#k-date",
        FORM_START: "#k-start",
        FORM_END: "#k-end",
        FORM_LUNCH: "#k-lunch",
        FORM_COMPANY: "#k-company",
        REPORT_TITLE: "#S_ActivityEdit_S_PredefinedTitleSelector_S_HybridSubject",
        REPORT_TO_DO: "#S_ActivityEdit_Activity_ToDo_0",
        REPORT_BRAND: "#Free_S_ActivityEdit_S_FreeFields_Brand",
        REPORT_ACTIVITY: "#Free_S_ActivityEdit_S_FreeFields_TipoAttività",
        REPORT_START: "#S_ActivityEdit_F_StartHour",
        REPORT_END: "#S_ActivityEdit_F_EndHour",
        REPORT_H: "#S_ActivityEdit_TextBoxDurationH",
        REPORT_M: "#S_ActivityEdit_TextBoxDurationM",
        REPORT_COMPANY: "#S_ActivityEdit_TextboxCompany",
        REPORT_DESCRIPTION: "#S_ActivityEdit_TextboxDescription",
    };
}

/**
 * Return all events used in this script
 * @returns {{SUBMIT: string, CHANGE: string, CLICK: string}}
 */
function events() {
    return {
        CLICK: "click",
        SUBMIT: "submit",
        CHANGE: "change",
        KEYDOWN: "keydown",
    };
}

/**
 * Return all constants used in this script
 * @returns {{NEW_INTERVENT_ACTIVITY_NAME: string, HIDE: string, TRUE: string, SHOW: string, NEW_INTERVENT_ACTIVITY_CODE: number, TUSTENA_WAIT: number, FAB_CLASS: string}}
 */
function constants() {
    return {
        FAB_CLASS: "fab",
        LOADER_CLASS: "loader",
        SHOW: "block",
        HIDE: "none",
        TRUE: "true",
        TUSTENA_WAIT: 5000,
        NEW_INTERVENT_ACTIVITY_CODE: 12,
        NEW_INTERVENT_ACTIVITY_NAME: "Voucher Intervento",
    };
}

/**
 * Add css style in the page
 */
function injectCss() {
    let css = ".fab{width:50px;height:50px;background-color:red;border-radius:50%;box-shadow:0 6px 10px 0 #666;transition:all .1s ease-in-out;font-size:35px;color:#fff;text-align:center;line-height:50px;position:fixed;right:50px;bottom:50px}.fab:hover{box-shadow:0 6px 14px 0 #666;transform:scale(1.05)}.modal{display:none;position:fixed;z-index:20;left:0;top:0;width:100%;height:100%;overflow:auto;background-color:#000;background-color:rgba(0,0,0,.4)}.modal-content{background-color:#fefefe;margin:15% auto;padding:20px;border:1px solid #888;width:50%}.close{color:#aaa;float:right;font-size:28px;font-weight:700}.close:focus,.close:hover{color:#000;text-decoration:none;cursor:pointer}.loader{border:16px solid #f3f3f3;border-radius:50%;border-top:16px solid #3498db;width:120px;height:120px;position:fixed;z-index:9999;left:50%;top:50%;-webkit-animation:spin 2s linear infinite;animation:spin 2s linear infinite}@-webkit-keyframes spin{0%{-webkit-transform:rotate(0)}100%{-webkit-transform:rotate(360deg)}}@keyframes spin{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}",
        head = document.head || document.getElementsByTagName(selectors().HEAD)[0],
        style = document.createElement(selectors().STYLE);

    head.appendChild(style);

    style.appendChild(document.createTextNode(css));
}

/**
 * Create and Populate a new Tustena intervention Report
 */
function generateNewReport() {
    const start = new Date(document.querySelector(selectors().FORM_DATE).value);
    const end = start;
    const subTypeActivity = constants().NEW_INTERVENT_ACTIVITY_CODE;
    const subTypeActivityText = constants().NEW_INTERVENT_ACTIVITY_NAME;
    const allDay = true
    let linkDynaBox = "/Common/PopEditActivity.aspx?m=25&si=38&linknew=" + subTypeActivity + "&isoStart=" + start.toISOString() + "&isoEnd=" + end.toISOString() + "&allDay=" + allDay;

    linkDynaBox = TustenaCalendar.getLinkForNewActivity(subTypeActivity, subTypeActivityText, linkDynaBox);

    TustenaCalendar.createDynaBox(linkDynaBox);

    const client = window.clients[document.querySelector(selectors().FORM_COMPANY).value]

    const div = document.createElement(selectors().DIV)
    div.className = constants().LOADER_CLASS

    const body = document.getElementsByTagName(selectors().BODY)[0];
    body.appendChild(div);

    setTimeout(() => {
        const changeEvent = new Event(events().CHANGE);
        const clickEvent = new Event(events().CLICK);
        const keydownEvent = new Event(events().KEYDOWN);

        const iframe = document.querySelector(selectors().DYNA_FRAME);
        const innerDoc = iframe.contentDocument || iframe.contentWindow.document;

        const title_input = innerDoc.querySelector(selectors().REPORT_TITLE);
        const toDo_input = innerDoc.querySelector(selectors().REPORT_TO_DO);
        const brand_select = innerDoc.querySelector(selectors().REPORT_BRAND);
        const activity_select = innerDoc.querySelector(selectors().REPORT_ACTIVITY);
        const start_input = innerDoc.querySelector(selectors().REPORT_START);
        const end_input = innerDoc.querySelector(selectors().REPORT_END);
        const duration_h_input = innerDoc.querySelector(selectors().REPORT_H);
        const duration_m_input = innerDoc.querySelector(selectors().REPORT_M);
        const company_input = innerDoc.querySelector(selectors().REPORT_COMPANY);
        const description_input = innerDoc.querySelector(selectors().REPORT_DESCRIPTION);

        title_input.value = client.title;

        toDo_input.checked = true;
        toDo_input.dispatchEvent(clickEvent);

        let start = document.querySelector(selectors().FORM_START).value;
        let end = document.querySelector(selectors().FORM_END).value;
        const lunch = document.querySelector(selectors().FORM_LUNCH).checked ? 1 : 0;

        start_input.value = start.slice(0, 5);
        end_input.value = end.slice(0, 5);
        end_input.dispatchEvent(changeEvent);

        start = start.split(":");
        end = end.split(":");
        const startDate = new Date(0, 0, 0, start[0], start[1], 0);
        const endDate = new Date(0, 0, 0, end[0], end[1], 0);
        let diff = endDate.getTime() - startDate.getTime();
        const hours = Math.floor(diff / 1000 / 60 / 60);
        diff -= hours * 1000 * 60 * 60;
        const minutes = Math.floor(diff / 1000 / 60);

        duration_h_input.value = hours - lunch;
        duration_m_input.value = minutes;

        description_input.value = client.description;

        for (let i = 0, len = brand_select.options.length; i < len; i++) {
            const opt = brand_select.options[i];
            if (opt.text === client.brand) {
                opt.selected = constants().TRUE;
                break;
            }
        }

        for (let i = 0, len = activity_select.options.length; i < len; i++) {
            const opt = activity_select.options[i];
            if (opt.text === client.activity) {
                opt.selected = constants().TRUE;
                break;
            }
        }

        company_input.value = client.company;
        company_input.dispatchEvent(keydownEvent);

        body.removeChild(div);
    }, constants().TUSTENA_WAIT);
}

/**
 * Open the injected modal
 */
function openModal() {
    const modal = document.querySelector(selectors().MODAL);
    modal.style.display = constants().SHOW;
}

/**
 * Close the injected modal
 */
function closeModal() {
    const modal = document.querySelector(selectors().MODAL);
    modal.style.display = constants().HIDE;
}

/**
 * Main function
 */
(function () {
    'use strict';

    window.clients = window.clients || []

    injectCss();

    /* Create HTML Element */
    const div = document.createElement(selectors().DIV)
    div.className = constants().FAB_CLASS
    div.innerText = '+'

    let options = ""

    window.clients.forEach((client, index) => {
        options += '<option value="' + index + '">' + client.alias + '</option>';
    })

    let modal = "";

    if (options !== "") {
        modal = document.createRange().createContextualFragment('<div id="k-modal" class="modal">' +
            '  <div class="modal-content">' +
            '    <span class="close">&times;</span>' +
            '    <form id="k-form" autocomplete="off">' +
            '       <label htmlFor="k-client">Choose a Client:</label>' +
            '       <select name="client" id="k-company">' +
            options +
            '       </select>' +
            '       <label htmlFor="k-date">Choose a Date:</label>' +
            '       <input id="k-date" type="date">' +
            '       <div>' +
            '           <label htmlFor="k-start">Choose a start time:</label>' +
            '           <input type="time" id="k-start" name="k-start" value="09:00:00" step="60">' +
            '           <label htmlFor="k-end">Choose a end time:</label>' +
            '           <input type="time" id="k-end" name="k-start" value="18:00:00" step="60">' +
            '       </div>' +
            '           <input type="checkbox" id="k-lunch" name="lunch" value="yes" checked="checked">' +
            '           <label htmlFor="k-lunch">Subtract one hour for lunch</label>' +
            '       <div><input type="submit" value="Create Voucher"></div>' +
            '   </form>' +
            '  </div>' +
            '</div>');
    } else {
        modal = document.createRange().createContextualFragment('<div id="k-modal" class="modal">' +
            '  <div class="modal-content">' +
            '    <span class="close">&times;</span>' +
            '   <div>No clients found, please update the scripts with the clients array</div>' +
            '  </div>' +
            '</div>');
    }

    /* Inject HTML element */
    const body = document.getElementsByTagName(selectors().BODY)[0];
    body.appendChild(div);
    body.appendChild(modal);

    modal = document.querySelector(selectors().MODAL);
    const span = modal.getElementsByTagName(selectors().SPAN)[0];

    /* Manage DOM events */
    div.addEventListener(events().CLICK, openModal);
    span.addEventListener(events().CLICK, closeModal);

    window.addEventListener(events().CLICK, (event) => {
        /* When the user clicks anywhere outside of the modal, close it */
        if (event.target === modal) {
            closeModal();
        }
    });

    if(options !== ""){
        const form = document.querySelector(selectors().FORM);

        /* init with current date */
        form.querySelector(selectors().FORM_DATE).value = new Date().toISOString().substring(0, 10);

        form.addEventListener(events().SUBMIT, (event) => {
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();

            closeModal();
            generateNewReport();
        });
    }
})();