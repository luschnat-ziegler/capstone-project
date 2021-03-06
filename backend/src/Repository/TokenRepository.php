<?php

namespace App\Repository;

use App\Entity\Token;
use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Token|null find($id, $lockMode = null, $lockVersion = null)
 * @method Token|null findOneBy(array $criteria, array $orderBy = null)
 * @method Token[]    findAll()
 * @method Token[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TokenRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Token::class);
    }

    public function create(User $user): Token
    {
        $validUntil = new \Datetime('+ 1 day');

        $token = new Token();
        $token->setValue(uniqid('', true));
        $token->setValidUntil($validUntil);
        $token->setUser($user);

        $this->_em->persist($token);
        $this->_em->flush();

        return $token;
    }

    public function delete(Token $token): void 
    {
        $this->_em->remove($token);
        $this->_em->flush();
    }

    // /**
    //  * @return Token[] Returns an array of Token objects
    //  */
}
