<?php
class Curriculum
{
    private $personalInformation;
    private $skills;
    private $professionalExperiences;
    private $educations;

    public function __construct(
        $personalInformation = null,
        $skills = null,
        $professionalExperiences = null,
        $educations = null
    ) {
        $this->personalInformation = $personalInformation;
        $this->skills = $skills;
        $this->professionalExperiences = $professionalExperiences;
        $this->educations = $educations;
    }

    // PersonalInformation getters and setters
    public function getPersonalInformation()
    {
        return $this->personalInformation;
    }

    public function setPersonalInformation($personalInformation)
    {
        $this->personalInformation = $personalInformation;
    }

    // Skills getters, setters, adders and removers
    public function getSkills()
    {
        return $this->skills;
    }
    public function setSkills($skills)
    {
        $this->skills = $skills;
    }

    // ProfessionalExperiences getters, setters, adders and removers
    public function getProfessionalExperiences()
    {
        return $this->professionalExperiences;
    }

    public function setProfessionalExperiences($professionalExperiences)
    {
        $this->professionalExperiences = $professionalExperiences;
    }

    public function addProfessionalExperience($experience)
    {
        $this->professionalExperiences[] = $experience;
    }

    public function removeProfessionalExperience($index)
    {
        if (isset($this->professionalExperiences[$index])) {
            unset($this->professionalExperiences[$index]);
            // Reindex the array after removal
            $this->professionalExperiences = array_values($this->professionalExperiences);
        }
    }

    // Educations getters, setters, adders and removers
    public function getEducations()
    {
        return $this->educations;
    }

    public function setEducations($educations)
    {
        $this->educations = $educations;
    }

    public function addEducation($education)
    {
        $this->educations[] = $education;
    }

    public function removeEducation($index)
    {
        if (isset($this->educations[$index])) {
            unset($this->educations[$index]);
            // Reindex the array after removal
            $this->educations = array_values($this->educations);
        }
    }
}
