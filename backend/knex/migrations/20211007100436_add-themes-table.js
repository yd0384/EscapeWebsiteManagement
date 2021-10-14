
exports.up = function(knex) {
    return knex.schema
        .createTable('themes', function(table){
            table.increments('theme_id').primary();
            table
                .integer('branch_id')
                .unsigned()
                .references('branch_id')
                .inTable('branches')
            table.string('theme_name').notNullable();
            table.string('theme_detail').notNullable();
            table.string('theme_genre').notNullable();
            table.integer('theme_device_importance').notNullable();
            table.integer('theme_difficulty').notNullable();
            table.boolean('theme_active').notNullable();
        });
};

exports.down = function(knex) {
    return knex.schema
        .dropTable('themes')
};
