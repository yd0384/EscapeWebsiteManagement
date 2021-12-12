<template>
    <div>
        <h4 style="margin-bottom:50px;">예약정보</h4>
        <b-container style="width:35%">
            <b-form @submit="onSubmit" @reset="onReset">
                <b-form-group
                id="input-group-1"
                label="예약번호: "
                label-for="input-1"
                label-cols="12" label-cols-sm="2"
                >
                <b-form-input
                    id="input-1"
                    v-model="reservation_id"
                    disabled
                    style="background-color: #FFFFFF; text-align: center; border: 0px;"
                ></b-form-input>
                </b-form-group>
                <hr style="width:100%; margin-top:5px;">
                <b-form-group
                id="input-group-2"
                label="예약일: "
                label-for="input-2"
                label-cols="12" label-cols-sm="2"
                >
                <b-form-input
                    id="input-2"
                    v-model="play_date"
                    disabled
                    style="background-color: #FFFFFF; text-align: center; border: 0px;"
                ></b-form-input>
                </b-form-group>
                <hr style="width:100%; margin-top:5px;">
                <b-form-group
                id="input-group-3"
                label="예약시간: "
                label-for="input-3"
                label-cols="12" label-cols-sm="2"
                >
                <b-form-input
                    id="input-3"
                    v-model="play_time"
                    disabled
                    style="background-color: #FFFFFF; text-align: center; border: 0px;"
                ></b-form-input>
                </b-form-group>
                <hr style="width:100%; margin-top:5px;">
                <b-form-group
                id="input-group-4"
                label="테마명: "
                label-for="input-4"
                label-cols="12" label-cols-sm="2"
                >
                <b-form-input
                    id="input-4"
                    v-model="theme_name"
                    disabled
                    style="background-color: #FFFFFF; text-align: center; border: 0px;"
                ></b-form-input>
                </b-form-group>
                <hr style="width:100%; margin-top:5px;">
                <b-form-group
                id="input-group-5"
                label="인원수: "
                label-for="input-5"
                label-cols="12" label-cols-sm="2"
                >
                <b-form-input
                    id="input-5"
                    v-model="head_count"
                    disabled
                    style="text-align: center;"
                ></b-form-input>
                </b-form-group>
                <hr style="width:100%; margin-top:5px;">
                <b-form-group
                id="input-group-6"
                label="전화번호: "
                label-for="input-6"
                label-cols="12" label-cols-sm="2"
                >
                <b-form-input
                    id="input-5"
                    v-model="phone_number"
                    disabled
                    style="text-align: center;"
                ></b-form-input>
                <hr style="width:100%; margin-top:5px;">
                </b-form-group>
                <b-form-group
                id="input-group-7"
                required
                label="IP: "
                label-for="input-9"
                label-cols="12" label-cols-sm="2"
                >
                <b-form-input
                    id="input-5"
                    v-model="ip"
                    disabled
                    style="text-align: center;"
                ></b-form-input>
                </b-form-group>
                <hr style="width:100%; margin-top:5px;">
                <b-button type="submit" variant="primary" class="p-2 mx-2"> 예약하기 </b-button>
                <b-button type="reset" class="p-2 mx-2"> 초기화 </b-button>
            </b-form>
        </b-container>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                reservation_id: 1,
                play_date: '2021/12/12',
                play_time: '09:00~10:00',
                theme_name: 'dear marsy',
                head_count:'2',
                booker_name: '홍길동',
                phone_number: '010-1234-5678',
                ip: '127.0.0.1',
                idx: 0,
                options: [
                { item: '010', name: '010' },
                { item: '011', name: '011' },
                { item: '016', name: '016' },
                { item: '017', name: '017' },
                { item: '018', name: '018' },
                { item: '019', name: '019' }
                ],
                items2: [
                    {예약번호: 1, 날짜: "2021/09/21", 시간: "09:00~10:00", 
                    테마: "튀어마르시", 인원수: 2, 예약자명: "홍길동", 연락처: "010-1234-5678", IP: '127.0.0.1'},
                    {번호: 5, 제목: "홍대점 10월 오픈기념 이벤트", 작성자: "홍대점", 
                    작성일: "2021.10.01", 조회: 23},
                    {번호: 4, 제목: "건대 2호점 향수테마 관련 공지사항", 작성자: "건대2호점", 
                    작성일: "2021.09.10", 조회: 50},
                    {번호: 3, 제목: "건대 3호점 오픈예정", 작성자: "총관리자", 
                    작성일: "2021.02.18", 조회: 100},
                    {번호: 2, 제목: "건대 1호점 태풍관련 공지사항", 작성자: "건대1호점", 
                    작성일: "2020.10.30", 조회: 34},
                    {번호: 1, 제목: "이스케이프룸 SNS 할인 이벤트", 작성자: "총관리자", 
                    작성일: "2020.04.23", 조회: 7}
                ]
            }
        }
    }
</script>
