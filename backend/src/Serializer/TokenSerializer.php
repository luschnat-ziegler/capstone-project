<?php

namespace App\Serializer;

use App\Entity\Token;

class TokenSerializer {

    public function serialize($token) {
        $elementArray = [
            'value' => $token->getValue(),
            'validUntil' => $token->getValidUntil(),
            'user' => $token->getUser()->getId()
        ];
        return json_encode($elementArray);
    }

}