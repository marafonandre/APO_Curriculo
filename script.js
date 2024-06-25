// ------------------------ Tratamento da parte visual e envio de formulários --------------------------

var currentTab = 0;
var tabList = document.getElementsByClassName("tab");

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
        if (currentTab == 0 && !validateForm(tabList[currentTab])) return false;

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

    return valid;
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

    listItem.setAttribute("name", "softSkills[]");
    listItem.setAttribute(
        "value",
        document.getElementById("softSkillInp").value
    );
    listItem.setAttribute("class", "list-group-item");
    removeButton.setAttribute("type", "button");
    removeButton.setAttribute("class", "btn btn-close float-end");
    removeButton.setAttribute("onclick", "removeListItem(this.parentNode)");

    span.innerText = listItem.getAttribute("value");

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

    listItem.setAttribute("name", "hardSkills[]");
    listItem.setAttribute(
        "value",
        document.getElementById("hardSkillInp").value
    );
    listItem.setAttribute("class", "list-group-item");
    removeButton.setAttribute("type", "button");
    removeButton.setAttribute("class", "btn btn-close float-end");
    removeButton.setAttribute("onclick", "removeListItem(this.parentNode)");

    span.innerText = listItem.getAttribute("value");

    listItem.appendChild(span);
    listItem.appendChild(removeButton);

    return listItem;
}

// ============ Gerenciamento das experiências profissionais =================

document
    .getElementById("stillWorkingCheckbox")
    .addEventListener("click", toggleStillWorking, false);

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
        document
            .getElementById("professionalExperienceList")
            .appendChild(createProfessionalExperienceListItem());
    }
}

function createProfessionalExperienceListItem() {
    var listItem = document.createElement("li");
    var jobTitle = document.createElement("h5");
    var companyAndPeriod = document.createElement("h6");
    var removeButton = document.createElement("button");

    listItem.setAttribute("class", "list-group-item");
    jobTitle.setAttribute("class", "card-title");
    companyAndPeriod.setAttribute("class", "card-subtitle mb-2 text-muted");
    removeButton.setAttribute("type", "button");
    removeButton.setAttribute("class", "btn btn-close float-end");
    removeButton.setAttribute("onclick", "removeListItem(this.parentNode)");

    jobTitle.innerText = document.getElementById("inputJob").value;
    if (document.getElementById("stillWorkingCheckbox").checked) {
        companyAndPeriod.innerText =
            document.getElementById("inputCompany").value +
            " " +
            document.getElementById("inputExpSM").value +
            "/" +
            document.getElementById("inputExpSY").value +
            " - Atualmente";
    } else {
        companyAndPeriod.innerText =
            document.getElementById("inputCompany").value +
            " " +
            document.getElementById("inputExpSM").value +
            "/" +
            document.getElementById("inputExpSY").value +
            " - " +
            document.getElementById("inputExpEM").value +
            "/" +
            document.getElementById("inputExpEY").value;
    }

    listItem.appendChild(removeButton);
    listItem.appendChild(jobTitle);
    listItem.appendChild(companyAndPeriod);

    var resposibilities = document.getElementsByClassName("responsibilitie");

    for (var i = 0; i < resposibilities.length; i++) {
        var spanResponsibilitie = document.createElement("span");

        spanResponsibilitie.innerText =
            "- " + resposibilities[i].getAttribute("value");

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

    listItem.setAttribute("name", "responsibilities[]");
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

// =========== Gerencia lista da educação =============== TODO
function addEducation() {
    if (!validateForm(document.getElementById("professionalExperienceList"))) {
        return false;
    } else {
        document
            .getElementById("professionalExperienceList")
            .appendChild(createProfessionalExperienceListItem());
    }
}

function createProfessionalExperienceListItem() {
    var listItem = document.createElement("li");
    var jobTitle = document.createElement("h5");
    var companyAndPeriod = document.createElement("h6");
    var removeButton = document.createElement("button");

    listItem.setAttribute("class", "list-group-item");
    jobTitle.setAttribute("class", "card-title");
    companyAndPeriod.setAttribute("class", "card-subtitle mb-2 text-muted");
    removeButton.setAttribute("type", "button");
    removeButton.setAttribute("class", "btn btn-close float-end");
    removeButton.setAttribute("onclick", "removeListItem(this.parentNode)");

    jobTitle.innerText = document.getElementById("inputJob").value;
    if (document.getElementById("stillWorkingCheckbox").checked) {
        companyAndPeriod.innerText =
            document.getElementById("inputCompany").value +
            " " +
            document.getElementById("inputExpSM").value +
            "/" +
            document.getElementById("inputExpSY").value +
            " - Atualmente";
    } else {
        companyAndPeriod.innerText =
            document.getElementById("inputCompany").value +
            " " +
            document.getElementById("inputExpSM").value +
            "/" +
            document.getElementById("inputExpSY").value +
            " - " +
            document.getElementById("inputExpEM").value +
            "/" +
            document.getElementById("inputExpEY").value;
    }

    listItem.appendChild(removeButton);
    listItem.appendChild(jobTitle);
    listItem.appendChild(companyAndPeriod);

    var resposibilities = document.getElementsByClassName("responsibilitie");

    for (var i = 0; i < resposibilities.length; i++) {
        var spanResponsibilitie = document.createElement("span");

        spanResponsibilitie.innerText =
            "- " + resposibilities[i].getAttribute("value");

        listItem.appendChild(spanResponsibilitie);
        listItem.appendChild(document.createElement("br"));
    }

    return listItem;
}

// ======== Remove qualquer item da sua lista Pai ========
function removeListItem(li) {
    li.parentNode.removeChild(li);
}
