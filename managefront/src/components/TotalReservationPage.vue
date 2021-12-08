<template>
    <div id="notice">
        <h1>전체 예약</h1>
        <hr/>
        <container>
            <b-row align-h="end" class="search_box">
                <b-form-select v-model="selected" style="width:70px;" class="select">
                    <b-form-select-option :value="a">전체</b-form-select-option>
                    <b-form-select-option :value="b">제목</b-form-select-option>
                    <b-form-select-option :value="c">작성자</b-form-select-option>
                </b-form-select>    
                <b-input type="text" style="width:150px;" class="input"></b-input>
                <b-button class="search_button">검색</b-button>
            </b-row>
        </container>

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
        <p v-for="reservation in reservations" :key=reservation.id>
            {{reservation}}
        </p>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
export default {
    data(){
        return {
            perPage: 3,
            currentPage: 1,
            items: [
                {번호: 1303006, 제목: "저 언어 5개함", 작성자: "ㅇㅇ", 
                작성일: "2020.04.23", 조회: 7},
                {번호: 1303005, 제목: "파이썬 뉴비 질문이요..", 작성자: "ㅇㅇ", 
                작성일: "2020.04.23", 조회: 23},
                {번호: 1303004, 제목: "이거 무슨 코드냐 ㅋㅋㅋㅋ", 작성자: "구웩", 
                작성일: "2020.04.23", 조회: 50},
                {번호: 1303003, 제목: "크롤러 만들어 봄", 작성자: "ㅇㅇ", 
                작성일: "2020.04.23", 조회: 100},
                {번호: 1303002, 제목: "과제.jpg", 작성자: "학부생", 
                작성일: "2020.04.23", 조회: 34},
                {번호: 1303001, 제목: "탈갤함 ㅂㅂ", 작성자: "백수", 
                작성일: "2020.04.23", 조회: 7}
            ]
        }
    },
    computed: {
        rows() {
            return this.items.length
        },
        ...mapState({
            reservations: state=> state.reservation.reservations
        })
    },
    created() {
        this.$store.dispatch('reservation/fetch_reservations');
    }
}
</script>

<style>
    #notice_table{
        text-align:start;
    }
    #notice {
    margin: 20px;
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