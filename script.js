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
            document.getElementById("welcomeHeaderTitle").style.display = "block";
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

document.getElementById("personalInformation").addEventListener(
    "submit",
    function (event) {
        event.preventDefault();
    },
    false
);

function changeTab(n) {
    if (n == 1) {
        if (currentTab == 0 && !validateForm(tabList[currentTab])) {
            return false;
        } else {
            // If the valid status is true, mark the step as finished and valid:
            document.getElementsByClassName("step")[currentTab].className += " finish";
        }
        if (currentTab >= tabList.length - 1) {
            var data = {
                personalInformation: {
                    name: document.getElementById("inputName").value,
                    age: getAgeFromDate(document.getElementById("inputAge").value),
                    email: document.getElementById("inputEmail").value,
                    phone: document.getElementById("inputPhone").value,
                    city: document.getElementById("inputCity").value,
                    state: document.getElementById("inputState").value,
                    summary: document.getElementById("inputSummary").value
                },
                skills: skills,
                professionalExperience: professionalExperiences,
                education: educations
            };

            //...the form gets submitted:
            requestPost(data);
            return false;
        }
    }

    tabList[currentTab].style.display = "none";
    currentTab += n;

    switch (currentTab) {
        case 0:
            document.getElementById("welcomeHeaderTitle").style.display = "none";
            document.getElementById("taskHeaderTitle").style.display = "block";
            document.getElementById("taskHeaderTitle").innerHTML = "Informações Pessoais";
            document.getElementById("previousBtn").disabled = true;
            break;
        case 1:
            document.getElementById("taskHeaderTitle").innerHTML = "Habilidades";
            document.getElementById("previousBtn").disabled = false;
            break;
        case 2:
            document.getElementById("taskHeaderTitle").innerHTML = "Experiências Profissionais";
            break;
        case 3:
            document.getElementById("taskHeaderTitle").innerHTML = "Educação";
            break;
        case 4:
            document.getElementById("taskHeaderTitle").innerHTML = "Um breve resumo sobre você...";
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
        document.getElementsByClassName("step")[currentTab].className += " finish";
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

function getAgeFromDate(date) {
    return 1;
}

// ========== Gerenciamento das habilidades ==============

var skills = {
    class: "Skills",
    softSkills: [],
    hardSkills: []
};

function addSoftSkill() {
    if (document.getElementById("softSkillInp").value != "") {
        var listItem = document.createElement("li");
        skills.softSkills.push(document.getElementById("softSkillInp").value);
        listItem.setAttribute("value", document.getElementById("softSkillInp").value);

        listItem.setAttribute("class", "list-group-item");
        listItem.innerHTML = `
            <button
                type="button"
                class="btn btn-close float-end"
                onclick="removeSoftSkill(this.parentNode)"></button>
            <span>${document.getElementById("softSkillInp").value}<span/>
        `;

        document.getElementById("softSkillList").appendChild(listItem);
        document.getElementById("softSkillInp").value = "";
    }
}

function removeSoftSkill(li) {
    var index = skills.softSkills.indexOf(li.getAttribute("value"));

    skills.softSkills.splice(index, 1);

    li.remove();
}

function addHardSkill() {
    if (document.getElementById("hardSkillInp").value != "") {
        var listItem = document.createElement("li");
        skills.hardSkills.push(document.getElementById("hardSkillInp").value);
        listItem.setAttribute("value", document.getElementById("hardSkillInp").value);

        listItem.setAttribute("class", "list-group-item");
        listItem.innerHTML = `
            <button
                type="button"
                class="btn btn-close float-end"
                onclick="removeHardSkill(this.parentNode)"></button>
            <span>${document.getElementById("hardSkillInp").value}<span/>
        `;

        document.getElementById("hardSkillList").appendChild(listItem);
        document.getElementById("hardSkillInp").value = "";
    }
}

function removeHardSkill(li) {
    var index = skills.hardSkills.indexOf(li.getAttribute("value"));

    skills.hardSkills.splice(index, 1);

    li.remove();
}

// ============ Gerenciamento das experiências profissionais =================

var professionalExperiences = [];
var responsibilities = [];

document.getElementById("stillWorkingCheckbox").addEventListener("change", toggleStillWorking, false);

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

function addResponsibilitie() {
    if (document.getElementById("responsibilitieInp").value != "") {
        var listItem = document.createElement("li");

        responsibilities.push(document.getElementById("responsibilitieInp").value);

        listItem.innerHTML = `
            <button type="button" 
                class="btn btn-close float-end" 
                onclick="removeResponsibilitie(this.parentNode)"></button>
            <span>${document.getElementById("responsibilitieInp").value}</span>
        `;

        listItem.setAttribute("class", "list-group-item responsibilitie");
        listItem.setAttribute("value", document.getElementById("responsibilitieInp").value);

        document.getElementById("responsibilitiesList").appendChild(listItem);
        document.getElementById("responsibilitieInp").value = "";
    }
}

function removeResponsibilitie(li) {
    var index = responsibilities.indexOf(li.getAttribute("value"));

    responsibilities.splice(index, 1);

    li.remove();
}

function addProfessionalExperience() {
    if (!validateForm(document.getElementById("professionalExperienceList"))) {
        return false;
    } else {
        var form = document.getElementById("professionalExperienceList");
        var li = document.createElement("li");
        var professionalExperience = {
            class: "ProfessionalExperience",
            jobTitle: document.getElementById("inputJob").value,
            companyName: document.getElementById("inputCompany").value,
            startMonth: document.getElementById("inputExpSM").value,
            startYear: document.getElementById("inputExpSY").value,
            endMonth: document.getElementById("inputExpEM").value,
            endYear: document.getElementById("inputExpEY").value,
            stillWorking: document.getElementById("stillWorkingCheckbox").checked,
            responsibilities: responsibilities
        };

        professionalExperiences.push(professionalExperience);
        li.setAttribute("class", "list-group-item");
        li.setAttribute(
            "value",
            professionalExperience.jobTitle +
            professionalExperience.companyName +
            professionalExperience.startMonth +
            professionalExperience.startYear
        );

        if (!document.getElementById("stillWorkingCheckbox").checked) {
            li.innerHTML = `
                <button
                    type="button"
                    class="btn btn-close float-end"
                    onclick="removeProfessionalExperience(this.parentNode)"></button>
                <h5 class="card-title">${professionalExperience.jobTitle}</h5>
                <h6 class="card-subtitle mb-2 text-muted">
                    ${professionalExperience.companyName + " "} 
                    ${professionalExperience.startMonth}/${professionalExperience.startYear} - 
                    ${professionalExperience.endMonth}/${professionalExperience.endYear}
                </h6>
            `;
        } else {
            li.innerHTML = `
                <button
                    type="button"
                    class="btn btn-close float-end"
                    onclick="removeProfessionalExperience(this.parentNode)"></button>
                <h5 class="card-title">${professionalExperience.jobTitle}</h5>
                <h6 class="card-subtitle mb-2 text-muted">
                    ${professionalExperience.companyName + " "} 
                    ${professionalExperience.startMonth}/${professionalExperience.startYear} - 
                    Atualmente
                </h6>
            `;
        }

        professionalExperience.responsibilities.forEach((resp) => {
            var span = document.createElement("span");
            span.innerHTML = `- ${resp}<br/>`;

            li.appendChild(span);
        });

        form.appendChild(li);

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
            li.remove();
        });

        responsibilities = [];
    }
}

function removeProfessionalExperience(li) {
    var item, index;

    professionalExperiences.forEach((professionalExperience) => {
        if (
            li.getAttribute("value") ==
            professionalExperience.jobTitle +
            professionalExperience.companyName +
            professionalExperience.startMonth +
            professionalExperience.startYear
        ) {
            item = professionalExperience;
        }
    });

    index = professionalExperiences.indexOf(item);

    professionalExperiences.splice(index, 1);

    li.remove();
}

// =========== Gerencia lista da educação ===============

var educations = [];

function addEducation() {
    if (!validateForm(document.getElementById("educationList"))) {
        return false;
    } else {
        var li = document.createElement("li");
        li.setAttribute("class", "list-group-item");

        var education = {
            class: "Education",
            course: document.getElementById("inputCourse").value,
            educationalInstitution: document.getElementById("inputInstitution").value,
            startYear: document.getElementById("inputEduSY").value,
            endYear: document.getElementById("inputEduEY").value,
            situation: document.getElementById("inputCourseSituation").value
        };
        educations.push(education);

        li.setAttribute("value", education.course + education.educationalInstitution);
        li.innerHTML = `
                <button
                    type="button"
                    class="btn btn-close float-end"
                    onclick="removeEducation(this.parentNode)"></button>
                <h5 class="card-title">
                    ${education.course + " - "}
                    ${education.situation + " - "}
                </h5>
                <h6 class="card-subtitle mb-2 text-muted">
                    ${education.educationalInstitution + " "} 
                    ${education.startYear} - ${education.endYear}
                </h6>
            `;

        document
            .getElementById("educationList").appendChild(li);
        document
            .getElementById("educationList")
            .querySelectorAll("input")
            .forEach((input) => {
                input.className = "form-control";
                input.value = "";
            });

        document.getElementById("inputCourseSituation").value = "";
        document.getElementById("inputCourseSituation").className = "form-select";
    }
}

function removeEducation(li) {
    var item, index;

    educations.forEach((education) => {
        if (li.getAttribute("value") == education.course + education.educationalInstitution) {
            item = education;
        }
    });

    index = educations.indexOf(item);

    educations.splice(index, 1);

    li.remove();
}

function requestPost(data) {
    const json = JSON.stringify(data);
    console.log(json);
    const requestOptions = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        },
        body: json
    };

    // URL para onde enviar a requisição POST
    const url = "set_data.php";

    fetch(url, requestOptions)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Erro na requisição: " + response.status);
            }
            return response.json();
        })
        .then((data) => {
            console.log("Dados recebidos:", data);
            // Aqui você pode processar os dados recebidos do PHP
        })
        .catch((error) => {
            console.error("Erro durante a requisição fetch:", error);
            // Loga a resposta completa para depurar
        });
}

// ======== Remove qualquer item da sua lista Pai ========

function removeListItem(li) {
    li.remove();
}
