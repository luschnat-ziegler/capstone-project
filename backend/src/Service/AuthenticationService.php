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

    public function isValid(Request $request): bool {
        $authHeader = $request->headers->get('Authorization');
        if(is_null($authHeader)) {
            return false;
        }

        $tokenValue = substr($authHeader, strpos($authHeader, ' ')+1);
        $token = $this->repository->findOneBy([
            'value' => $tokenValue
        ]);

        $now = new \Datetime();
        return !is_null($token) && $now < $token->getValidUntil();
    }
}