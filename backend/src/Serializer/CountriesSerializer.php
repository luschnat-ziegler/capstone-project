<?php 

namespace App\Serializer;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use App\Entity\Countries;

class CountriesSerializer {

    private function setArray($element): object {
       
        $this->elementAsArray[] = [
            'id' => $element->getId(),
            'country' => $element->getCountry(),
            'region' => $element->getRegion(),
            'freedom' => $element->getFreedom(),
            'gender' => $element->getGender(),
            'lgbtq' => $element->getLgbtq(),
            'environmant' => $element->getEnvironment(),
            'corruption' => $element->getCorruption(),
            'inequality' => $element->getInequality(),
            'total' => $element->getTotal(),
        ];       
        return($this);
    }

    public function serialize($elements){
        if (is_array($elements)) {
            foreach($elements as $element) {
                $this->setArray($element);
            }
            return json_encode($this->elementAsArray);
        } else {
            $this->setArray($elements);
            return json_encode($this->elementAsArray[0]);
        }
    }
}