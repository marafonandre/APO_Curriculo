<?php
class PersonalInformation
{
    private $name;
    private $age;
    private $email;
    private $phone;
    private $city;
    private $state;
    private $summary;

    public function __construct(
        $name = null,
        $age = null,
        $email = null,
        $phone = null,
        $city = null,
        $state = null,
        $summary = null
    ) {
        $this->name = $name;
        $this->age = $age;
        $this->email = $email;
        $this->phone = $phone;
        $this->city = $city;
        $this->state = $state;
        $this->summary = $summary;
    }

    public function setName($name)
    {
        $this->name = $name;
    }
    public function getName()
    {
        return $this->name;
    }

    public function setAge($age)
    {
        $this->age = $age;
    }
    public function getAge()
    {
        return $this->age;
    }

    public function setEmail($email)
    {
        $this->email = $email;
    }
    public function getEmail()
    {
        return $this->email;
    }

    public function setPhone($phone)
    {
        $this->phone = $phone;
    }
    public function getPhone()
    {
        return $this->phone;
    }

    public function setCity($city)
    {
        $this->city = $city;
    }
    public function getCity()
    {
        return $this->city;
    }

    public function setState($state)
    {
        $this->state = $state;
    }
    public function getState()
    {
        return $this->state;
    }

    public function setSummary($summary)
    {
        $this->summary = $summary;
    }
    public function getSummary()
    {
        return $this->summary;
    }
}
