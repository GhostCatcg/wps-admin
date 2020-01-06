/**
*
* Author: GhostCat
* CreatDate: 2020-01-06 18:46:09
*
* Description: 公司黑名单管理
*
*/
<style lang='scss' scoped type='text/scss'>
.company-wapper {
  height: 100%;
  .company-head {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height:50px;
    line-height: 50px;
    margin-bottom:10px;
    .ant-btn {
      margin-left: 20px;
    }
  }
  .company-content{
    height:calc(100% - 60px );
  }
}
</style>
<template>
  <div class="company-wapper">
    <a-col class="company-head" :span="24">
      <a-button type="primary" class="company-create">创建</a-button>
      <a-button type="primary" class="company-edit">编辑</a-button>
      <a-button type="primary" class="company-look">查看</a-button>
      <a-button type="primary" class="company-blockList">拉黑</a-button>
      <a-button type="primary" class="company-blockHistory">拉黑历史</a-button>
    </a-col>
    <a-col class="company-content" :span="24">
      <a-table :rowSelection="rowSelection" :columns="columns" :dataSource="data" />
    </a-col>
  </div>
</template>

<script>
const columns = [
  {
    title: "Name",
    dataIndex: "name"
  },
  {
    title: "Age",
    dataIndex: "age"
  },
  {
    title: "Address",
    dataIndex: "address"
  }
];

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`
  });
}
export default {
  name: "company",
  components: {},
  props: {},
  data() {
    return {
      data,
      columns,
      selectedRowKeys: [] // Check here to configure the default column
    };
  },
  created() {},
  mounted() {},
  computed: {
    rowSelection() {
      const { selectedRowKeys } = this;
      return {
        selectedRowKeys,
        onChange: this.onSelectChange,
        hideDefaultSelections: true,
        selections: [
          {
            key: "all-data",
            text: "Select All Data",
            onSelect: () => {
              this.selectedRowKeys = [...Array(46).keys()]; // 0...45
            }
          },
          {
            key: "odd",
            text: "Select Odd Row",
            onSelect: changableRowKeys => {
              let newSelectedRowKeys = [];
              newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                if (index % 2 !== 0) {
                  return false;
                }
                return true;
              });
              this.selectedRowKeys = newSelectedRowKeys;
            }
          },
          {
            key: "even",
            text: "Select Even Row",
            onSelect: changableRowKeys => {
              let newSelectedRowKeys = [];
              newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                if (index % 2 !== 0) {
                  return true;
                }
                return false;
              });
              this.selectedRowKeys = newSelectedRowKeys;
            }
          }
        ],
        onSelection: this.onSelection
      };
    }
  },
  methods: {
    onSelectChange(selectedRowKeys) {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    }
  },
  watch: {}
};
</script>
