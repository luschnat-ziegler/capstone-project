<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use App\Service\AuthenticationService;
use App\Repository\CountriesRepository;
use App\Repository\CommentRepository;

class CommentController extends AbstractController
{
    /**
     * @Route("/comment", methods="GET")
     */
    public function index(
        SerializerInterface $serializer, 
        Commentrepository $repository
        ): JsonResponse
    {   
        $comments = $repository->findBy([
            'country' => $_GET['countryId']
        ]); 
        
        return new JsonResponse(
            $serializer->serialize($comments, 'json', [
                ObjectNormalizer::IGNORED_ATTRIBUTES => ['country', 'user']
            ]),
            JsonResponse::HTTP_OK,
            [],
            true
        );
    }

    /**
     * @Route("/comment", methods="POST")
     */

    public function create(
        SerializerInterface $serializer, 
        CommentRepository $repository, 
        CountriesRepository $countriesRepository, 
        Request $request, 
        AuthenticationService $authentication
        ): JsonResponse 
    {
        $authData = $authentication->validateUser($request);
        if ($authData['success'] === false) {
            return $this->json(["success" => false], JsonResponse::HTTP_UNAUTHORIZED);
        }

        $post = json_decode($request->getContent(), true);
        $country = $countriesRepository->findOneBy([
            'id' => $post['countryId']
        ]);
        $user = $authData["user"];
        $comment = $repository->create($user, $country, $post);

        return new JsonResponse(
            $serializer->serialize($comment, 'json', [
                ObjectNormalizer::IGNORED_ATTRIBUTES => ['country', 'user']
            ]),
            JsonResponse::HTTP_OK,
            [],
            true
        );
    }
}
