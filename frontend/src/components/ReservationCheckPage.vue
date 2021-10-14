<template>
<div>
    <h1 style="margin-bottom:-5px;">Reservation</h1>
    [예약확인/취소]
    <h5 style="margin-top:50px;">예약할 때 사용하셨던 성명과 전화번호를 적어주십시오.</h5>
    <hr class="mx-5">
    <b-container>
        <b-row align-h="center">
            <b-col md="auto"><label for="input-small">예약자명</label></b-col>
            <b-col md="auto"><b-form-input type="text" style="width:80px; height:25px;" class="input"></b-form-input></b-col>
            <b-col md="auto"><label for="input-small">전화번호</label></b-col>
            <b-col md="auto"><b-form-select v-model="selected" style="width:60px; height:25px; font-size : 0.65rem;" class="select">
                <b-form-select-option :value="a">010</b-form-select-option>
                <b-form-select-option :value="b">011</b-form-select-option>
                <b-form-select-option :value="c">016</b-form-select-option>
                <b-form-select-option :value="d">017</b-form-select-option>
                <b-form-select-option :value="e">018</b-form-select-option>
                <b-form-select-option :value="f">019</b-form-select-option>
            </b-form-select></b-col>
            <b-col md='auto'><b-input type="text" style="width:60px; height:25px; font-size : 0.9rem;" class="input"></b-input></b-col>
            <b-col md='auto'><b-input type="text" style="width:60px; height:25px; font-size : 0.9rem;" class="input"></b-input></b-col>
            <b-button class="confirm_button" sytle="height:20px;">예약확인</b-button>
        </b-row>
    </b-container>
</div>
</template>
