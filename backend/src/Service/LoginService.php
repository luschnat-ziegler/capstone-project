<?php

namespace App\Service;

use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use App\Repository\UserRepository;
use App\Repository\TokenRepository;

class LoginService {

    private $passwordEncoder;
    private $userRepository;
    private $tokenRepository;

    public function __construct(
        UserPasswordEncoderInterface $passwordEncoder, 
        UserRepository $userRepository, 
        TokenRepository $tokenRepository
        ) 
        {
        $this->passwordEncoder = $passwordEncoder;  
        $this->userRepository = $userRepository;
        $this->tokenRepository = $tokenRepository;
        }

    public function login(string $email, string $password): array {
        
        $user = $this->userRepository->findOneBy(['email' => $email]);
        if (!$user) 
        {
            return $userData = [ 'isValid' => false ];
        }

        $isValid = $this->passwordEncoder->isPasswordValid($user, $password);
        if (!$isValid)
        {
            return $userData = [ 'isValid' => false ];
        }
  
        $now = new \Datetime();
        foreach ($user->getTokens() as $existingToken) {
            if ($existingToken->getValidUntil() < $now) {
                $this->tokenRepository->delete($existingToken);
            }
        }

        $token = $this->tokenRepository->create($user);
        $userData = [ 'isValid' => $isValid, 'token' => $token ];

        return $userData;
    }
} 