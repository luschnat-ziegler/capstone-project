<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

use App\Repository\UserRepository;
use App\Entity\User;
use App\Repository\TokenRepository;
use App\Entity\Token;
use App\Serializer\UserSerializer;
use App\Service\AuthenticationService;

class UserController extends AbstractController
{
    /**
     * @Route("/user", methods={"GET"})
     */

    public function index(
        UserSerializer $serializer,
        UserRepository $repository,
        TokenRepository $tokenRepository,
        Request $request,
        AuthenticationService $authentication
    ): JsonResponse 
    {
        if (!$authentication->isValid($request)) {
            return $this->json(["success" => false], JsonResponse::HTTP_UNAUTHORIZED);
        }   

        $authHeader = $request->headers->get('Authorization');
        $tokenValue = substr($authHeader, strpos($authHeader, ' ')+1);

        $token = $tokenRepository->findOneBy([
            'value' => $tokenValue
        ]);

        $user = $token->getUser();
        
        return new JsonResponse(
            $serializer->serialize($user, 'json'),
            JsonResponse::HTTP_OK,
            [],
            true
        );

    }

    /**
     * @Route("/user_update", methods={"POST"})
     */

    public function update(
        UserSerializer $serializer,
        Request $request,
        AuthenticationService $authentication,
        TokenRepository $tokenRepository,
        UserRepository $repository
    ): JsonResponse
    {
        if (!$authentication->isValid($request)) {
            return $this->json(["success" => false], JsonResponse::HTTP_UNAUTHORIZED);
        } 

        $authHeader = $request->headers->get('Authorization');
        $tokenValue = substr($authHeader, strpos($authHeader, ' ')+1);

        $token = $tokenRepository->findOneBy([
            'value' => $tokenValue
        ]);
        
        $post = json_decode($request->getContent(), true);

        $user = $token->getUser();
        $user->setWeightEnvironment($post['weightEnvironment']);
        $user->setWeightGender($post['weightGender']);
        $user->setWeightLgbtq($post['weightLgbtq']);
        $user->setWeightFreedom($post['weightFreedom']);
        $user->setWeightEquality($post['weightEquality']);
        $user->setWeightCorruption($post['weightCorruption']);

        $repository->save($user);

        return new JsonResponse(
            $serializer->serialize($user, 'json'),
            JsonResponse::HTTP_OK,
            [],
            true
        );
    }

    /**
     * @Route("/user", methods={"POST"})
     */

    public function register(
        Request $request,
        SerializerInterface $serializer,
        UserRepository $repository
    ): JsonResponse
    {
        $user = $serializer->deserialize($request->getContent(), User::class, 'json');
        
        $emailInUse = $repository->findBy(['email' => $user->getEmail()]);
        if(sizeof($emailInUse) > 0) {
            return $this->json(["userRegistration"=>false], JsonResponse::HTTP_UNPROCESSABLE_ENTITY);
        }

        $repository->save($user);

        return new JsonResponse(
            $serializer->serialize($user, 'json'),
            JsonResponse::HTTP_OK,
            [],
            true
        );
    }
}
