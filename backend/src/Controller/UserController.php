<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use App\Repository\UserRepository;
use App\Entity\User;
use App\Repository\TokenRepository;
use App\Service\AuthenticationService;
use App\Service\PasswordEncoder;

class UserController extends AbstractController
{
    /**
     * @Route("/user", methods={"GET"})
     */

    public function index(
        SerializerInterface $serializer,
        UserRepository $repository,
        TokenRepository $tokenRepository,
        Request $request,
        AuthenticationService $authentication
    ): JsonResponse 
    {
        $authData = $authentication->validateUser($request);
        
        if ($authData['success'] === false) {
            return $this->json([
                "success" => false,
                "error" => "NOT_LOGGED_IN"
            ], JsonResponse::HTTP_UNAUTHORIZED);
        }
        
        $ignoredAttributes = ['password', 'comments', 'tokens', 'roles', 'salt', 'username'];

        return new JsonResponse(
            $serializer->serialize($authData["user"], 'json',
                [
                    ObjectNormalizer::IGNORED_ATTRIBUTES => $ignoredAttributes
                ]),
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
        UserRepository $repository,
        PasswordEncoder $passwordEncoder,
        ValidatorInterface $validator
    ): JsonResponse
    {
        /** @var User $newUser */
        $newUser = $serializer->deserialize($request->getContent(), User::class, 'json');
        
        $emailInUse = $repository->findBy(['email' => $newUser->getEmail()]);
        if(sizeof($emailInUse) > 0) {
            return $this->json([
                "success" => false,
                "error" => 'EMAIL_IN_USE'
            ], JsonResponse::HTTP_UNPROCESSABLE_ENTITY);
        }

        $violations = $validator->validate($newUser);
        if(count($violations) > 0) {
            return $this->json([
                "success" => false,
                "error" => 'INVALID_DATA'
            ], JsonResponse::HTTP_BAD_REQUEST);
        }

        $passwordEncoder->encode($newUser->getPassword(), $newUser);
        $repository->save($newUser);

        return $this->json(["success"=>true], JsonResponse::HTTP_OK);
    }

    /**
     * @Route("/user_update", methods={"POST"})
     */

    public function update(
        Request $request,
        AuthenticationService $authentication,
        TokenRepository $tokenRepository,
        UserRepository $repository,
        ValidatorInterface $validator
    ): JsonResponse
    {
        $authData = $authentication->validateUser($request);
        
        if ($authData['success'] === false) {
            return $this->json([
                "success" => false,
                "error" => "NOT_LOGGED_IN"
            ], JsonResponse::HTTP_UNAUTHORIZED);
        }
        
        $user = $authData["user"];
        $post = json_decode($request->getContent(), true);
        $user->updateWeights($post);

        $violations = $validator->validate($user);
        if(count($violations) > 0) {
            return $this->json([
                "success" => false,
                "error" => "INVALID_DATA"
            ], JsonResponse::HTTP_BAD_REQUEST);
        }

        $repository->save($user);

        return $this->json(["success" => true], JsonResponse::HTTP_OK);
    }
}
