<?php 

namespace App\Serializer;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use App\Entity\Comment;

class CommentSerializer {

    private function setArray($element): object {
       
        $this->elementAsArray[] = [
            'id' => $element->getId(),
            'title' => $element->getTitle(),
            'text' => $element->getText(),
            'country' => $element->getCountry()->getId(),
            'user' => $element->getUser()->getId()
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