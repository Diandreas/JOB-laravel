<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('countries', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 45)->nullable();
            $table->string('abbr', 45)->nullable();
            $table->primary('id');
        });

        Schema::create('addresses', function (Blueprint $table) {
            $table->increments('id');
            $table->string('town', 45)->nullable();
            $table->string('street', 45)->nullable();
            $table->integer('country_id')->unsigned();
            $table->primary('id');
            $table->foreign('country_id')->references('id')->on('countries')->onDelete('no action')->onUpdate('no action');
        });

        Schema::create('profession_categories', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 100)->nullable();
            $table->text('description')->nullable();
            $table->integer('parent_id')->unsigned()->nullable();
            $table->primary('id');
            $table->foreign('parent_id')->references('id')->on('profession_categories')->onDelete('no action')->onUpdate('no action');
        });

        Schema::create('professions', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 100)->nullable();
            $table->text('description')->nullable();
            $table->integer('category_id')->unsigned();
            $table->primary('id');
            $table->foreign('category_id')->references('id')->on('profession_categories')->onDelete('no action')->onUpdate('no action');
        });

        Schema::table('users', function (Blueprint $table) {
            $table->string('surname', 45)->nullable();
            $table->integer('address_id')->unsigned();
            $table->integer('profession_id')->unsigned();
            $table->foreign('address_id')->references('id')->on('addresses')->onDelete('no action')->onUpdate('no action');
            $table->foreign('profession_id')->references('id')->on('professions')->onDelete('no action')->onUpdate('no action');
        });
        Schema::create('model_rules', function (Blueprint $table) {
            $table->increments('id');
            $table->tinyInteger('sommary')->nullable();
            $table->tinyInteger('reference')->nullable();
            $table->tinyInteger('attachement')->nullable();
            $table->tinyInteger('output')->nullable();
            $table->tinyInteger('task')->nullable();
            $table->tinyInteger('section_afficher_ou_cacher')->nullable();
            $table->primary('id');
        });

        Schema::create('models', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 45)->nullable();
            $table->string('description', 45)->nullable();
            $table->string('view', 45)->nullable();
            $table->integer('price')->nullable();
            $table->integer('model_rule_id')->unsigned();
            $table->primary('id');
            $table->unique('view');
            $table->unique('name');
            $table->foreign('model_rule_id')->references('id')->on('model_rules')->onDelete('no action')->onUpdate('no action');
        });

        Schema::create('competences', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 45)->nullable();
            $table->string('description', 45)->nullable();
            $table->primary('id');
        });

        Schema::create('hobbies', function (Blueprint $table) {
            $table->integer('category_id')->unsigned();
            $table->string('name', 255)->nullable();
            $table->primary('category_id');
        });

        Schema::create('user_model', function (Blueprint $table) {
            $table->integer('user_id')->unsigned();
            $table->integer('model_id')->unsigned();
            $table->primary(['user_id', 'model_id']);
            $table->foreign('user_id')->references('id')->on('users')->onDelete('no action')->onUpdate('no action');
            $table->foreign('model_id')->references('id')->on('models')->onDelete('no action')->onUpdate('no action');
        });

        Schema::create('user_competence', function (Blueprint $table) {
            $table->integer('user_id')->unsigned();
            $table->integer('competence_id')->unsigned();
            $table->primary(['user_id', 'competence_id']);
            $table->foreign('user_id')->references('id')->on('users')->onDelete('no action')->onUpdate('no action');
            $table->foreign('competence_id')->references('id')->on('competences')->onDelete('no action')->onUpdate('no action');
        });

        Schema::create('user_hobby', function (Blueprint $table) {
            $table->integer('user_id')->unsigned();
            $table->integer('hobby_id')->unsigned();
            $table->primary(['user_id', 'hobby_id']);
            $table->foreign('user_id')->references('id')->on('users')->onDelete('no action')->onUpdate('no action');
            $table->foreign('hobby_id')->references('category_id')->on('hobbies')->onDelete('no action')->onUpdate('no action');
        });

        Schema::create('experience_categories', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 45)->nullable();
            $table->string('description', 45)->nullable();
            $table->integer('ranking')->nullable();
            $table->primary('id');
            $table->unique('name');
        });

        Schema::create('outputs', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 45)->nullable();
            $table->primary('id');
        });

        Schema::create('organisations', function (Blueprint $table) {
            $table->integer('id')->unsigned();
            $table->string('name', 100)->nullable();
            $table->text('description')->nullable();
            $table->integer('country_id')->unsigned();
            $table->primary(['id', 'country_id']);
            $table->foreign('country_id')->references('id')->on('countries')->onDelete('no action')->onUpdate('no action');
        });

        Schema::create('attachements', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 45)->nullable();
            $table->string('path', 250)->nullable();
            $table->string('format', 10)->nullable();
            $table->string('size', 100)->nullable();
            $table->timestamp('create_at')->nullable();
            $table->primary('id');
        });

        Schema::create('references', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 50)->nullable();
            $table->string('fonction', 50)->nullable();
            $table->string('email', 250)->nullable();
            $table->string('telephone', 20)->nullable();
            $table->primary('id');
        });

        Schema::create('experiences', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 45)->nullable();
            $table->string('description', 45)->nullable();
            $table->date('date_start')->nullable();
            $table->date('date_end')->nullable();
            $table->string('output', 45)->nullable();
            $table->integer('experience_categorie_id')->unsigned();
            $table->integer('output_id')->unsigned();
            $table->integer('organisation_id')->unsigned();
            $table->integer('attachement_id')->unsigned()->nullable();
            $table->timestamp('create_at')->nullable();
            $table->timestamp('update_at')->nullable();
            $table->integer('reference_id')->unsigned();
            $table->primary('id');
            $table->foreign('experience_categorie_id')->references('id')->on('experience_categories')->onDelete('no action')->onUpdate('no action');
            $table->foreign('output_id')->references('id')->on('outputs')->onDelete('no action')->onUpdate('no action');
            $table->foreign('organisation_id')->references('id')->on('organisations')->onDelete('no action')->onUpdate('no action');
            $table->foreign('attachement_id')->references('id')->on('attachements')->onDelete('no action')->onUpdate('no action');
            $table->foreign('reference_id')->references('id')->on('references')->onDelete('no action')->onUpdate('no action');
        });

        Schema::create('user_experience', function (Blueprint $table) {
            $table->integer('user_id')->unsigned();
            $table->integer('experience_id')->unsigned();
            $table->primary(['user_id', 'experience_id']);
            $table->foreign('user_id')->references('id')->on('users')->onDelete('no action')->onUpdate('no action');
            $table->foreign('experience_id')->references('id')->on('experiences')->onDelete('no action')->onUpdate('no action');
        });

        Schema::create('missions', function (Blueprint $table) {
            $table->integer('id')->unsigned();
            $table->string('name', 100)->nullable();
            $table->text('description')->nullable();
            $table->integer('profession_id')->unsigned();
            $table->primary(['id', 'profession_id']);
            $table->foreign('profession_id')->references('id')->on('professions')->onDelete('no action')->onUpdate('no action');
        });

        Schema::create('sommaries', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 100)->nullable();
            $table->text('description')->nullable();
            $table->primary('id');
        });

        Schema::create('user_sommary', function (Blueprint $table) {
            $table->integer('user_id')->unsigned();
            $table->integer('sommary_id')->unsigned();
            $table->primary(['user_id', 'sommary_id']);
            $table->foreign('user_id')->references('id')->on('users')->onDelete('no action')->onUpdate('no action');
            $table->foreign('sommary_id')->references('id')->on('sommaries')->onDelete('no action')->onUpdate('no action');
        });

        Schema::create('matrimoniale', function (Blueprint $table) {
            $table->increments('id');
            $table->string('number_child', 45)->nullable();
            $table->tinyInteger('maried')->nullable();
            $table->integer('user_id')->unsigned();
            $table->primary(['id', 'user_id']);
            $table->foreign('user_id')->references('id')->on('users')->onDelete('no action')->onUpdate('no action');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('matrimoniale');
        Schema::dropIfExists('user_sommary');
        Schema::dropIfExists('sommaries');
        Schema::dropIfExists('user_experience');
        Schema::dropIfExists('experiences');
        Schema::dropIfExists('attachements');
        Schema::dropIfExists('references');
        Schema::dropIfExists('organisations');
        Schema::dropIfExists('outputs');
        Schema::dropIfExists('experience_categories');
        Schema::dropIfExists('user_hobby');
        Schema::dropIfExists('hobbies');
        Schema::dropIfExists('user_competence');
        Schema::dropIfExists('competences');
        Schema::dropIfExists('user_model');
        Schema::dropIfExists('models');
        Schema::dropIfExists('model_rules');
        Schema::dropIfExists('users');
        Schema::dropIfExists('professions');
        Schema::dropIfExists('profession_categories');
        Schema::dropIfExists('addresses');
        Schema::dropIfExists('countries');
    }
}
