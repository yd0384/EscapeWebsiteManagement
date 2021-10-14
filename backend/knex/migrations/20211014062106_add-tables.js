
exports.up = function(knex) {
  return knex.schema
    .createTable('branch', (table) => {
        table.increments('id').primary();
        table.boolean('active').notNullable();
        table.string('name').notNullable();
        table.date('contract_date').notNullable();
        table.string('tel_number').notNullable();
        table.string('address').notNullable();
        table.string('image_path').notNullable();
        table.string('owner_name').notNullable();
        table.integer('reservable_date').unsigned().notNullable();
    })
    .createTable('theme', (table) => {
        table.increments('id').primary();
        table
            .integer('branch_id')
            .unsigned()
            .references('id')
            .inTable('branch')
            .notNullable();
        table.boolean('active').notNullable();
        table.string('title').notNullable();
        table.string('content').notNullable();
        table.integer('difficulty').unsigned().notNullable();
        table.integer('length').unsigned().notNullable();
        table.integer('device_importance').unsigned().notNullable();
        table.string('image_path').notNullable();
    })
    .createTable('time_table', (table) => {
        table.increments('id').primary();
        table
            .integer('theme_id')
            .unsigned()
            .references('id')
            .inTable('theme')
            .notNullable();
        table.string('start_time').notNullable();
        table.string('end_time').notNullable();
    })
    .createTable('cost', (table) => {
        table.increments('id').primary();
        table  
            .integer('theme_id')
            .unsigned()
            .references('id')
            .inTable('theme')
            .notNullable();
        table.integer('number_of_player').unsigned().notNullable();
        table.integer('price').unsigned().notNullable();
    })
    .createTable('genre', (table) => {
        table.increments('id').primary();
        table
            .integer('theme_id')
            .unsigned()
            .references('id')
            .inTable('theme')
            .notNullable();
        table.string('genre').notNullable();
    })
    .createTable('reservation', (table) => {
        table.increments('id').primary();
        table
            .integer('theme_id')
            .unsigned()
            .references('id')
            .inTable('theme')
            .notNullable();
        table.datetime('start_time').notNullable();
        table.datetime('end_time').notNullable();
        table.integer('status').unsigned().notNullable();
        table.timestamp('reserved_time').notNullable();
        table.integer('number_of_player').notNullable();
        table.string('phone_number').notNullable();
        table.string('booker_name').notNullable();
        table.integer('booker_ip').unsigned().notNullable();
        table.integer('noshow').unsigned().notNullable();
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('time_table')
    .dropTable('cost')
    .dropTable('genre')
    .dropTable('reservation')    
    .dropTable('theme')
    .dropTable('branch')  
};
