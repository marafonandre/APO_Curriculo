<?php
// Verifica se há dados recebidos via POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtém o conteúdo do corpo da requisição
    $json = file_get_contents("php://input");

    // Decodifica o JSON para um array associativo
    $data = json_decode($json, true);

    $result = array('result' => 'Deu certo manooo!');

    // Verifica se o JSON é válido
    if (json_last_error() !== JSON_ERROR_NONE) {
        http_response_code(400); // Bad Request
        echo json_encode(["error" => "Erro ao decodificar JSON"]);
        exit();
    }

    $curriculum = null;
    try {
        require_once "./models/Curriculum.php";

        $curriculum = new Curriculum();
    } catch (Exception $e) {
        $result['result'] = "Erro ao criar objeto Curriculum: " + $e->getMessage();
        echo json_encode($result);
        exit();
    }

    try {
        require_once "./models/PersonalInformation.php";

        $personalInformation = new PersonalInformation(
            $data["personalInformation"]["name"],
            $data["personalInformation"]["age"],
            $data["personalInformation"]["email"],
            $data["personalInformation"]["phone"],
            $data["personalInformation"]["city"],
            $data["personalInformation"]["state"],
            $data["personalInformation"]["summary"]
        );

        $curriculum->setPersonalInformation(
            $personalInformation
        );
    } catch (Exception $e) {
        $result['result'] = "Erro ao configurar informações pessoais: " + $e->getMessage();
        echo json_encode($result);
        exit();
    }

    if (isset($data["skills"]["softSkills"]) || !empty($data["skills"]["softSkills"])) {
        try {
            require_once "./models/Skills.php";

            $curriculum->setSkills(new Skills($data["skills"]["softSkills"], $data["skills"]["hardSkills"]));
        } catch (Exception $e) {
            $result['result'] = "Erro ao configurar habilidades: " + $e->getMessage();
            echo json_encode($result);
            exit();
        }
    }

    try {
        require_once "./models/ProfessionalExperience.php";

        foreach ($data["professionalExperience"] as $exp) {
            $professionalExperience = new ProfessionalExperience();

            $professionalExperience->setCompanyName($exp["companyName"]);
            $professionalExperience->setJobTitle($exp["jobTitle"]);
            $professionalExperience->setStartMonth($exp["startMonth"]);
            $professionalExperience->setStartYear($exp["startYear"]);

            if ($exp["stillWorking"] == false) {
                $professionalExperience->setEndMonth($exp["endMonth"]);
                $professionalExperience->setEndYear($exp["endYear"]);
            }

            $professionalExperience->setStillWorking($exp["stillWorking"]);
            $professionalExperience->setResponsibilities($exp["responsibilities"]);

            $curriculum->addProfessionalExperience($professionalExperience);
        }
    } catch (Exception $e) {
        $result['result'] = "Erro ao configurar experiências profissionais: " + $e->getMessage();
        echo json_encode($result);
        exit();
    }

    echo json_encode($result);
    exit();

    try {
        require_once "./models/Education.php";

        foreach ($data["education"] as $edu) {
            $teste = new Education($edu["course"], $edu["educationalInstitution"], $edu["startYear"], $edu["endYear"], $edu["situation"]);

            $curriculum->addEducation(new Education($edu["course"], $edu["educationalInstitution"], $edu["startYear"], $edu["endYear"], $edu["situation"]));
        };
    } catch (Exception $e) {
        $result['result'] = "Erro ao configurar educação: " + $e->getMessage();
        echo json_encode($result);
        exit();
    }

    // Processa os dados recebidos
    header("Content-Type: application/json");

    echo json_encode($result);
    exit();
} else {
    // Se não for um request POST, retorna um erro (ou outra ação adequada)
    http_response_code(405); // Método não permitido
    echo json_encode(["error" => "Método não permitido"]);
}
