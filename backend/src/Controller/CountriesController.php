<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

use App\Entity\Countries;

class CountriesController extends AbstractController
{
    /**
     * @Route("/countries", name="countries")
     */
    
    public function index()
    {   
        $test = new Countries;
        var_dump($test);
    }
}
