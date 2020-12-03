<?php 

namespace App\Serializer;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use App\Entity\User;

class UserSerializer {

    private function setArray($element): object {
       
        $this->elementAsArray = [
            'id' => $element->getId(),
            'firstName' => $element->getFirstName(),
            'lastName' => $element->getLastName(),
            'email' => $element->getEmail(),
            'password' => $element->getPassword(),
            'weightEnvironment' => $element->getWeightEnvironment(),
            'weightGender' => $element->getWeightGender(),
            'weightLgbtq' => $element->getWeightLgbtq(),
            'weightEquality' => $element->getWeightEquality(),
            'weightCorruption' => $element->getWeightCorruption(),
            'weightFreedom' => $element->getWeightFreedom()
        ];       
        return($this);
    }

    public function serialize($elements){
        $this->setArray($elements);
        return \json_encode($this->elementAsArray);  
    }
}