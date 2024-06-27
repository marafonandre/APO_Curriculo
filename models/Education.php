<?php
class Education
{
    private $course;
    private $educationalInstitution;
    private $startYear;
    private $endYear;
    private $situation;

    public function setCourse($course)
    {
        $this->course = $course;
    }
    public function getCourse()
    {
        return $this->course;
    }

    public function setEducationalInstitution($educationalInstitution)
    {
        $this->educationalInstitution = $educationalInstitution;
    }
    public function getEducationalInstitution()
    {
        return $this->educationalInstitution;
    }

    public function setStartYear($startYear)
    {
        $this->startYear = $startYear;
    }
    public function getStartYear()
    {
        return $this->startYear;
    }

    public function setEndYear($endYear)
    {
        $this->endYear = $endYear;
    }
    public function getEndYear()
    {
        return $this->endYear;
    }
    
    public function setSituation($situation)
    {
        $this->$situation = $$situation;
    }
    public function getSituation()
    {
        return $this->$situation;
    }
}