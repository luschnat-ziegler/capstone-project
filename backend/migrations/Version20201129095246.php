<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20201129095246 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user CHANGE weight_environment weight_environment INT DEFAULT NULL, CHANGE weight_gender weight_gender INT DEFAULT NULL, CHANGE weight_lgbtq weight_lgbtq INT DEFAULT NULL, CHANGE weight_equality weight_equality INT DEFAULT NULL, CHANGE weight_corruption weight_corruption INT DEFAULT NULL, CHANGE weight_freedom weight_freedom INT DEFAULT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user CHANGE weight_environment weight_environment INT NOT NULL, CHANGE weight_gender weight_gender INT NOT NULL, CHANGE weight_lgbtq weight_lgbtq INT NOT NULL, CHANGE weight_equality weight_equality INT NOT NULL, CHANGE weight_corruption weight_corruption INT NOT NULL, CHANGE weight_freedom weight_freedom INT NOT NULL');
    }
}
