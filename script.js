// ------------------------ Tratamento da parte visual e envio de formulários --------------------------

var currentTab = 0;
var tabList = document.getElementsByClassName("tab");
console.log(tabList.length);

function changeContent(option) {
    switch (option) {
        case "new":
            currentTab = 0;
            document.getElementById("welcomeContent").style.display = "none";
            document.getElementById("tabProgress").style.display = "block";
            document.getElementById("nextBtn").style.display = "inline";
            updateHeader();
            showCurrentTab();
            break;

        case "home":
            hideCurrentTab();
            document.getElementById("tabProgress").style.display = "none";
            document.getElementById("previousBtn").style.display = "none";
            document.getElementById("nextBtn").style.display = "none";
            document.getElementById("nextBtn").innerHTML = "Próximo";
            document.getElementById("welcomeContent").style.display = "block";
            currentTab = -1;
            updateHeader();
            clearTabs();
            break;
    }
}

function nextTab() {
    if (currentTab >= tabList.length - 1) {
        //...the form gets submitted:
        document.getElementById("dataForm").submit();
        return false;
    } else {
        hideCurrentTab();
        currentTab += 1;
        showCurrentTab();
    }

    if (currentTab > 0) {
        document.getElementById("previousBtn").style.display = "inline";
    } else {
        document.getElementById("previousBtn").style.display = "none";
    }

    if (currentTab >= tabList.length - 1) {
        document.getElementById("nextBtn").innerHTML = "Concluir";
    }

    updateHeader();
}

function previousTab() {
    if (currentTab == tabList.length - 1) {
        document.getElementById("nextBtn").innerHTML = "Próximo";
    }

    hideCurrentTab();
    currentTab -= 1;
    showCurrentTab();

    if (currentTab == 0) {
        document.getElementById("previousBtn").style.display = "none";
    }

    updateHeader();
}

function showCurrentTab() {
    tabList[currentTab].style.display = "block";
}

function hideCurrentTab() {
    tabList[currentTab].style.display = "none";
}

function updateHeader() {
    switch (currentTab) {
        case -1:
            document.getElementById("taskHeaderTitle").style.display = "none";
            document.getElementById("welcomeHeaderTitle").style.display =
                "block";
            break;
        case 0:
            document.getElementById("welcomeHeaderTitle").style.display =
                "none";
            document.getElementById("taskHeaderTitle").style.display = "block";
            document.getElementById("taskHeaderTitle").innerHTML =
                "Informações Pessoais";
            break;
        case 1:
            document.getElementById("taskHeaderTitle").innerHTML =
                "Habilidades";
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
            break;
    }
}

function clearTabs() {
    // TODO provavelmente com PHP
    console.log("limpando");
}