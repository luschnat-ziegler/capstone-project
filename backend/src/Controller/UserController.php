<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

use App\Repository\UserRepository;
use App\Entity\User;

class UserController extends AbstractController
{
    /**
     * @Route("/user", methods={"GET"})
     */
    public function index(
        SerializerInterface $serializer,
        UserRepository $repository
    ): JsonResponse 
    {
        $users = $repository->findAll();

        return new JsonResponse(
            $serializer->serialize($users, 'json'),
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
        
        $isEmailInUse = $repository->findBy(['email' => $user->getEmail()]);
        if(sizeof($isEmailInUse) >= 0) {
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
