<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

use App\Repository\CountriesRepository;
use App\Entity\Countries;

class CountriesController extends AbstractController
{
    /**
     * @Route("/countries", methods={"GET"})
     */
    
    public function index(CountriesRepository $repository, SerializerInterface $serializer): JsonResponse
    {   
        if (array_key_exists('id', $_GET)) {
            $country = $repository->find($_GET['id']);
            if (!is_null($country)) {
                return new JsonResponse(
                    $serializer->serialize($country, 'json'),
                    JsonResponse::HTTP_OK,
                    [],
                    true
                );    
            } else {
                return new JsonResponse(
                    ["error" => "ID does not exits"],
                    JsonResponse::HTTP_BAD_REQUEST
                );
            }
        } else {
            $countries = $repository->findAll();
            return new JsonResponse(
                $serializer->serialize($countries, 'json'),
                JsonResponse::HTTP_OK,
                [],
                true
            );
        }
    }
}