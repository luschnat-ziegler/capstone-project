<?php

namespace App\Repository;

use App\Entity\Comment;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Comment|null find($id, $lockMode = null, $lockVersion = null)
 * @method Comment|null findOneBy(array $criteria, array $orderBy = null)
 * @method Comment[]    findAll()
 * @method Comment[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CommentRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Comment::class);
    }

    public function create(Object $user, Object $country, Array $data): Comment
    {

        $comment = new Comment();
        
        $comment->setTitle($data['title']);
        $comment->setText($data['text']);
        $comment->setUser($user);
        $comment->setCountry($country);

        $this->_em->persist($comment);
        $this->_em->flush();

        return $comment;
    }

    // /**
    //  * @return Comment[] Returns an array of Comment objects
    //  */
}
