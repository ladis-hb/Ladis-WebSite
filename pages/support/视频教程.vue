<template>
  <b-container>
    <b-row>
      <b-col cols="12" md="4">
        <b-list-group class="asid">
          <b-list-group-item variant="info">常见问题</b-list-group-item>
          <b-list-group-item v-for="(val,key) in support_asid.data" :key="key">
            <b-button pill size="sm" v-b-toggle="'asid'+key" variant="link">+</b-button>
            <b-button @click="slic(val.title)" variant="link">{{val.title}}</b-button>
            <b-collapse :id="'asid'+key" visible accordion="my-accordion" role="tabpanel">
              <ul>
                <li v-for="(v1,k1) in val.child" :key="k1">
                  <b-button @click="slic(v1.title)" variant="link" >{{v1.title}}</b-button>
                </li>
              </ul>
            </b-collapse>
          </b-list-group-item>
        </b-list-group>
      </b-col>
      <b-col cols="12" md="8">
        <b-list-group id="support_list" class="list-group1">
          <b-list-group-item variant="dark"></b-list-group-item>
          <b-list-group-item
            v-for="(val,key) in lists.slice((currentPage*10)-10,currentPage*10)"
            :key="key"
          >
          <b-link :href="val.movie" target="_blank" v-if="val.movie">{{val.title}}/视频数据</b-link>
          <b-link :to="{path:val.href}" v-else>{{val.title}}</b-link>
          </b-list-group-item>
        </b-list-group>

        <b-pagination
          v-model="currentPage"
          :per-page="perPage"
          :total-rows="lists.length"
          aria-controls="support_list"
          class="pagination1"
        ></b-pagination>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import ladisModal from '../../components/modal'
export default {
  data() {
    return {
      lists:[],
      perPage: 10,
      currentPage: 1
    };
  },
  components:{
    ladisModal
  },

  async asyncData({ $axios, params, error, payload }) {
    var support_asid = await $axios.$get(
      `/api/Get_arg?table=pages&title=support_problem_asid`
    );
    if (payload) {
    } else {
      var list = await $axios.$get(
        `/api/Get_arg?table=support_list`
      );
    }

    return { support_asid, list };
  },

  created() {
    this.lists =  this.list
    //console.log(this.list);
  },
  methods: {
    pig(p) {
      return `http://www.ladis.com.cn/${p}`;
    },
    slic(title){
      if(title){
        console.log(title)
        var ls = []
        var list = this.list
        list.map(val=>{
          if(val.parentsUntil == title || val.parent == title) ls.push(val)
        })
        this.lists = ls
      }
    }
  },
  head:{
    title:'常见问题-雷迪司',
    meta: [
        { name: "keywords", content: '常见问题-雷迪司' },
        { name: "description", content: '常见问题-雷迪司' }
      ]
  }
};
</script>

<style lang='scss' scoped >
.asid {
  padding: 1rem;
  a {
    color: black;
  }
  li {
    //list-style: decimal;
  }
}
.list-group1{
  margin: 1rem .5rem;
}
.pagination1{
  margin: 1rem .5rem;
  align-items: center;
  justify-content: center
}
</style>
