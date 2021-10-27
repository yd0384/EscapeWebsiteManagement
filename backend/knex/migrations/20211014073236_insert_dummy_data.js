
exports.up = async function(knex) {
    return await knex('branch').insert(
        [
            {active: true, name: '강남점', contract_date: '2021-10-14', tel_number: '02-123-4567', address: '서울특별시 강남구 강남대로 지하396', image_path: 'cafe1.jpg', owner_name: '홍길동', reservable_date: 30},
            {active: true, name: '건대 1호점', contract_date: '2021-10-14', tel_number: '02-891-0123', address: '서울특별시 광진구 아차산로 243', image_path: 'cafe2.jpg', owner_name: '서영덕', reservable_date: 10},
            {active: true, name: '건대 2호점', contract_date: '2021-10-14', tel_number: '02-456-7891', address: '서울특별시 광진구 능동로 지하110', image_path: 'cafe3.jpg', owner_name: '전진종', reservable_date: 25},
            {active: true, name: '홍대점', contract_date: '2021-10-14', tel_number: '02-012-3456', address: '서울특별시 마포구 양화로 지하160', image_path: 'cafe4.jpg', owner_name: '한지형', reservable_date: 40}
        ]
    ).then(async function(){
        await knex('theme').insert(
            [
                {active: true, branch_id:1, title: '보이스', content: '단 한 통의 전화! 걸려오는 순간 걸려들었다!\n 부산 건설현장 직원들을 상대로 걸려온 전화 한 통.\n보이스피싱 전화로 인해 딸의 병원비부터 아파트 중도금까지,\n당일 현장에서는 수많은 사람들이 목숨 같은 돈을 잃게 된다.', difficulty: 3, length: 60, device_importance: 50, image_path:'voice.jpg'},
                {active: true, branch_id:1, title: '루시드 드리머', content: '깊은 잠에서 깨어난 그 곳은 바로 나의 꿈 속이었다.', difficulty: 3.5, length: 60, device_importance: 10, image_path:'dream.jpg'},
                {active: true, branch_id:1, title: '콜드 케이지', content: '꿈 속에서 이어지는 발자취를 따라 최종적으로 도착한 이 곳은..?', difficulty: 2, length: 60, device_importance: 50, image_path:'cage.png'},
                {active: true, branch_id:2, title: '007:노 타임 투 다이', content: '가장 강력한 운명의 적과 마주하게된 제임스 본드의 마지막 미션이 시작된다!', difficulty: 5, length: 75, device_importance: 100, image_path:'suit.jpg'},
                {active: true, branch_id:2, title: '보이스', content: '단 한 통의 전화! 걸려오는 순간 걸려들었다!\n 부산 건설현장 직원들을 상대로 걸려온 전화 한 통.\n보이스피싱 전화로 인해 딸의 병원비부터 아파트 중도금까지,\n당일 현장에서는 수많은 사람들이 목숨 같은 돈을 잃게 된다.', difficulty: 3, length: 60, device_importance: 50, image_path:'voice.jpg'},
                {active: true, branch_id:3, title: '튀어 마르시', content: '사랑하난 나의 그대 마르시. 지금 이 곳에서 당장 도망쳐야해..! 튀어 마르시!!', difficulty: 4.5, length: 75, device_importance: 80, image_path:'dear.jpg'},
                {active: true, branch_id:3, title: '향수', content: '어디선가 나는 악취를 따라간 그 곳에는...', difficulty: 5, length: 70, device_importance: 0, image_path:'perfume.jpg'},
                {active: true, branch_id:4, title: '플라이 투 더 스카이', content: '이태리에서 돌아온 성환이 교환과 재회한다.', difficulty: 1, length: 60, device_importance: 20, image_path:'sky.jpg'}
            ]
        ).then(async function(){
            await knex('genre').insert(
                [
                    {theme_id: 1, genre: '범죄'},
                    {theme_id: 1, genre: '액션'},
                    {theme_id: 2, genre: '공포'},
                    {theme_id: 2, genre: '스릴러'},
                    {theme_id: 3, genre: '드라마'},
                    {theme_id: 3, genre: '스릴러'},
                    {theme_id: 4, genre: '범죄'},
                    {theme_id: 4, genre: '액션'},
                    {theme_id: 5, genre: '드라마'},
                    {theme_id: 5, genre: '코미디'},
                    {theme_id: 6, genre: '판타지'},
                    {theme_id: 6, genre: '코믹'},
                    {theme_id: 7, genre: '공포'},
                    {theme_id: 8, genre: '코미디'},
                    {theme_id: 8, genre: '드라마'},
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
                        {theme_id: 5, number_of_player: 4, price: 70000},
                        {theme_id: 6, number_of_player: 2, price: 40000},
                        {theme_id: 6, number_of_player: 3, price: 58000},
                        {theme_id: 6, number_of_player: 4, price: 70000},
                        {theme_id: 7, number_of_player: 2, price: 50000},
                        {theme_id: 7, number_of_player: 3, price: 70000},
                        {theme_id: 7, number_of_player: 4, price: 88000},
                        {theme_id: 8, number_of_player: 2, price: 40000},
                        {theme_id: 8, number_of_player: 3, price: 58000},
                        {theme_id: 8, number_of_player: 4, price: 70000}
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
                            {theme_id: 2, start_time: '09:00', end_time: '10:00'},
                            {theme_id: 2, start_time: '11:00', end_time: '12:00'},
                            {theme_id: 2, start_time: '13:00', end_time: '14:00'},
                            {theme_id: 2, start_time: '15:00', end_time: '16:00'},
                            {theme_id: 2, start_time: '17:00', end_time: '18:00'},
                            {theme_id: 2, start_time: '19:00', end_time: '20:00'},
                            {theme_id: 2, start_time: '21:00', end_time: '22:00'},
                            {theme_id: 3, start_time: '09:00', end_time: '10:00'},
                            {theme_id: 3, start_time: '11:00', end_time: '12:00'},
                            {theme_id: 3, start_time: '13:00', end_time: '14:00'},
                            {theme_id: 3, start_time: '15:00', end_time: '16:00'},
                            {theme_id: 3, start_time: '17:00', end_time: '18:00'},
                            {theme_id: 3, start_time: '19:00', end_time: '20:00'},
                            {theme_id: 3, start_time: '21:00', end_time: '22:00'},
                            {theme_id: 4, start_time: '09:00', end_time: '10:15'},
                            {theme_id: 4, start_time: '11:00', end_time: '12:15'},
                            {theme_id: 4, start_time: '13:00', end_time: '14:15'},
                            {theme_id: 4, start_time: '15:00', end_time: '16:15'},
                            {theme_id: 4, start_time: '17:00', end_time: '18:15'},
                            {theme_id: 4, start_time: '19:00', end_time: '20:15'},
                            {theme_id: 4, start_time: '21:00', end_time: '22:15'},
                            {theme_id: 5, start_time: '09:00', end_time: '10:00'},
                            {theme_id: 5, start_time: '11:00', end_time: '12:00'},
                            {theme_id: 5, start_time: '13:00', end_time: '14:00'},
                            {theme_id: 5, start_time: '15:00', end_time: '16:00'},
                            {theme_id: 5, start_time: '17:00', end_time: '18:00'},
                            {theme_id: 5, start_time: '19:00', end_time: '20:00'},
                            {theme_id: 5, start_time: '21:00', end_time: '22:00'},
                            {theme_id: 6, start_time: '09:00', end_time: '10:15'},
                            {theme_id: 6, start_time: '11:00', end_time: '12:15'},
                            {theme_id: 6, start_time: '13:00', end_time: '14:15'},
                            {theme_id: 6, start_time: '15:00', end_time: '16:15'},
                            {theme_id: 6, start_time: '17:00', end_time: '18:15'},
                            {theme_id: 6, start_time: '19:00', end_time: '20:15'},
                            {theme_id: 6, start_time: '21:00', end_time: '22:15'},
                            {theme_id: 7, start_time: '09:00', end_time: '10:10'},
                            {theme_id: 7, start_time: '11:00', end_time: '12:10'},
                            {theme_id: 7, start_time: '13:00', end_time: '14:10'},
                            {theme_id: 7, start_time: '15:00', end_time: '16:10'},
                            {theme_id: 7, start_time: '17:00', end_time: '18:10'},
                            {theme_id: 7, start_time: '19:00', end_time: '20:10'},
                            {theme_id: 7, start_time: '21:00', end_time: '22:10'},
                            {theme_id: 8, start_time: '09:00', end_time: '10:00'},
                            {theme_id: 8, start_time: '11:00', end_time: '12:00'},
                            {theme_id: 8, start_time: '13:00', end_time: '14:00'},
                            {theme_id: 8, start_time: '15:00', end_time: '16:00'},
                            {theme_id: 8, start_time: '17:00', end_time: '18:00'},
                            {theme_id: 8, start_time: '19:00', end_time: '20:00'},
                            {theme_id: 8, start_time: '21:00', end_time: '22:00'}
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
