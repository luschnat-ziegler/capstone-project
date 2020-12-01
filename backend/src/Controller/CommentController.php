<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;

use App\Service\AuthenticationService;
use App\Repository\CountriesRepository;
use App\Entity\Countries;
use App\Repository\CommentRepository;
use App\Entity\Comment;
use App\Serializer\CommentSerializer;

class CommentController extends AbstractController
{
    /**
     * @Route("/comment", methods="GET")
     */
    public function index(
        CommentSerializer $serializer, 
        Commentrepository $repository
        ): JsonResponse
    {   
        $comments = $repository->findBy([
            'country' => $_GET['countryId']
        ]); 
        
        return new JsonResponse(
            $serializer->serialize($comments),
            JsonResponse::HTTP_OK,
            [],
            true
        );
    }

    /**
     * @Route("/comment", methods="POST")
     */

    public function create(
        CommentSerializer $serializer, 
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
            $serializer->serialize($comment, 'json'),
            JsonResponse::HTTP_OK,
            [],
            true
        );
    }
}
