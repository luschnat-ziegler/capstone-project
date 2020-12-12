<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Security\Core\User\UserInterface;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=UserRepository::class)
 */
class User implements UserInterface
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
    private $email;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $password;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $firstName;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $lastName;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $weightEnvironment;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $weightGender;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $WeightLgbtq;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $weightEquality;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $weightCorruption;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $weightFreedom;

    /**
     * @ORM\OneToMany(targetEntity=Token::class, mappedBy="user")
     */
    private $tokens;

    /**
     * @ORM\OneToMany(targetEntity=Comment::class, mappedBy="user")
     */
    private $comments;

    public function __construct()
    {
        $this->tokens = new ArrayCollection();
        $this->comments = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): self
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): self
    {
        $this->lastName = $lastName;

        return $this;
    }

    public function getWeightEnvironment(): ?int
    {
        return $this->weightEnvironment;
    }

    public function setWeightEnvironment(int $weightEnvironment): self
    {
        $this->weightEnvironment = $weightEnvironment;

        return $this;
    }

    public function getWeightGender(): ?int
    {
        return $this->weightGender;
    }

    public function setWeightGender(int $weightGender): self
    {
        $this->weightGender = $weightGender;

        return $this;
    }

    public function getWeightLgbtq(): ?int
    {
        return $this->WeightLgbtq;
    }

    public function setWeightLgbtq(int $WeightLgbtq): self
    {
        $this->WeightLgbtq = $WeightLgbtq;

        return $this;
    }

    public function getWeightEquality(): ?int
    {
        return $this->weightEquality;
    }

    public function setWeightEquality(int $weightEquality): self
    {
        $this->weightEquality = $weightEquality;

        return $this;
    }

    public function getWeightCorruption(): ?int
    {
        return $this->weightCorruption;
    }

    public function setWeightCorruption(int $weightCorruption): self
    {
        $this->weightCorruption = $weightCorruption;

        return $this;
    }

    public function getWeightFreedom(): ?int
    {
        return $this->weightFreedom;
    }

    public function setWeightFreedom(int $weightFreedom): self
    {
        $this->weightFreedom = $weightFreedom;

        return $this;
    }

    /**
     * @return Collection|Token[]
     */
    public function getTokens(): Collection
    {
        return $this->tokens;
    }

    public function addToken(Token $token): self
    {
        if (!$this->tokens->contains($token)) {
            $this->tokens[] = $token;
            $token->setUser($this);
        }

        return $this;
    }

    public function removeToken(Token $token): self
    {
        if ($this->tokens->removeElement($token)) {
            // set the owning side to null (unless already changed)
            if ($token->getUser() === $this) {
                $token->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Comment[]
     */
    public function getComments(): Collection
    {
        return $this->comments;
    }

    public function addComment(Comment $comment): self
    {
        if (!$this->comments->contains($comment)) {
            $this->comments[] = $comment;
            $comment->setUser($this);
        }

        return $this;
    }

    public function removeComment(Comment $comment): self
    {
        if ($this->comments->removeElement($comment)) {
            // set the owning side to null (unless already changed)
            if ($comment->getUser() === $this) {
                $comment->setUser(null);
            }
        }

        return $this;
    }

    public function updateWeights(array $postArray): self {
        
        $this->setWeightEnvironment($postArray['weightEnvironment']);
        $this->setWeightGender($postArray['weightGender']);
        $this->setWeightLgbtq($postArray['weightLgbtq']);
        $this->setWeightFreedom($postArray['weightFreedom']);
        $this->setWeightEquality($postArray['weightEquality']);
        $this->setWeightCorruption($postArray['weightCorruption']);
    
    return $this;
    }

     /**
     * Returns the roles granted to the user.
     *
     * <code>
     * public function getRoles()
     * {
     * return array('ROLE_USER');
     * }
     * </code>
     *
     * Alternatively, the roles might be stored on a ``roles`` property,
     * and populated in any number of different ways when the user object
     * is created.
     *
     * @return (string)[] The user roles
     */
    public function getRoles()
    {
    return array('ROLE_USER');
    }

    /**
     * Returns the salt that was originally used to encode the password.
     *
     * This can return null if the password was not encoded using a salt.
     *
     * @return string|null The salt
     */
    public function getSalt()
    {
    return null;
    }

    /**
     * Removes sensitive data from the user.
     *
     * This is important if, at any given point, sensitive information like
     * the plain-text password is stored on this object.
     */
    public function eraseCredentials()
    {
        
    }  

    public function getUsername(): void {}

}
