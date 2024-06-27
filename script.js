// ------------------------ Tratamento da parte visual e envio de formulários --------------------------

var currentTab = 0;
var tabList = document.getElementsByClassName("tab");

var mapOfLists = [];

function changeContent(option) {
    switch (option) {
        case "new":
            currentTab = 0;
            document.getElementById("welcomeContent").style.display = "none";
            document.getElementById("tabProgress").style.display = "block";
            document.getElementById("nextBtn").style.display = "inline";
            document.getElementById("previousBtn").style.display = "inline";
            document.getElementById("previousBtn").disabled = true;
            changeTab(0);
            break;

        case "home":
            tabList[currentTab].style.display = "none";
            document.getElementById("tabProgress").style.display = "none";
            document.getElementById("previousBtn").style.display = "none";
            document.getElementById("nextBtn").style.display = "none";
            document.getElementById("nextBtn").innerHTML = "Próximo";
            document.getElementById("welcomeContent").style.display = "block";
            document.getElementById("taskHeaderTitle").style.display = "none";
            document.getElementById("welcomeHeaderTitle").style.display =
                "block";
            currentTab = -1;
            clearTabs();
            break;
    }
}

function showTab() {
    tabList[currentTab].style.display = "block";

    if (currentTab == tabList.length - 1) {
        document.getElementById("nextBtn").innerHTML = "Concluir";
    } else {
        document.getElementById("nextBtn").innerHTML = "Próximo";
    }
}

function changeTab(n) {
    if (n == 1) {
        if (currentTab == 0 && !validateForm(tabList[currentTab])) {
            return false;
        } else {
            // If the valid status is true, mark the step as finished and valid:
            document.getElementsByClassName("step")[currentTab].className +=
                " finish";
        }

        if (currentTab >= tabList.length - 1) {
            //...the form gets submitted:
            document.getElementById("dataForm").submit();
            return false;
        }
    }

    tabList[currentTab].style.display = "none";
    currentTab += n;

    switch (currentTab) {
        case 0:
            document.getElementById("welcomeHeaderTitle").style.display =
                "none";
            document.getElementById("taskHeaderTitle").style.display = "block";
            document.getElementById("taskHeaderTitle").innerHTML =
                "Informações Pessoais";
            document.getElementById("previousBtn").disabled = true;
            break;
        case 1:
            document.getElementById("taskHeaderTitle").innerHTML =
                "Habilidades";
            document.getElementById("previousBtn").disabled = false;
            break;
        case 2:
            document.getElementById("taskHeaderTitle").innerHTML =
                "Experiências Profissionais";
            break;
        case 3:
            document.getElementById("taskHeaderTitle").innerHTML = "Educação";
            break;
        case 4:
            document.getElementById("taskHeaderTitle").innerHTML =
                "Um breve resumo sobre você...";
            document.getElementById("nextBtn").innerHTML = "Concluir";
            break;
    }

    fixStepIndicator();
    showTab();
}

function clearTabs() {
    // TODO
    console.log("limpando");
}

function validateForm(form, button) {
    var valid = true;
    var inputs = form.querySelectorAll(".form-control");
    var selects = form.querySelectorAll(".form-select");

    inputs.forEach((input) => {
        if (input.required && input.value == "") {
            input.className = "form-control is-invalid";
            valid = false;
        } else if (input.required) {
            input.className = "form-control is-valid";
        }
    });

    selects.forEach((select) => {
        if (select.required && select.value == "") {
            select.className = "form-select is-invalid";
            valid = false;
        } else if (select.required) {
            select.className = "form-select is-valid";
        }
    });

    if (valid) {
        document.getElementsByClassName("step")[currentTab].className +=
            " finish";
    }

    return true;
}

function fixStepIndicator(n) {
    // This function removes the "active" class of all steps...
    var i,
        x = document.getElementsByClassName("step");
    for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" active", "");
    }
    //... and adds the "active" class to the current step:
    x[currentTab].className += " active";
}

// ========== Gerenciamento das habilidades ==============
function addSoftSkill() {
    if (document.getElementById("softSkillInp").value != "") {
        document
            .getElementById("softSkillList")
            .appendChild(createSoftSkillListItem());
        document.getElementById("softSkillInp").value = "";
    }
}

function createSoftSkillListItem() {
    var listItem = document.createElement("li");
    var span = document.createElement("span");
    var removeButton = document.createElement("button");

    listItem.setAttribute(
        "value",
        document.getElementById("softSkillInp").value
    );
    listItem.setAttribute("class", "list-group-item");
    removeButton.setAttribute("type", "button");
    removeButton.setAttribute("class", "btn btn-close float-end");
    removeButton.setAttribute("onclick", "removeListItem(this.parentNode)");

    span.innerText = listItem.getAttribute("value");
    span.setAttribute("name", "Skills[softSkills][]");
    addToForm(span, listItem);

    listItem.appendChild(span);
    listItem.appendChild(removeButton);

    return listItem;
}

function addHardSkill() {
    if (document.getElementById("hardSkillInp").value != "") {
        document
            .getElementById("hardSkillList")
            .appendChild(createHardSkillListItem());
        document.getElementById("hardSkillInp").value = "";
    }
}

function createHardSkillListItem() {
    var listItem = document.createElement("li");
    var span = document.createElement("span");
    var removeButton = document.createElement("button");

    listItem.setAttribute(
        "value",
        document.getElementById("hardSkillInp").value
    );
    listItem.setAttribute("class", "list-group-item");
    removeButton.setAttribute("type", "button");
    removeButton.setAttribute("class", "btn btn-close float-end");
    removeButton.setAttribute("onclick", "removeListItem(this.parentNode)");

    span.setAttribute("name", "Skills[hardSkills][]");
    span.innerText = listItem.getAttribute("value");
    addToForm(span, listItem);

    listItem.appendChild(span);
    listItem.appendChild(removeButton);

    return listItem;
}

// ============ Gerenciamento das experiências profissionais =================

document
    .getElementById("stillWorkingCheckbox")
    .addEventListener("change", toggleStillWorking, false);

function toggleStillWorking() {
    if (document.getElementById("stillWorkingCheckbox").checked) {
        document.getElementById("inputExpEM").disabled = true;
        document.getElementById("inputExpEY").disabled = true;
        document.getElementById("inputExpEM").className = "form-control";
        document.getElementById("inputExpEY").className = "form-control";
        document.getElementById("inputExpEM").required = false;
        document.getElementById("inputExpEY").required = false;
    } else {
        document.getElementById("inputExpEM").disabled = false;
        document.getElementById("inputExpEY").disabled = false;
        document.getElementById("inputExpEM").className = "form-control";
        document.getElementById("inputExpEY").className = "form-control";
        document.getElementById("inputExpEM").required = true;
        document.getElementById("inputExpEY").required = true;
    }
}

function addProfessionalExperience() {
    if (!validateForm(document.getElementById("professionalExperienceList"))) {
        return false;
    } else {
        var form = document.getElementById("professionalExperienceList");
        form.appendChild(createProfessionalExperienceListItem());
        form.querySelectorAll("input").forEach((input) => {
            if (input.required) {
                input.className = "form-control";
                input.value = "";
            }

            if (input.className == "form-check-input") {
                input.checked = false;
                toggleStillWorking();
            }
        });

        form = document.getElementById("responsibilitiesList");
        form.querySelectorAll("li").forEach((li) => {
            if (li.className.includes("responsibilitie")) {
                form.removeChild(li);
            }
        });
    }
}

function createProfessionalExperienceListItem() {
    var listItem = document.createElement("li");
    var jobTitle = document.createElement("h5");
    var removeButton = document.createElement("button");
    var h6 = document.createElement("h6");
    var index =
        document.getElementById("professionalExperienceList").children.length -
        1;

    listItem.setAttribute("class", "list-group-item");

    jobTitle.setAttribute("class", "card-title");
    jobTitle.innerText = document.getElementById("inputJob").value;
    jobTitle.setAttribute(
        "name",
        "ProfessionalExperience[" + index + "][jobTitle]"
    );

    addToForm(jobTitle, listItem);

    h6.setAttribute("class", "card-subtitle text-muted");

    removeButton.setAttribute("type", "button");
    removeButton.setAttribute("class", "btn btn-close float-end");
    removeButton.setAttribute("onclick", "removeListItem(this.parentNode)");

    for (var i = 0; i < 5; i++) {
        var span = document.createElement("span");
        var separator = document.createElement("span");

        switch (i) {
            case 0:
                span.innerText = document.getElementById("inputCompany").value;
                span.setAttribute(
                    "name",
                    "ProfessionalExperience[" + index + "][companyName]"
                );

                separator.innerText = " ";

                addToForm(span, listItem);

                h6.appendChild(span);
                h6.appendChild(separator);
                break;

            case 1:
                span.innerText = document.getElementById("inputExpSM").value;
                span.setAttribute(
                    "name",
                    "ProfessionalExperience[" + index + "][startMonth]"
                );

                separator.innerText = "/";

                addToForm(span, listItem);

                h6.appendChild(span);
                h6.appendChild(separator);
                break;

            case 2:
                if (document.getElementById("stillWorkingCheckbox").checked) {
                    span.innerText =
                        document.getElementById("inputExpSY").value;
                    separator.innerText = " - Atualmente";
                    span.setAttribute(
                        "name",
                        "ProfessionalExperience[" + index + "][startYear]"
                    );
                } else {
                    span.innerText =
                        document.getElementById("inputExpSY").value;
                    span.setAttribute(
                        "name",
                        "ProfessionalExperience[" + index + "][startYear]"
                    );

                    separator.innerText = " - ";
                }

                addToForm(span, listItem);

                h6.appendChild(span);
                h6.appendChild(separator);
                break;

            case 3:
                span.setAttribute(
                    "name",
                    "ProfessionalExperience[" + index + "][endMonth]"
                );

                if (!document.getElementById("stillWorkingCheckbox").checked) {
                    span.innerText =
                        document.getElementById("inputExpEM").value;

                    separator.innerText = "/";

                    h6.appendChild(span);
                    h6.appendChild(separator);
                } else {
                    span.innerText = "";
                    h6.appendChild(span);
                }

                addToForm(span, listItem);
                break;

            case 4:
                span.setAttribute(
                    "name",
                    "ProfessionalExperience[" + index + "][endYear]"
                );

                if (!document.getElementById("stillWorkingCheckbox").checked) {
                    span.innerText =
                        document.getElementById("inputExpEY").value;
                } else {
                    span.innerText = "";
                }

                addToForm(span, listItem);
                h6.appendChild(span);
                break;
        }
    }

    listItem.appendChild(removeButton);
    listItem.appendChild(jobTitle);
    listItem.appendChild(h6);

    var resposibilities = document.getElementsByClassName("responsibilitie");

    for (var n = 0; n < resposibilities.length; n++) {
        var spanResponsibilitie = document.createElement("span");

        spanResponsibilitie.innerText =
            " - " + resposibilities[n].getAttribute("value");
        spanResponsibilitie.setAttribute(
            "name",
            "ProfessionalExperience[" + index + "][responsibilities][]"
        );
        addToForm(spanResponsibilitie, listItem);

        listItem.appendChild(spanResponsibilitie);
        listItem.appendChild(document.createElement("br"));
    }

    return listItem;
}

function addResponsibilitie() {
    if (document.getElementById("responsibilitieInp").value != "") {
        document
            .getElementById("responsibilitiesList")
            .appendChild(createResponsibilitieListItem());
        document.getElementById("responsibilitieInp").value = "";
    }
}

function createResponsibilitieListItem() {
    var listItem = document.createElement("li");
    var spanResponsibilitie = document.createElement("span");
    var removeButton = document.createElement("button");

    listItem.setAttribute(
        "value",
        document.getElementById("responsibilitieInp").value
    );
    listItem.setAttribute("class", "list-group-item responsibilitie");
    spanResponsibilitie.innerText = listItem.getAttribute("value");
    removeButton.setAttribute("type", "button");
    removeButton.setAttribute("class", "btn btn-close float-end");
    removeButton.setAttribute("onclick", "removeListItem(this.parentNode)");

    listItem.appendChild(spanResponsibilitie);
    listItem.appendChild(removeButton);

    return listItem;
}

// =========== Gerencia lista da educação ===============
function addEducation() {
    if (!validateForm(document.getElementById("educationList"))) {
        return false;
    } else {
        document
            .getElementById("educationList")
            .appendChild(createEducationListItem());

        document
            .getElementById("educationList")
            .querySelectorAll("input")
            .forEach((input) => {
                input.className = "form-control";
                input.value = "";
            });

        document.getElementById("inputCourseSituation").value = "";
        document.getElementById("inputCourseSituation").className =
            "form-select";
    }
}

function createEducationListItem() {
    var listItem = document.createElement("li");
    var removeButton = document.createElement("button");
    var h6 = document.createElement("h6");
    var h5 = document.createElement("h5");
    var index = document.getElementById("educationList").children.length - 1;

    listItem.setAttribute("class", "list-group-item");

    h5.setAttribute("class", "card-title");
    h6.setAttribute("class", "card-subtitle mb-2 text-muted");

    removeButton.setAttribute("type", "button");
    removeButton.setAttribute("class", "btn btn-close float-end");
    removeButton.setAttribute("onclick", "removeListItem(this.parentNode)");

    for (var i = 0; i < 5; i++) {
        var span = document.createElement("span");
        var separator = document.createElement("span");

        switch (i) {
            case 0:
                span.innerText = document.getElementById("inputCourse").value;
                separator.innerText = " - ";
                span.setAttribute("name", "Education[" + index + "][course]");
                h5.appendChild(span);
                h5.appendChild(separator);
                addToForm(span, listItem);
                break;

            case 1:
                span.innerText = document.getElementById(
                    "inputCourseSituation"
                ).value;
                span.setAttribute(
                    "name",
                    "Education[" + index + "][situation]"
                );
                h5.appendChild(span);
                addToForm(span, listItem);
                break;

            case 2:
                span.innerText =
                    document.getElementById("inputInstitution").value;
                separator.innerText = " ";
                span.setAttribute(
                    "name",
                    "Education[" + index + "][educationalInstitution]"
                );
                h6.appendChild(span);
                h6.appendChild(separator);
                addToForm(span, listItem);
                break;

            case 3:
                span.innerText =
                    document.getElementById("inputEduSY").value + " - ";
                separator.innerText = " - ";
                span.setAttribute(
                    "name",
                    "Education[" + index + "][startYear]"
                );
                h6.appendChild(span);
                h6.appendChild(separator);
                addToForm(span, listItem);
                break;

            case 4:
                span.innerText = document.getElementById("inputEduEY").value;
                span.setAttribute("name", "Education[" + index + "][endYear]");
                h6.appendChild(span);
                addToForm(span, listItem);
                break;
        }
    }

    listItem.appendChild(removeButton);
    listItem.appendChild(h5);
    listItem.appendChild(h6);

    return listItem;
}

// ======== Remove qualquer item da sua lista Pai ========
function removeListItem(li) {
    li.parentNode.removeChild(li);
}

// ========== cria ou remove um input escondido pra cada item que será enviado ==============
function addToForm(span, li) {
    var input = document.createElement("input");

    input.setAttribute("name", span.getAttribute("name"));
    input.style.display = "none";
    input.value = span.innerText;

    li.appendChild(input);
}
