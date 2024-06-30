<?php
// Verifica se há dados recebidos via POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtém o conteúdo do corpo da requisição
    $json = file_get_contents("php://input");

    // Decodifica o JSON para um array associativo
    $data = json_decode($json, true);

    $result = ["result" => "Deu certo manooo!"];

    // Verifica se o JSON é válido
    if (json_last_error() !== JSON_ERROR_NONE) {
        http_response_code(400); // Bad Request
        echo json_encode(["error" => "Erro ao decodificar JSON"]);
        exit();
    }
    $html =
        '
        <nav class="navbar navbar-dark bg-dark">
            <div class="container-lg">
                <h3 class="btn navbar-brand home">iCurriculum</h3>
                <ul class="nav justify-content-center">
                    <li class="nav-item">
                        <a class="nav-link active new" aria-current="page" href="#"> Novo </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="load" href="#">Carregar</a>
                    </li>
                </ul>
            </div>
            <input type="file" id="fileInput" accept=".json" style="display: none;">
        </nav>

        <div class="container card" style="margin-top: 2rem; margin-bottom: 2rem">
            <div class="card-header text-center">
                <h5>Curriculum Vitae</h5>
            </div>
            <div class="card-body" id="curriculum" style="margin-top: 2rem; margin-bottom: 2rem">
                <h2 class="mb-0" id="name">' .
        $data["personalInformation"]["name"] .
        '</h2>
                <span class="text-muted">' .
        $data["personalInformation"]["age"] .
        " Anos, " .
        $data["personalInformation"]["city"] .
        "-" .
        $data["personalInformation"]["state"] .
        ", " .
        $data["personalInformation"]["phone"] .
        ", " .
        $data["personalInformation"]["email"] .
        '</span><div class="container" style="margin-left: 1rem">';

    if ($data["personalInformation"]["summary"] != "") {
        $html .=
            '<h4 class="mb-0 mt-3" id="summaryTitle">Resumo</h4>
        <div class="container">
            <h6 class="text-muted" id="summary">' .
            $data["personalInformation"]["summary"] .
            '</h6>
        </div>';
    }

    $haveSoftSkill = !empty($data["skills"]["softSkills"]);
    $haveHardSkill = !empty($data["skills"]["hardSkills"]);

    function innerHardSkills($data)
    {
        $html = '<div class="col">
                            <h4 class="mb-1 mt-2">Hard Skills</h4>
                                <ul>';
        foreach ($data["skills"]["hardSkills"] as $hardSkill) {
            $html .= "<li class='text-muted h6'>" . $hardSkill . "</li>";
        }

        $html .= "<ul/></div>";

        return $html;
    }
    function innerSoftSkills($data)
    {
        $html = '<div class="col">
                            <h4 class="mb-1 mt-2">Soft Skills</h4>
                                <ul>';
        foreach ($data["skills"]["softSkills"] as $softSkill) {
            $html .= "<li class='text-muted h6'>" . $softSkill . "</li>";
        }

        $html .= "<ul/></div>";

        return $html;
    }

    if ($haveSoftSkill && $haveHardSkill) {
        $html .= '<div class="row">';
        if (count($data["skills"]["softSkills"]) > count($data["skills"]["hardSkills"])) {
            $html .= innerSoftSkills($data);
            $html .= innerHardSkills($data);
        } else {
            $html .= innerHardSkills($data);
            $html .= innerSoftSkills($data);
        }
        $html .= "</div>";
    } elseif ($haveSoftSkill || $haveHardSkill) {
        $html .= '<div class="row">';
        if ($haveSoftSkill) {
            $html .= innerSoftSkills($data);
        } else {
            $html .= innerHardSkills($data);
        }
        $html .= "</div>";
    }

    if (!empty($data["professionalExperience"])) {
        $html .= '<h4 class="mb-1 mt-2">Experiência</h4>';
    }

    foreach ($data["professionalExperience"] as $experience) {
        $html .=
            '
                    <div class="container" id="experience">
                        <div class="container mt-1">
                            <h5 class="card-title">' .
            $experience["jobTitle"] .
            '</h5>
                            <h6 class="card-subtitle mb-1 text-muted">
                                ' .
            $experience["companyName"] .
            " " .
            $experience["startMonth"] .
            "/" .
            $experience["startYear"] .
            " - " .
            ($experience["stillWorking"] ? "Atualmente" : $experience["endMonth"] . "/" . $experience["endYear"]) .
            '
                            </h6>
                            <ul>';
        foreach ($experience["responsibilities"] as $responsibility) {
            $html .= "<li>" . $responsibility . "</li>";
        }
        $html .= "</ul></div></div>";
    }

    if (!empty($data["education"])) {
        $html .= '<h4 class="mb-0 mt-3">Formação</h4>';
    }

    foreach ($data["education"] as $edu) {
        $html .=
            '<div class="container" id="education">
                        <div class="container mt-1">
                            <h5 class="card-title">' .
            $edu["course"] .
            " - " .
            $edu["situation"] .
            '</h5><h6 class="card-subtitle mb-2 text-muted">' .
            $edu["educationalInstitution"] .
            " " .
            $edu["startYear"] .
            " - " .
            $edu["endYear"] .
            "</h6></div></div>";
    }

    $html .= '</div></div>
            <div class="card-footer">
                <button class="btn btn-primary float-start downloadJSON">Baixar JSON</button>
                <button class="btn btn-dark float-end print">Imprimir</button>
            </div>
    </div>
    ';

    echo $html;
    exit();
} else {
    // Se não for um request POST, retorna um erro (ou outra ação adequada)
    http_response_code(405); // Método não permitido
    echo json_encode(["error" => "Método não permitido"]);
}
