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
        $authData = $authentication->validateUser($request);
        
        if ($authData['success'] === false) {
            return $this->json(["loggedIn" => false], JsonResponse::HTTP_OK);
        }
        
        return new JsonResponse(
            $serializer->serialize($authData["user"], 'json'),
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
        $authData = $authentication->validateUser($request);
        
        if ($authData['success'] === false) {
            return $this->json(["loggedIn" => false], JsonResponse::HTTP_UNAUTHORIZED);
        }
        
        $user = $authData["user"];
        $post = json_decode($request->getContent(), true);

        //ToDo: Implement as method in user entity
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
}
