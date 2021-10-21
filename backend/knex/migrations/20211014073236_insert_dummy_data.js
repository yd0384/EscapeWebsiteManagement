
exports.up = async function(knex) {
    return await knex('branch').insert(
        [
            {active: true, name: '강남점', contract_date: '2021-10-14', tel_number: '02-123-4567', address: '서울특별시 노원구 공릉동 공릉로 232', image_path: '/images', owner_name: '서영덕', reservable_date: 30},
            {active: true, name: '건대 1호점', contract_date: '2021-10-14', tel_number: '02-123-4567', address: '서울특별시 노원구 공릉동 공릉로 232', image_path: '/images', owner_name: '서영덕', reservable_date: 10},
            {active: true, name: '건대 2호점', contract_date: '2021-10-14', tel_number: '02-123-4567', address: '서울특별시 노원구 공릉동 공릉로 232', image_path: '/images', owner_name: '서영덕', reservable_date: 25},
            {active: true, name: '홍대점', contract_date: '2021-10-14', tel_number: '02-123-4567', address: '서울특별시 노원구 공릉동 공릉로 232', image_path: '/images', owner_name: '서영덕', reservable_date: 40}
        ]
    ).then(async function(){
        await knex('theme').insert(
            [
                {active: true, branch_id:1, title: '보이스', content: '단 한 통의 전화! 걸려오는 순간 걸려들었다!\n 부산 건설현장 직원들을 상대로 걸려온 전화 한 통.\n보이스피싱 전화로 인해 딸의 병원비부터 아파트 중도금까지,\n당일 현장에서는 수많은 사람들이 목숨 같은 돈을 잃게 된다.', difficulty: 3, length: 60, device_importance: 50, image_path:'/images'},
                {active: true, branch_id:2, title: '007 노 타임 투 다이', content: '가장 강력한 운명의 적과 마주하게된 제임스 본드의 마지막 미션이 시작된다', difficulty: 5, length: 75, device_importance: 100, image_path:'/images'},
                {active: true, branch_id:2, title: '보이스', content: '단 한 통의 전화! 걸려오는 순간 걸려들었다!\n 부산 건설현장 직원들을 상대로 걸려온 전화 한 통.\n보이스피싱 전화로 인해 딸의 병원비부터 아파트 중도금까지,\n당일 현장에서는 수많은 사람들이 목숨 같은 돈을 잃게 된다.', difficulty: 3, length: 60, device_importance: 50, image_path:'/images'},
                {active: true, branch_id:3, title: '007 노 타임 투 다이', content: '가장 강력한 운명의 적과 마주하게된 제임스 본드의 마지막 미션이 시작된다', difficulty: 5, length: 75, device_importance: 100, image_path:'/images'},
                {active: true, branch_id:4, title: '플라이 투 더 스카이', content: '이태리에서 돌아온 성환이 교환과 재회한다.', difficulty: 1, length: 50, device_importance: 20, image_path:'/images'}
            ]
        ).then(async function(){
            await knex('genre').insert(
                [
                    {theme_id: 1, genre: '범죄'},
                    {theme_id: 1, genre: '액션'},
                    {theme_id: 2, genre: '범죄'},
                    {theme_id: 2, genre: '액션'},
                    {theme_id: 3, genre: '범죄'},
                    {theme_id: 3, genre: '액션'},
                    {theme_id: 4, genre: '범죄'},
                    {theme_id: 4, genre: '액션'},
                    {theme_id: 5, genre: '드라마'},
                    {theme_id: 5, genre: '코미디'}
                ]
            ).then(async function(){
                await knex('cost').insert(
                    [
                        {theme_id: 1, number_of_player: 2, price: 40000},
                        {theme_id: 1, number_of_player: 3, price: 58000},
                        {theme_id: 1, number_of_player: 4, price: 70000},
                        {theme_id: 2, number_of_player: 2, price: 50000},
                        {theme_id: 2, number_of_player: 3, price: 70000},
                        {theme_id: 2, number_of_player: 4, price: 88000},
                        {theme_id: 2, number_of_player: 5, price: 98000},
                        {theme_id: 3, number_of_player: 2, price: 40000},
                        {theme_id: 3, number_of_player: 3, price: 58000},
                        {theme_id: 3, number_of_player: 4, price: 70000},
                        {theme_id: 4, number_of_player: 2, price: 50000},
                        {theme_id: 4, number_of_player: 3, price: 70000},
                        {theme_id: 4, number_of_player: 4, price: 88000},
                        {theme_id: 4, number_of_player: 5, price: 98000},
                        {theme_id: 5, number_of_player: 2, price: 40000},
                        {theme_id: 5, number_of_player: 3, price: 58000},
                        {theme_id: 5, number_of_player: 4, price: 70000}
                    ]
                ).then(async function(){
                    await knex('time_table').insert(
                        [
                            {theme_id: 1, start_time: '09:00', end_time: '10:00'},
                            {theme_id: 1, start_time: '11:00', end_time: '12:00'},
                            {theme_id: 1, start_time: '13:00', end_time: '14:00'},
                            {theme_id: 1, start_time: '15:00', end_time: '16:00'},
                            {theme_id: 1, start_time: '17:00', end_time: '18:00'},
                            {theme_id: 1, start_time: '19:00', end_time: '20:00'},
                            {theme_id: 1, start_time: '21:00', end_time: '22:00'},
                            {theme_id: 2, start_time: '09:00', end_time: '10:15'},
                            {theme_id: 2, start_time: '11:00', end_time: '12:15'},
                            {theme_id: 2, start_time: '13:00', end_time: '14:15'},
                            {theme_id: 2, start_time: '15:00', end_time: '16:15'},
                            {theme_id: 2, start_time: '17:00', end_time: '18:15'},
                            {theme_id: 2, start_time: '19:00', end_time: '20:15'},
                            {theme_id: 2, start_time: '21:00', end_time: '22:15'},
                            {theme_id: 3, start_time: '09:00', end_time: '10:00'},
                            {theme_id: 3, start_time: '11:00', end_time: '12:00'},
                            {theme_id: 3, start_time: '13:00', end_time: '14:00'},
                            {theme_id: 3, start_time: '15:00', end_time: '16:00'},
                            {theme_id: 3, start_time: '17:00', end_time: '18:00'},
                            {theme_id: 3, start_time: '19:00', end_time: '20:00'},
                            {theme_id: 3, start_time: '21:00', end_time: '22:00'}
                        ]
                    ).then(()=>{});
                })
            })
        })
    })
};

exports.down = async function(knex) {

    return await knex.truncate().from('time_table')
    .then(async function(){
        await knex.truncate().from('cost')
        .then(async function(){
            await knex.truncate().from('genre')
            .then(async function(){
                await knex.raw('SET foreign_key_checks = 0');
                await knex.truncate().from('theme')
                .then(async function(){
                    await knex.truncate().from('branch')
                    .then(()=>{});
                })
                await knex.raw('SET foreign_key_checks = 1');
            })
        })
    })
    
};
