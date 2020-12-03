<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

use App\Repository\CountriesRepository;
use App\Entity\Countries;
use App\Serializer\CountriesSerializer;

class CountriesController extends AbstractController
{
    /**
     * @Route("/countries", methods={"GET"})
     */
    
    public function index(CountriesRepository $repository, CountriesSerializer $serializer): JsonResponse
    {   
        if (array_key_exists('id', $_GET)) {
            $country = $repository->find($_GET['id']);
            if (!is_null($country)) {
                return new JsonResponse(
                    $serializer->serialize($country),
                    JsonResponse::HTTP_OK,
                    [],
                    true
                );    
            } else {
                return new JsonResponse(
                    ["error" => "ID does not exist"],
                    JsonResponse::HTTP_BAD_REQUEST
                );
            }
        } else {
            $countries = $repository->findAll();
            return new JsonResponse(
                $serializer->serialize($countries),
                JsonResponse::HTTP_OK,
                [],
                true
            );
        }
    }
}
