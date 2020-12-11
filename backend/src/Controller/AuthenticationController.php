<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use App\Repository\UserRepository;
use App\Repository\TokenRepository;
use App\Service\LoginService;

class AuthenticationController extends AbstractController
{
    /**
     * @Route("/login", methods={"POST"})
     */
    public function createToken(
        Request $request,
        UserRepository $userRepository,
        TokenRepository $tokenRepository,
        SerializerInterface $serializer,
        LoginService $loginService
    ): JsonResponse
    {
        $post = json_decode($request->getContent(), true);
        $loginData = $loginService->login($post['email'], $post['password']);
        
        if(!$loginData['isValid']) {
            return $this->json(["success"=>false], JsonResponse::HTTP_UNAUTHORIZED);
        }

        $token = $tokenRepository->create($loginData['user']);

        return new JsonResponse(
            $serializer->serialize($token, 'json', 
                [
                    ObjectNormalizer::IGNORED_ATTRIBUTES => ['user', 'validUntil', 'id']
                ]
            ),
            JsonResponse::HTTP_OK,
            [],
            true
        );
    }
}
