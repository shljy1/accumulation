<template>
  <div class="p-2">
    <div>
      <el-button type="primary" size="small" @click="addGroup"
        >添加分组</el-button
      >
    </div>
    <el-tree
      :data="data"
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
    >
      <template #default="{ node, data }">
        <div class="custom-tree-node">
          <el-input
            v-if="node.data.edit"
            :ref="el => setInputRef(el, data.id)"
            v-model="data.label"
            size="mini"
            autofocus
            @blur="onBlur(data)"
          />
          <span v-else @dblclick="onDblclick(data)">{{ node.label }}</span>
        </div>
      </template>
    </el-tree>
  </div>
</template>
<script setup>
import { ref, nextTick } from "vue";

const inputRefs = ref({});
const data = ref([
  {
    id: 1,
    label: "Level one 1",
    children: [
      {
        id: 4,
        label: "Level two 1-1",
        children: [
          {
            id: 9,
            label: "Level three 1-1-1"
          },
          {
            id: 10,
            label: "Level three 1-1-2"
          }
        ]
      }
    ]
  },
  {
    id: 2,
    label: "Level one 2",
    children: [
      {
        id: 5,
        label: "Level two 2-1"
      },
      {
        id: 6,
        label: "Level two 2-2"
      }
    ]
  },
  {
    id: 3,
    label: "Level one 3",
    children: [
      {
        id: 7,
        label: "Level two 3-1"
      },
      {
        id: 8,
        label: "Level two 3-2"
      }
    ]
  }
]);

const addGroup = () => {
  let _id = data.value.length + 1;
  data.value.push({ id: _id, edit: true, label: "" });
  nextTick(() => {
    inputRefs.value[_id]?.focus();
  });
};
const onBlur = data => {
  if (data.label == "") {
    $message.error("请输入文件夹名称");
    inputRefs.value[data.id]?.focus();
  } else {
    data.edit = false;
  }
};

const setInputRef = (el, nodeId) => {
  if (el) {
    inputRefs.value[nodeId] = el;
  }
};

const onDblclick = data => {
  data.edit = true;
  nextTick(() => {
    inputRefs.value[data.id]?.focus();
  });
};
</script>
<style lang="scss" scoped>
:deep(.el-input--mini .el-input__inner) {
  height: 24px;
  line-height: 24px;
}
</style>
