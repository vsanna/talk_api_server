import Vue from 'vue'
import $ from 'jquery'
import API from '../api.jsx';

$(() => {
  new Vue({
    'el': '#app',
    'data': {
      'messages': [],
      'input' : '',
      'loading': false,
      'sending': false
    },
    'methods': {
      'send' () {
        if ( this.loading ){ return; }
        // this.clear();
        this.messages = this.messages.concat([{
          'type': 'self',
          'body': this.input
        }])
        this.loading = true;
        API.get('/chat', { 'message': this.input }).done((data) => {
          this.messages = this.messages.concat(data.messages);
        }).fail(()=>{
          alert('エラー！たまにメッセージによって発生します。')
        }).always(() => {
          this.loading = false;
        })
      },
      'clear' () {
        this.messages = [];
      }
    }
  })
})
