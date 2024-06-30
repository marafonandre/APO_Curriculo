// ------------------------ Tratamento da parte visual e envio de formulários --------------------------

var currentTab = 0;
var tabList;

var mapOfLists = [];
var mainPage = document.body.innerHTML;

var data = {};
var json;

resetListeners();

function changeContent(option) {
    document.body.innerHTML = mainPage;
    resetListeners();
    tabList = document.getElementsByClassName("tab");
    clearAll();

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
            currentTab = -1;
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
            data = {
                personalInformation: {
                    name: document.getElementById("inputName").value,
                    date: document.getElementById("inputAge").value,
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
            getAgeFromDate(document.getElementById("inputAge").value);
            document.getElementById("taskHeaderTitle").innerHTML = "Habilidades";
            document.getElementById("previousBtn").disabled = false;
            break;
        case 2:
            document.getElementById("taskHeaderTitle").innerHTML = "Experiências Profissionais";
            break;
        case 3:
            document.getElementById("taskHeaderTitle").innerHTML = "Formação";
            break;
        case 4:
            document.getElementById("taskHeaderTitle").innerHTML = "Um breve resumo sobre você...";
            document.getElementById("nextBtn").innerHTML = "Concluir";
            break;
    }

    fixStepIndicator();
    showTab();
}

function clearAll() {
    skills = {
        softSkills: [],
        hardSkills: []
    };
    professionalExperiences = [];
    responsibilities = [];
    educations = [];
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
            if (input.type == "date" && new Date() <= new Date(input.value)) {
                input.className = "form-control is-invalid";
                valid = false;
            }
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

    return valid;
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

function getAgeFromDate(dateStr) {
    // Converte a string da data de nascimento para um objeto Date
    var date = new Date(dateStr);
    var today = new Date();

    // Calcula a diferença em milissegundos entre as datas
    var diff = today - date;

    // Converte a diferença de milissegundos para anos
    var age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));

    return age;
}

function formatPhoneNumber() {
    var input = document.getElementById("inputPhone");
    var num = input.value.replace(/\D/g, ""); // Remove tudo que não é dígito

    // Aplica a formatação (99) 99999-9999
    var formattedNum = "";

    // Formatação para números com menos de 2 dígitos
    if (num.length > 0) {
        formattedNum = "(" + num.substring(0, 2);
    }
    if (num.length >= 2) {
        formattedNum = "(" + num.substring(0, 2);
    }
    if (num.length > 2) {
        formattedNum += ") " + num.substring(2, 7);
    }
    if (num.length > 7) {
        formattedNum += "-" + num.substring(7, 11);
    }

    input.value = formattedNum;
}

function resetListeners() {
    // Adiciona um evento de clique ao elemento pai, que contém o navbar
    document.body.addEventListener("click", function (event) {
        if (event.target.classList.contains("home")) {
            changeContent("home");
        }
        if (event.target.classList.contains("new")) {
            changeContent("new");
        }
        if (event.target.classList.contains("print")) {
            print();
        }
    });
    if (document.getElementsByClassName("downloadJSON").length > 0) {
        document.getElementsByClassName("downloadJSON")[0].addEventListener("click", function () {
            downloadJSON();
        });
    }

    if (document.getElementById("stillWorkingCheckbox")) {
        document.getElementById("stillWorkingCheckbox").addEventListener("change", toggleStillWorking, false);
    }
    if (document.getElementById("inputPhone")) {
        document.getElementById("inputPhone").addEventListener("input", formatPhoneNumber);
    }
    if (document.getElementById("load")) {
        document.getElementById("load").addEventListener("click", function () {
            document.getElementById("fileInput").click();
        });
    }
    if (document.getElementById("fileInput")) {
        document.getElementById("fileInput").addEventListener("change", function (event) {
            var files = event.target.files; // Obtém a lista de arquivos selecionados

            // Verifica se foi selecionado exatamente um arquivo
            if (files.length !== 1) {
                alert("Por favor, selecione um único arquivo.");
                return;
            }

            var file = files[0]; // Obtém o primeiro (e único) arquivo selecionado

            var reader = new FileReader();

            reader.onload = function (event) {
                var contents = event.target.result;
                try {
                    var json = JSON.parse(contents);
                    loadInputs(json);
                } catch (e) {
                    alert("Erro ao ler o arquivo JSON.");
                    console.error(e);
                }
            };

            reader.readAsText(file);
        });
    }
}

function loadInputs(curriculum) {
    changeContent("new");

    document.getElementById("inputName").value = curriculum.personalInformation.name;
    document.getElementById("inputAge").value = curriculum.personalInformation.date;
    document.getElementById("inputEmail").value = curriculum.personalInformation.email;
    document.getElementById("inputPhone").value = curriculum.personalInformation.phone;
    document.getElementById("inputCity").value = curriculum.personalInformation.city;
    document.getElementById("inputState").value = curriculum.personalInformation.state;
    document.getElementById("inputSummary").value = curriculum.personalInformation.summary;

    curriculum.skills.softSkills.forEach((softSkill) => {
        var listItem = document.createElement("li");
        skills.softSkills.push(softSkill);
        listItem.setAttribute("value", softSkill);

        listItem.setAttribute("class", "list-group-item");
        listItem.innerHTML = `
            <button
                type="button"
                class="btn btn-close float-end"
                onclick="removeSoftSkill(this.parentNode)"></button>
            <span>${softSkill}<span/>
        `;

        document.getElementById("softSkillList").appendChild(listItem);
    });
    curriculum.skills.hardSkills.forEach((hardSkill) => {
        var listItem = document.createElement("li");
        skills.hardSkills.push(hardSkill);
        listItem.setAttribute("value", hardSkill);

        listItem.setAttribute("class", "list-group-item");
        listItem.innerHTML = `
            <button
                type="button"
                class="btn btn-close float-end"
                onclick="removeHardSkill(this.parentNode)"></button>
            <span>${hardSkill}<span/>
        `;

        document.getElementById("hardSkillList").appendChild(listItem);
    });

    curriculum.professionalExperience.forEach((professionalExperience) => {
        var form = document.getElementById("professionalExperienceList");
        var li = document.createElement("li");

        professionalExperiences.push(professionalExperience);
        li.setAttribute("class", "list-group-item");
        li.setAttribute(
            "value",
            professionalExperience.jobTitle +
                professionalExperience.companyName +
                professionalExperience.startMonth +
                professionalExperience.startYear
        );

        if (!professionalExperience.stillWorking) {
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
    });

    curriculum.education.forEach((education) => {
        var li = document.createElement("li");
        li.setAttribute("class", "list-group-item");

        educations.push(education);
        li.setAttribute("value", education.course + education.educationalInstitution);
        li.innerHTML = `
                <button
                    type="button"
                    class="btn btn-close float-end"
                    onclick="removeEducation(this.parentNode)"></button>
                <h5 class="card-title">
                    ${education.course + " - "}
                    ${education.situation}
                </h5>
                <h6 class="card-subtitle mb-2 text-muted">
                    ${education.educationalInstitution + " "} 
                    ${education.startYear} - ${education.endYear}
                </h6>
            `;

        document.getElementById("educationList").appendChild(li);
    });
}

// ========== Gerenciamento das habilidades ==============

var skills = {
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
            if (li.className.includes("responsibilitie")) {
                li.remove();
            }
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
                    ${education.situation}
                </h5>
                <h6 class="card-subtitle mb-2 text-muted">
                    ${education.educationalInstitution + " "} 
                    ${education.startYear} - ${education.endYear}
                </h6>
            `;

        document.getElementById("educationList").appendChild(li);
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
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: json
    };

    // URL para onde enviar a requisição POST

    fetch("./actions/print_page.php", requestOptions)
        .then((response) => response.text())
        .then((html) => {
            document.body.innerHTML = html;
            resetListeners();
        })
        .catch((error) => {
            console.error("Erro durante a requisição fetch:", error);
            // Loga a resposta completa para depurar
        });

    /* fetch("./actions/set_data_and_get_json.php", requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar os dados.');
            }
            return response.json(); // Converte a resposta para JSON
        })
        .then(data => {
            console.log(data); // Dados recebidos em formato JSON
            // Faça o que for necessário com os dados JSON recebidos
        })
        .catch(error => {
            console.error("Erro durante a requisição fetch:", error);
            // Loga a resposta completa para depurar
        }); */
}

function print() {
    // Cria um novo documento para a impressão
    var printGuide = window.open("", "_blank");
    printGuide.document.write('<!doctype html><html lang="pt-BR"><head><title>Imprimir Curriculum</title>');
    // Inclui os estilos do Bootstrap na página de impressão
    printGuide.document.write(
        '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous" />'
    );
    printGuide.document.write('</head><body><div class="container" style="margin-top: 2rem; margin-bottom: 2 rem">');
    printGuide.document.write(document.getElementById("curriculum").innerHTML);
    printGuide.document.write("</div></body></html>");
    // Chama o método de impressão na nova guia
    printGuide.print();
    printGuide.document.close();

    printGuide.close();
}

function downloadJSON() {
    var json = JSON.stringify(data);
    var blob = new Blob([json], { type: "application/json" });

    var link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "CurriculumVitae";

    // Força o download do arquivo
    link.click();

    // Limpa a URL do objeto Blob após o download
    URL.revokeObjectURL(link.href);
}

// ======== Remove qualquer item da sua lista Pai ========

function removeListItem(li) {
    li.remove();
}
