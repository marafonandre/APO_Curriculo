<?php
class Skills
{
    private $hardSkills;
    private $softSkills;

    public function __construct($softSkills = null, $hardSkills = null)
    {
        $this->softSkills = $softSkills;
        $this->hardSkills = $hardSkills;
    }

    public function setSoftSkills($softSkills)
    {
        // Verifica se $softSkills é um array antes de atribuir
        if (is_array($softSkills)) {
            $this->softSkills = $softSkills;
        } else {
            throw new InvalidArgumentException("Soft skills deve ser um array.");
        }
    }

    public function getSoftSkills()
    {
        return $this->softSkills;
    }

    // Adiciona uma SoftSkill ao array
    public function addSoftSkill($skill)
    {
        $this->softSkills[] = $skill;
    }

    // Remove uma SoftSkill do array
    public function removeSoftSkill($index)
    {
        if (isset($this->softSkills[$index])) {
            unset($this->softSkills[$index]);
            // Reindexa o array após a remoção
            $this->softSkills = array_values($this->softSkills);
        }
    }

    public function setHardSkills($hardSkills)
    {
        // Verifica se $hardSkills é um array antes de atribuir
        if (is_array($hardSkills)) {
            $this->hardSkills = $hardSkills;
        } else {
            throw new InvalidArgumentException("Hard skills deve ser um array.");
        }
    }

    public function getHardSkills()
    {
        return $this->hardSkills;
    }

    // Adiciona uma HardSkill ao array
    public function addHardSkill($skill)
    {
        $this->hardSkills[] = $skill;
    }

    // Remove uma HardSkill do array
    public function removeHardSkill($index)
    {
        if (isset($this->hardSkills[$index])) {
            unset($this->hardSkills[$index]);
            // Reindexa o array após a remoção
            $this->hardSkills = array_values($this->hardSkills);
        }
    }
}
