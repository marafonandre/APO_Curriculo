<?php
class ProfessionalExperience {
    private $companyName;
    private $jobTitle;
    private $startMonth;
    private $startYear;
    private $endMonth;
    private $endYear;
    private $stillWorking;
    private $responsibilities;
    
    public function getCompanyName() {
        return $this->companyName;
    }
    
    public function setCompanyName($companyName) {
        $this->companyName = $companyName;
    }
    
    public function getJobTitle() {
        return $this->jobTitle;
    }
    
    public function setJobTitle($jobTitle) {
        $this->jobTitle = $jobTitle;
    }
    
    public function setStartMonth($startMonth)
    {
        $this->startMonth = $startMonth;
    }
    public function getStartMonth()
    {
        return $this->startMonth;
    }

    public function setStartYear($startYear)
    {
        $this->startYear = $startYear;
    }
    public function getStartYear()
    {
        return $this->startYear;
    }

    public function setEndMonth($endMonth)
    {
        $this->endMonth = $endMonth;
    }
    public function getEndMonth()
    {
        return $this->endMonth;
    }

    public function setEndYear($endYear)
    {
        $this->endYear = $endYear;
    }
    public function getEndYear()
    {
        return $this->endYear;
    }
    
    public function setStillWorking($stillWorking) {
        $this->stillWorking = $stillWorking;
    }
    public function getStillWorking()
    {
        return $this->stillWorking;
    }
    
    public function setResponsibilities($responsibilities) {
        // Verifica se $responsibilities é um array antes de atribuir
        if (is_array($responsibilities)) {
            $this->responsibilities = $responsibilities;
        } else {
            throw new InvalidArgumentException('Responsibilities deve ser um array.');
        }
    }
    
    public function getResponsibilities() {
        return $this->responsibilities;
    }
    
    // Adiciona uma responsabilidade ao array
    public function addResponsibility($responsibility) {
        $this->responsibilities[] = $responsibility;
    }
    
    // Remove uma responsabilidade do array
    public function removeResponsibility($index) {
        if (isset($this->responsibilities[$index])) {
            unset($this->responsibilities[$index]);
            // Reindexa o array após a remoção
            $this->responsibilities = array_values($this->responsibilities);
        }
    }
}