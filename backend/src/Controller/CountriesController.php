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
                $jsonCountryArray = [
                    'id' => $country->getId(),
                    'country' =>$country->getCountry(),
                    'region' => $country->getRegion(),
                    'freedom' => $country->getFreedom(),
                    'gender' => $country->getGender(),
                    'lgbtq' => $country->getLgbtq(),
                    'environment' => $country->getEnvironment(),
                    'corruption' => $country->getCorruption(),
                    'inequality' => $country->getInequality(),
                    'total' => $country->getTotal()
                ];
                return new JsonResponse(
                    json_encode($jsonCountryArray),
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

            // The following does not work for some reason, thus the detour via an array
            // ################
            // return new JsonResponse(
            //     $serializer->serialize($country, 'json'),
            //     JsonResponse::HTTP_OK,
            //     [],
            //     true
            // );
        } else {
            $countries = $repository->findAll();
            $jsonCountriesArray = [];
            foreach($countries as $country) {
                $countryArray = [
                    'id' => $country->getId(),
                    'country' =>$country->getCountry(),
                    'region' => $country->getRegion(),
                    'freedom' => $country->getFreedom(),
                    'gender' => $country->getGender(),
                    'lgbtq' => $country->getLgbtq(),
                    'environment' => $country->getEnvironment(),
                    'corruption' => $country->getCorruption(),
                    'inequality' => $country->getInequality(),
                    'total' => $country->getTotal()
                ];
                array_push($jsonCountriesArray, $countryArray); 
            }
            return new JsonResponse(
                json_encode($jsonCountriesArray),
                JsonResponse::HTTP_OK,
                [],
                true
            );
            // Same here: Does not work!
            // return new JsonResponse(
            //     $serializer->serialize($countries, 'json'),
            //     JsonResponse::HTTP_OK,
            //     [],
            //     true
            // );
        }
    }
}
