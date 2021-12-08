<template>
    <div id="total_reservation">
        <h1>당일 예약</h1>
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

        <b-table id="total_reservation_table" 
            :striped="true"
            :items="reservations"
            :fields="fields"
            :small="true"
            :filter="filter"
            :filter-included-fields="filterOn"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            :sort-direction="sortDirection"
            :per-page="perPage"
            :current-page="currentPage"
            stacked="md"
            show-empty
            @filtered="onFiltered"
        >
            <template #cell(start_time)="data">
                {{ DBdatetimeToString(data.value) }}
            </template>

            <template #cell(end_time)="data">
                {{ DBdatetimeToString(data.value) }}
            </template>

            <template #cell(reserved_time)="data">
                {{ DBdatetimeToString(data.value) }}
            </template>

        </b-table>

        <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            size="md"
            align="center"
            class="mt-4">
        </b-pagination>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
export default {
    data(){
        return {
            fields: [
                {
                    key: 'id',
                    label: '예약번호'
                },
                {
                    key: 'theme_id',
                    label: '테마명'
                },
                {
                    key: 'start_time',
                    label: '테마시작시간'
                },
                {
                    key: 'end_time',
                    label: '테마종료시간'
                },
                {
                    key: 'status',
                    label: '예약상태'
                },
                {
                    key: 'reserved_time',
                    label: '예약시간'
                },
                {
                    key: 'number_of_player',
                    label: '인원수'
                },
                {
                    key: 'phone_number',
                    label: '전화번호'
                },
                {
                    key: 'booker_name',
                    label: '예약자명'
                },
                {
                    key: 'booker_ip',
                    label: 'IP'
                },
                {
                    key: 'noshow',
                    label: '노쇼여부'
                }
            ],
            perPage: 5,
            currentPage: 1,
            Days: ['일', '월', '화', '수', '목', '금', '토'],
        }
    },
    computed: {
        rows() {
            return this.reservations.length
        },
        ...mapState({
            reservations: state=> state.reservation.reservations
        }),
    },
    created() {
        this.$store.dispatch('reservation/fetch_reservations');
    },
    methods: {
        DBdatetimeToString(tzString){
            let time = new Date(tzString.slice(0,-1));
            time.setHours(time.getHours()+9);
            return time.getFullYear()+"년 "+ (time.getMonth()+1)+"월 "+time.getDate()+"일 "+this.Days[time.getDay()]+"요일 "+((time.getHours()<10)?'0'+time.getHours():time.getHours())+":"+((time.getMinutes()<10)?'0'+time.getMinutes():time.getMinutes());
        }
    }
}
</script>

<style>
    #total_reservation_table{
        text-align:middle;
    }
    #total_reservation {
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