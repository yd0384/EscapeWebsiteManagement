<template>
    <div id="total_reservation">
        <h1>노쇼 리스트</h1>
        <hr/>
        <b-table id="total_reservation_table" 
            :striped="true"
            :items="noshowList"
            :fields="fields"
            :small="true"
            :per-page="perPage"
            :current-page="currentPage"
            v-if = "rows>0"
        >
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
                    label: '번호'
                },
                {
                    key: 'booker_name',
                    label: '예약자 이름'
                },
                {
                    key: 'phone_number',
                    label: '전화번호'
                }
            ],
            perPage: 10,
            currentPage: 1,
            Days: ['일', '월', '화', '수', '목', '금', '토'],
        }
    },
    computed: {
        rows() {
            return this.noshowList.length
        },
        ...mapState({
            noshowList: state=> state.reservation.noshowList
        }),
    },
    created() {
        this.$store.dispatch('reservation/fetch_noshow_list');
    },
    methods: {

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