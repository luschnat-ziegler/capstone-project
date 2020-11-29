<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

use App\Repository\UserRepository;
use App\Repository\TokenRepository;
use App\Serializer\TokenSerializer;

class AuthenticationController extends AbstractController
{
    /**
     * @Route("/login", methods={"POST"})
     */
    public function createToken(
        Request $request,
        UserRepository $userRepository,
        TokenRepository $tokenRepository,
        TokenSerializer $serializer
    ): JsonResponse
    {
        $post = json_decode($request->getContent(), true);
        $user = $userRepository->login($post['email'], $post['password']);
        
        if(is_null($user)) {
            return $this->json(["success"=>false], JsonResponse::HTTP_UNAUTHORIZED);
        }

        $token = $tokenRepository->create($user);

        return new JsonResponse(
            $serializer->serialize($token),
            JsonResponse::HTTP_OK,
            [],
            true
        );
    }
}
