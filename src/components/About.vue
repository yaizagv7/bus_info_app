<template>
    <div class="about-container">
        <div class="page_header">
            <router-link class="orm_logo" aria-label="Map" to="/map"></router-link>
        </div>
        <div class="page_content">
            
            <div class="about_top">    
                <i18n path="about.app" tag="div" class="about_app">
                    <b>Bis +Info mApp</b>
                </i18n>
                <v-select :items="languages" v-model="$i18n.locale" @change="changeLang" solo label="Language" class="language-select"></v-select>
            </div>
        
            <div v-if="authenticated === false">
                <p v-html="$t('message.needAccount')"></p>
                <p>{{ $t('message.aboutOsm') }}</p>
                <p>{{ $t('message.signUp') }}</p>
            </div>
 
    <!-- 
            <div class="main_box">
                <router-link class="box_item ico_account" to="/login">{{ $t('menu.user') }}</router-link> 
                <router-link class="box_item ico_add" to="/map/add">{{ $t('menu.add') }}</router-link>
                <router-link class="box_item ico_map" to="/map">{{ $t('menu.map') }}</router-link>
            </div>
    -->
            <h2>{{ $t('about.dataHeader') }}</h2>
            <i18n path="about.data" tag="p">
                <a rel="noopener" href="https://www.openstreetmap.org/" target="_blank">OpenStreetMap</a>
            </i18n>


            <h2>{{ $t('about.contributingHeader') }}</h2>
            <i18n path="about.contributing" tag="p">
                <a rel="noopener" href="https://github.com/meta-systems/openrecyclemap" target="_blank">Github</a>
            </i18n>
            <i18n path="about.contact" tag="p">
                <a rel="noopener" href="tg://resolve?domain=openrecyclemap" target="_blank">Telegram</a>
            </i18n>

            <h2>{{ $t('about.androidHeader') }}</h2>
            <i18n path="about.android" tag="p">
                <a rel="noopener" href="https://play.google.com/store/apps/details?id=org.openrecyclemap" target="_blank">Google Play</a>
            </i18n>

            <div class="dev_box">
                {{ $t('message.devBy') }} <a rel="noopener" href="https://msys.pro/" target="_blank">MetaSystems</a>
            </div>

        </div>
    </div>

</template>

<script>
    import oauthMixin from '../mixins/Oauth'
    export default {
        mixins: [oauthMixin],
        data: function () {
            return {
                languages: [
                    {text: 'English', value: 'en'},
                    {text: 'Español', value: 'es'},
                    {text: 'Русский', value: 'ru'},
                    {text: 'Français', value: 'fr'},
                    {text: 'Français', value: 'fr'},
                    {text: 'Italiano', value: 'it'},
                    {text: 'Português', value: 'pt'},
                    {text: 'Deutsch', value: 'de'}
                ]
            };
        },
        methods: {
            toMap: function () {
                this.$router.push({path: '/map'});
            },
            changeLang: function () {
                localStorage.setItem('lang', this.$i18n.locale);
            }
        },
        created() {
            this.authInit();
        }
    }
</script>

<style>
    .about_top {
        display: flex;
        margin:10px 0 25px;
    }
    .about_app {
        margin-right:20px;
        padding:20px;
        background: white;
        border-radius: 5px;
        font-size: 16px;
        box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.26);
    }


    .user_line:hover .link {
        display:inline;
    }
    .user_line .link {
        display:none;
    }
    .user_line b {
        margin-right: 10px;
    }
    .account_box {
        margin-left: auto;
    }
    .link:hover {
        text-decoration: underline;
    }
    .link {
        text-decoration: none;
        color:#1b5e20;
        cursor: pointer;
    }
    .page_header {
        background:white;
        padding:15px;
        padding-right: 90px;
        display: flex;
        align-items: center;
        box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.26);
    }
    .page_content {
        padding:15px 5vw;
        max-width: 800px;
    }
    .map_icon {
        position: absolute;
        top:25px;
        right:25px;
        background-size:80% !important;
    }
    .dev_box a {
        text-decoration: none;
    }
    .dev_box {
        position:absolute;
        bottom:20px;
        right:20px;
        margin-top:30px;
        font-size:12px;
    }
    h2 {
        margin-top:20px;
        font-weight: normal;
    }
    table {
        border-collapse: collapse;
        margin:30px 0;
    }
    .thead {
        font-weight:bold;
    }
    tr:hover {
        background:#eee;
    }
    td {
        padding:8px 10px;
        border-bottom:1px solid #ccc;
        border-top:1px solid #ccc;
    }
    .v-content__wrap {
        background:#eee;
    }
    .main_box {
        display:flex;
        margin-bottom:30px;
    }
    .box_item:hover {
        box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.25);
    }
    .box_item:before {
        width:55px;
        height:55px;
        content:'';
    }
    .box_item {
        background:white;
        display:flex;
        width:110px;
        box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
        margin:10px;
        padding:15px;
        border-radius:10px;
        flex: 0 50%;
        box-sizing:border-box;
        color:black;
        text-decoration:none;
        background-repeat:no-repeat;
        background-position:top center;

        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
    .about-container {
        padding-bottom:130px;
    }
    .orm_logo {
        width:60px;
        height:60px;
        background-size:contain;
        display:block;
        background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg version='1.0' xmlns='http://www.w3.org/2000/svg' width='211.000000pt' height='210.000000pt' viewBox='0 0 211.000000 210.000000' preserveAspectRatio='xMidYMid meet'%3e%3cg transform='translate(0.000000,210.000000) scale(0.100000,-0.100000)' fill='%23000000' stroke='none'%3e%3cpath d='M841 1934 c-81 -22 -149 -62 -217 -129 -127 -126 -172 -297 -125 -477 l17 -68 -183 0 -183 0 0 -381 0 -381 233 4 232 3 60 30 c84 43 100 68 100 164 0 70 -3 81 -28 114 -15 21 -44 45 -64 56 -36 18 -37 18 -14 31 13 6 26 8 30 3 16 -18 157 -217 168 -237 7 -11 13 -54 13 -93 l0 -73 100 0 100 0 0 93 0 93 65 88 65 88 0 -181 0 -181 100 0 100 0 0 197 c0 117 4 193 9 188 5 -6 35 -68 66 -138 l58 -128 55 3 54 3 58 128 c31 70 60 130 64 134 3 3 6 -82 6 -190 l0 -197 100 0 100 0 0 380 0 381 -110 -3 -111 -3 -79 -174 c-44 -96 -81 -175 -83 -177 -2 -2 -39 75 -82 172 -43 96 -82 177 -85 179 -4 2 1 35 11 72 84 321 -150 625 -477 622 -38 0 -93 -7 -123 -15z m192 -310 c73 -37 109 -91 109 -164 0 -58 -21 -101 -69 -137 -32 -24 -45 -28 -104 -28 -53 0 -74 5 -95 21 -113 84 -101 238 25 304 45 24 92 25 134 4z m-499 -560 c9 -8 16 -28 16 -44 0 -49 -21 -60 -116 -60 l-84 0 0 60 0 60 84 0 c64 0 88 -4 100 -16z m27 -280 c7 -9 13 -32 13 -51 0 -53 -21 -63 -131 -63 l-93 0 0 65 0 65 99 0 c78 0 101 -3 112 -16z'/%3e%3c/g%3e%3c/svg%3e");    }
    .map_icon,
    .ico_map:before {
        background-image: url("data:image/svg+xml;charset=utf8,%3Csvg width='56' height='56' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M45.33 10.35c.3.18.47.5.47.85v28a1 1 0 0 1-.55.9l-11.2 5.6a1 1 0 0 1-.9 0L22.4 40.31l-10.75 5.37a1 1 0 0 1-1.45-.89v-28a1 1 0 0 1 .55-.9l11.2-5.6a1 1 0 0 1 .9 0l10.75 5.38 10.75-5.37a1 1 0 0 1 .98.04zM32.6 17.42l-9.2-4.6v25.76l9.2 4.6V17.42zm2 25.76l9.2-4.6V12.82l-9.2 4.6v25.76zm-13.2-4.6V12.82l-9.2 4.6v25.76l9.2-4.6z' fill='%23000'/%3E%3C/svg%3E");
    }
    .ico_account:before {
        background-image: url("data:image/svg+xml;charset=utf8,%3Csvg width='56' height='56' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M28 9C17.52 9 9 17.52 9 28c0 5.61 2.45 10.67 6.33 14.15v.01l.28.24.15.12a19.36 19.36 0 0 0 2.52 1.8l.2.12c.45.25.9.5 1.36.72h.02c.98.47 2.02.86 3.1 1.15l.05.02c.51.14 1.03.26 1.55.35l.15.03c.5.09 1.01.16 1.53.2l.18.02a18.98 18.98 0 0 0 3.16 0l.18-.01a18.8 18.8 0 0 0 1.53-.21l.15-.03c.52-.1 1.04-.21 1.55-.35l.06-.02a19.22 19.22 0 0 0 4.47-1.88l.2-.11c.4-.24.8-.5 1.17-.77l.3-.2c.36-.27.71-.55 1.05-.83l.15-.12.28-.24v-.01A18.96 18.96 0 0 0 47 28c0-10.48-8.52-19-19-19zm0 19a6.34 6.34 0 1 1 .01-12.68A6.34 6.34 0 0 1 28 28zm2.38 1.58c4.8 0 8.7 3.91 8.7 8.71v3.14l-.1.08c-.31.25-.63.5-.96.72l-.22.16c-.35.24-.71.46-1.08.68l-.2.12a17.26 17.26 0 0 1-5.45 1.95l-.13.02c-.45.08-.9.14-1.36.18l-.19.02a18.1 18.1 0 0 1-2.78 0l-.2-.02c-.45-.04-.9-.1-1.35-.18l-.13-.02a17.43 17.43 0 0 1-4.13-1.29l-.13-.06a17.3 17.3 0 0 1-2.47-1.4l-.22-.16c-.33-.23-.65-.47-.96-.73l-.1-.08V38.3c0-4.8 3.9-8.7 8.7-8.7h4.75zm10.29 10.36v-1.65c0-4.96-3.54-9.12-8.22-10.08a7.91 7.91 0 1 0-8.9 0 10.31 10.31 0 0 0-8.22 10.08v1.65A17.35 17.35 0 0 1 10.58 28c0-9.6 7.82-17.42 17.42-17.42 9.6 0 17.42 7.82 17.42 17.42 0 4.62-1.81 8.82-4.75 11.94z' fill='%23000'/%3E%3C/svg%3E");
    }
    .ico_add:before {
        background-image: url("data:image/svg+xml;charset=utf8,%3Csvg width='56' height='56' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='28' cy='28' r='18.25' fill='%23fff' stroke='%23000' stroke-width='1.5'/%3E%3Crect x='25.89' y='20' width='4.22' height='16' rx='.84' fill='%23248A00'/%3E%3Crect x='20' y='30.11' width='4.22' height='16' rx='.84' transform='rotate(-90 20 30.11)' fill='%23248A00'/%3E%3C/svg%3E");
    }
</style>
