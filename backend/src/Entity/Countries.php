<?php

namespace App\Entity;

use App\Repository\CountriesRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=CountriesRepository::class)
 */
class Countries
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $country;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $region;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $freedom;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $gender;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $lgbtq;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $environment;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $corruption;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $inequality;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $total;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCountry(): ?string
    {
        return $this->country;
    }

    public function setCountry(string $country): self
    {
        $this->country = $country;

        return $this;
    }

    public function getRegion(): ?string
    {
        return $this->region;
    }

    public function setRegion(?string $region): self
    {
        $this->region = $region;

        return $this;
    }

    public function getFreedom(): ?int
    {
        return $this->freedom;
    }

    public function setFreedom(?int $freedom): self
    {
        $this->freedom = $freedom;

        return $this;
    }

    public function getGender(): ?int
    {
        return $this->gender;
    }

    public function setGender(?int $gender): self
    {
        $this->gender = $gender;

        return $this;
    }

    public function getLgbtq(): ?int
    {
        return $this->lgbtq;
    }

    public function setLgbtq(?int $lgbtq): self
    {
        $this->lgbtq = $lgbtq;

        return $this;
    }

    public function getEnvironment(): ?int
    {
        return $this->environment;
    }

    public function setEnvironment(?int $environment): self
    {
        $this->environment = $environment;

        return $this;
    }

    public function getCorruption(): ?int
    {
        return $this->corruption;
    }

    public function setCorruption(?int $corruption): self
    {
        $this->corruption = $corruption;

        return $this;
    }

    public function getInequality(): ?int
    {
        return $this->inequality;
    }

    public function setInequality(?int $inequality): self
    {
        $this->inequality = $inequality;

        return $this;
    }

    public function getTotal(): ?int
    {
        return $this->total;
    }

    public function setTotal(?int $total): self
    {
        $this->total = $total;

        return $this;
    }
}
