<?php

namespace App\Service;

use Symfony\Component\HttpFoundation\Request;
use App\Repository\TokenRepository;
use App\Repository\UserRepository;
use App\Entity\User;

class AuthenticationService {
    private $repository;
    private $userRepository;

    public function __construct(
        TokenRepository $repository,
        UserRepository $userRepository
    ) {
        $this->repository = $repository;
        $this->userRepository = $userRepository;
    }

    public function validateUser(Request $request): array {
        $authHeader = $request->headers->get('Authorization');
        if(is_null($authHeader)) {
            return ["success" => false];
        }

        $tokenValue = substr($authHeader, strpos($authHeader, ' ')+1);
        $token = $this->repository->findOneBy([
            'value' => $tokenValue
        ]);

        $now = new \Datetime();
        if (!is_null($token) && $now < $token->getValidUntil()) {
            $user = $token->getUser();
            return [
                "success" => true,
                "user" => $user
            ];
        } else {
            return ["success" => false];
        }
    }
}