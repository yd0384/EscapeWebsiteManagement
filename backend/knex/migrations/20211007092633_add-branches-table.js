
exports.up = function(knex) {
    return knex.schema
        .createTable('branches', function(table){
            table.increments('branch_id').primary();
            table.string('branch_name').notNullable();
            table.boolean('branch_active').notNullable();
        })
};

exports.down = function(knex) {
    return knex.schema
        .dropTable('branches')
};
