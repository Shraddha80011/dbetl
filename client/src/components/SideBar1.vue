<template>
  <div style="width: inherit;">
    <div  style="background: rgb(54, 62, 79); height: 100%; position: fixed;width: inherit;">
      <Row style="padding: 16.3px 10px;border-bottom: 1px solid #15171b;">
        <Col :span="20" :offset="2">
          <Col :span="3">
            <Row type="flex" justify="start" align="middle">
              <a @click="$store.state.sidenavtoggle = !$store.state.sidenavtoggle">
                <Icon type="navicon-round" :size="24"></Icon>
              </a>
            </Row>
          </Col>
          <Col :span="21">
            <Row type="flex" justify="end" align="middle">
              <Tooltip :content="pinNvaigationContent" placement="left">
                <div :style="stylesPin">
                  <a @click="$store.state.sidenavpin = !$store.state.sidenavpin">
                    <Icon type="pin" :size="24" ></Icon>
                  </a>
                </div>
              </Tooltip>
            </Row>
          </Col>
        </Col>
      </Row>

      <Row style="padding: 10px;" :gutter="16">
        <Col span="8">
          <!-- <Dropdown trigger="click" @on-click='handleCommand' style="margin-left: 20px;">
            <a href="javascript:void(0)" class="list">Sort By
                <Icon type="arrow-down-b"></Icon>
            </a>
            <DropdownMenu slot="list">
                <DropdownItem name="asc">A-Za-z</DropdownItem>
                <DropdownItem name="desc">z-aZ-A</DropdownItem>
            </DropdownMenu>
          </Dropdown> -->
          <Select @on-change="handleCommand" placeholder="Sort By" size="small" style="width:135px;">
            <!-- <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option> -->
            <Option value="asc"><span>A-Za-z</span>
              <span style="float:right;">Ascending</span>
            </Option>
            <Option value="desc"><span>z-aZ-A</span>
              <span style="float:right;">Descending</span>
            </Option>
        </Select>
        </Col>
        <Col span="16">
          <Row type="flex" justify="end">
            <Col col="8">
              <Checkbox v-model="groupby" label="groupby" size="small" style="color:#fff;margin-top:5px;">Group By</Checkbox>
            </Col>
            <Col span="8">
              <router-link to="/schema/new">
                <Button type="default" size="small" icon="plus-round">Add</Button>
              </router-link>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row style="padding: 8px;" :gutter="16">
        <Col span="8">
          <router-link to="/jobs/list">
            <Button type="default" size="default">List Of Jobs</Button>
          </router-link>
        </Col>
      </Row>

      <Menu theme="dark" style="max-height:615px; overflow-y: auto" width="auto">
        <Submenu v-show="groupby" :name="index" v-for="(item, index) in schema" :key="index">
          <template slot="title">
            {{item[0]}}
          </template>
          <Submenu :name="ind-ind" v-for="(el, ind) in item[1]" :key="ind-ind">
            <template slot="title">
              &nbsp;&nbsp;&nbsp;&nbsp;{{el[0]}}
            </template>
            <MenuItem :name="indx-indx" v-for="(itm, indx) in el[1]" :key="indx-indx">
              <img v-if="itm.iconpath === 'mongo'" :src="mongo" class="schema-icon">
              <img v-else-if="itm.iconpath === 'rethink'" :src="rethink" class="schema-icon">
              <img v-else-if="itm.iconpath === 'elastic'" :src="elastic" class="schema-icon">
              <img v-else-if="itm.iconpath === 'nedb'" :src="nedb" class="schema-icon">
              <img v-else-if="itm.iconpath === 'mysql'" :src="mysql" class="schema-icon">
              <img v-else :src="itm.iconpath" class="schema-icon">
              <span>
                {{itm.title}}
              </span>
              <div class="menu-action-icon">
                <Tooltip content="Create instance" placement="top">
                    <router-link :to="{ name: 'schema-instance', params: { schemaid: itm._id }}">
                      <Icon type="play" class="ficon play"></Icon>
                    </router-link>
                </Tooltip>
                <Tooltip content="List" placement="top">
                  <a @click="setData(itm.title, '/instancelist/'+itm._id, itm._id, 'list')">
                    <Icon type="navicon-round" class="ficon list"></Icon>
                  </a>
                </Tooltip>
                <Tooltip content="Edit" placement="top">
                  <a @click="setData(itm.title, '/schema/edit/'+itm._id, itm._id, 'edit')">
                      <Icon type="ios-compose-outline" class="ficon edit"></Icon>
                  </a>
                  <router-link :to="{name: 'schema/edit', params: {id: itm._id}}" exact>
                  </router-link>
                </Tooltip>
                 <!--  <Tooltip content="Mapping" placement="top">
                  <router-link :to="{name: 'schemamappinglist', params: {id: itm._id}}">
                    <Icon type="arrow-swap" class="ficon transform"></Icon>
                  </router-link>
                </Tooltip> -->
                <Tooltip content="Delete" placement="top">
                  <a @click="handleRemove(indx)">
                    <Icon type="android-delete" class="ficon delete"></Icon>
                  </a>
                </Tooltip>
              </div>
            </MenuItem>
          </Submenu>
        </Submenu>
        <Menu-item v-show="!groupby" :name="index" v-for="(item, index) in schema" :key="index">
              <img v-if="item.iconpath === 'mongo'" :src="mongo" class="schema-icon">
              <img v-else-if="item.iconpath === 'rethink'" :src="rethink" class="schema-icon">
              <img v-else-if="item.iconpath === 'elastic'" :src="elastic" class="schema-icon">
              <img v-else-if="item.iconpath === 'nedb'" :src="nedb" class="schema-icon">
              <img v-else-if="item.iconpath === 'mysql'" :src="mysql" class="schema-icon">
              <img v-else :src="item.iconpath" class="schema-icon">
              <span>
                {{item.title}}
              </span>
              <div class="menu-action-icon">
                <Tooltip content="Create instance" placement="top">
                    <router-link :to="{ name: 'schema-instance', params: { schemaid: item._id }}">
                      <Icon type="play" class="ficon play"></Icon>
                    </router-link>
                </Tooltip>
                <Tooltip content="List" placement="top">
                  <a @click="setData(item.title, '/instancelist/'+item._id, item._id, 'list')">
                    <Icon type="navicon-round" class="ficon list"></Icon>
                  </a>
                </Tooltip>
                <Tooltip content="Edit" placement="top">
                  <a @click="setData(item.title, '/schema/edit/'+item._id, item._id, 'edit')">
                      <Icon type="ios-compose-outline" class="ficon edit"></Icon>
                  </a>
                  <!-- <router-link :to="{name: 'schema/edit', params: {id: item._id}}" exact>
                  </router-link> -->
                </Tooltip>
                <!-- <Tooltip content="Mapping" placement="top">
                  <router-link :to="{name: 'schemamappinglist', params: {id: item._id}}">
                    <Icon type="arrow-swap" class="ficon transform"></Icon>
                  </router-link>
                </Tooltip> -->
                <Tooltip content="Delete" placement="top">
                  <a @click="handleRemove(index)">
                    <Icon type="android-delete" class="ficon delete"></Icon>
                  </a>
                </Tooltip>
              </div>
        </Menu-item>
      </Menu>
    </div>
  </div>
</template>
<script>
/*eslint-disable*/
  import api from '../api'
  import settings from '../api/settings'
  import mongo from '../assets/images/mongo.png'
  import rethink from '../assets/images/rethink.png'
  import elastic from '../assets/images/elasticsearch.png'
  import nedb from '../assets/images/nedb.png'
  import mysql from '../assets/images/mysql.png'
  const _ = require('lodash')
  export default {
    data () {
      return {
        orderby: 'asc',
        groupby: true,
        mongo,
        rethink,
        elastic,
        nedb,
        mysql,
        deleteSchemaValue: 'softdel'
      }
    },
    created () {
      this.$store.dispatch('getSchema')
      this.$store.dispatch('getSettings')
    },
    asyncComputed: {
      async schema () {
        // console.log('allSchema from sidebar computed', this.$store.getters.allSchema, this.$store.getters.allSettings)
        var _data = this.$store.getters.allSchema
        var _settings = this.$store.getters.allSettings
        if (_data.length > 0) {
          _.map(_data, function (obj) {
            _.forEach(_settings[obj.database[0]], function(res, i){
              var instance = _.find(res, {id: obj.database[1]})
                if (instance.upldIcn === '') {
                  obj.iconpath = obj.database[0]
                } else {
                  obj.iconpath = instance.upldIcn
                }
            })
          })
          if (this.groupby) {
            var temp = await Promise.all(_.chain(_data).groupBy('database[0]').toPairs().map(async (m) => {
              var dbinstances = await settings.get(m[0])
              m[1] = _.chain(m[1]).groupBy(innermap => {
                return _.find(dbinstances.data, f=> { return f.id === innermap.database[1]}).connection_name
              }).toPairs().value()
              return m
            }).value())
            return temp
          } else {
            return _.orderBy(_data, [checkcase => checkcase.title.toLowerCase()], [this.orderby])
          }
        } else {
          return []
        }
      },
      stylesPin () {
        let style = {}
        if (this.$store.state.sidenavpin) {
          style.transform = 'rotate(90deg)'
        }
        return style
      },
      pinNvaigationContent () {
        return !this.$store.state.sidenavpin ? 'Pin nvaigation' : 'Unpin nvaigation'
      }
    },
    methods: {
      handleRemove (index) {
        this.$Modal.confirm({
          title: 'Confirm, Are you sure you want to delete?',
          // content: '<p>Are you sure you want to delete?</p>',
          width: 500,
          render: (h, params) => {
              return h('RadioGroup', {
                  props: {
                    vertical: true,
                    value: this.deleteSchemaValue,
                    size: 'large'
                  },
                  style: {
                    paddingTop: '20px'
                  },
                  on: {
                    'on-change': (value) => {
                      this.deleteSchemaValue = value
                      console.log('this.deleteSchemaValue', this.deleteSchemaValue)
                      // console.log(this.mongoDt[params.index].isenable);
                    }
                  }
              }, [
                h('Radio', {
                  props: {
                    size: 'large',
                    label: 'harddel'
                  }
                }, 'Delete Schema Permanently?? (With all instance Data)'),
                h('Radio', {
                  props: {
                    size: 'large',
                    label: 'softdel'
                  }
                }, 'Delete Schema Temporary? (Without instance Data)')
              ])
          },
          onOk: () => {
            if(this.deleteSchemaValue == 'softdel') {
              // alert(this.deleteSchemaValue)
              api.request('delete', '/schema/' + this.schema[index]._id+'?type='+this.deleteSchemaValue)
                .then(response => {
                  this.$Notice.success({title: 'Success!!', desc:'Schema Deleted...'});
                  this.$store.dispatch('getSchema')
                  // this.schema = response.data
                  // console.log(response.data)
                  // this.schema.splice(index, 1)
                })
                .catch(error => {
                  this.$Notice.error({title: 'Error!!', desc:'Schema Not Deleted...'});
                  console.log(error)
                })
            }
            else if(this.deleteSchemaValue == 'harddel') {
              // alert(this.deleteSchemaValue)
              api.request('delete', '/schema/' + this.schema[index]._id+'?type='+this.deleteSchemaValue)
                .then(response => {
                  // this.schema = response.data
                  // this.schema.splice(index, 1)
                })
                .catch(error => {
                  console.log(error)
                })
            }
            else {
              this.$Message.error('Error!!');
            }
            // api.request('delete', '/schema/' + this.schema[index]._id)
            // .then(response => {
            //   // this.schema = response.data
            //   this.schema.splice(index, 1)
            // })
            // .catch(error => {
            //   console.log(error)
            // })
            // this.formSchema.entity.splice(index, 1)
          },
          onCancel: () => {
            this.deleteSchemaValue = 'softdel'
          }
        })
      },
      setData (name, url, id, type) {
        var obj = {name: name, url: url, id: id, type: type}
        var self = this
        var flag = 0
        // console.log('obj', obj)
        // console.log(this.$store.state.tabdata.length)
        this.$store.state.tabdata.forEach(function (result, i) {
          if (result.id === id && result.type === type) {
            flag = 1
            self.$store.state.activetab = i
            self.$router.push(result.url)
          }
        })
        if (flag === 0) {
          this.$store.dispatch('getTabdata', obj)
          this.$store.state.activetab = this.$store.state.tabdata.length - 1
          this.$router.push(url)
        }
      },
      handleCommand (name) {
        this.orderby = name
      }
    }
  }
</script>

<style>
  .menu-item {
    background-color: #2b4c77;
  }
  .ficon {
    font-size: 16px;
  }
  .play {
    color:#00C851;
  }
  .list {
    color:#ffbb33;
  }
  .edit {
    color:#2BBBAD;
    font-weight:800;
  }
  .delete {
    color: #CC0000;
  }
  .transform {
    color: #00C851;
  }
  .el-dropdown-menu__item {
    text-align: center;
  }
 /* .ivu-menu-vertical .ivu-menu-item, .ivu-menu-vertical .ivu-menu-submenu-title{
    position: initial;
  }*/
  .schema-icon {
    width: 16px;
    height: 16px;
    margin-right:5px;
  }
  .menu-action-icon {
    float: right;
    display: none;
  }
  .menu-action-icon > div {
    margin-right:2px;
  }
  .ivu-menu-item:hover .menu-action-icon{
    display: block;
  }
  .ivu-select-dropdown {
    z-index: 905;
  }
</style>
