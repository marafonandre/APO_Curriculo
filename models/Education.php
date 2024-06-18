<?php
class Education
{
    private $course;
    private $educationalInstitution;
    private $degree;
    private $startMonth;
    private $startYear;
    private $endMonth;
    private $endYear;

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

    public function setDegree($degree)
    {
        $this->degree = $degree;
    }
    public function getDegree()
    {
        return $this->degree;
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
}
?>