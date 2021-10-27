<template>
    <div id="notice">
        <h1 style="margin-bottom:-5px;">Customer</h1>
        [공지사항]
        <hr/>
        <b-row align-h="end" class="search_box">
            <b-form-select v-model="selected" :options="options" style="width:90px;" class="select">
            </b-form-select>    
            <b-input type="text" style="width:150px;" class="input"></b-input>
            <b-button class="search_button">검색</b-button>
        </b-row>

        <b-table id="notice_table" striped hover 
            :items="items"
            :per-page="perPage"
            :current-page="currentPage" small
        ></b-table>

        <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            size="sm"
            align="center"
            class="mt-4">
        </b-pagination>
  </div>
</template>

<script>
    export default {
        data(){
            return {
                selected: '전체',
                options: [
                    '전체',
                    '제목',
                    '작성자'
                ],
                perPage: 3,
                currentPage: 1,
                items: [
                    {번호: 6, 제목: "강남점 11월 이벤트", 작성자: "강남점", 
                    작성일: "2021.10.23", 조회: 7},
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
        },
        computed: {
            rows() {
                return this.items.length
            }
        }
    }
</script>

<style>
    #notice_table{
        text-align:start;
    }
    .search_box{
        margin-bottom:20px;
    }
    .search_button,
    .input,
    .select {
        margin-right: 5px;
    }
</style>