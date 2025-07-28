<template>
  <div class="p-2">
    <div class="mb-2">
      <el-button type="primary" size="small" @click="addGroup('root')"
        >添加分组</el-button
      >
    </div>
    <el-tree
      ref="treeRef"
      :data="treeData"
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
      @node-contextmenu="handleNodeContextmenu"
    >
      <template #default="{ node, data }">
        <div class="custom-tree-node">
          <el-input
            v-if="node.data.edit"
            :ref="el => setInputRef(el, data.id)"
            v-model="data.label"
            size="small"
            autofocus
            @blur="onBlur(data)"
          />
          <span v-else @dblclick="onRename(data)">{{ node.label }}</span>
        </div>
      </template>
    </el-tree>
    <div
      v-if="contextmenuShow"
      class="custom-contextmenu"
      :style="{
        left: `${contextmenuPosition.menuX}px`,
        top: `${contextmenuPosition.menuY}px`
      }"
    >
      <div @click="addGroup('node')">添加分组</div>
      <div @click="onRename(currentNode)">重命名</div>
      <div class="text-[#DC4326]" @click="onDelete">删除</div>
    </div>
  </div>
</template>
<script setup>
import { ref, nextTick, onMounted, onBeforeUnmount } from "vue";
import { ElMessage } from "element-plus";
const inputRefs = ref({});
const contextmenuShow = ref(false);
const contextmenuPosition = ref({
  menuX: 0,
  menuY: 0
});
const editNode = ref("add"); //命名状态是新增还是编辑
const currentNode = ref({}); //右键选中的节点
const treeRef = ref(null);
const treeData = ref([
  {
    id: 1,
    label: "Level one 1",
    edit: false,
    children: [
      {
        id: 4,
        label: "Level two 1-1",
        edit: false,
        children: [
          {
            id: 9,
            label: "Level three 1-1-1",
            edit: false
          },
          {
            id: 10,
            label: "Level three 1-1-2",
            edit: false
          }
        ]
      }
    ]
  },
  {
    id: 2,
    label: "Level one 2",
    edit: false,
    children: [
      {
        id: 5,
        label: "Level two 2-1",
        edit: false
      },
      {
        id: 6,
        label: "Level two 2-2",
        edit: false
      }
    ]
  }
]);
onMounted(() => {
  window.addEventListener("click", setContextmenuShow);
});

const addGroup = (type = "root") => {
  let _id = crypto.randomUUID();
  editNode.value = "add";
  if (type == "node") {
    let node = treeRef.value.getNode(currentNode.value.id);
    const newChildren = [
      ...(node.data.children || []),
      { id: _id, edit: true, label: "" }
    ];
    treeRef.value.updateKeyChildren(node.data.id, newChildren);
  } else {
    treeData.value.push({ id: _id, edit: true, label: "" });
  }
  nextTick(() => {
    inputRefs.value[_id]?.focus();
  });
};

const onBlur = data => {
  if (data.label == "") {
    if (editNode.value == "add") {
      treeRef.value.remove(data.id);
    } else {
      ElMessage.error("请输入文件夹名称");
      inputRefs.value[data.id]?.focus();
    }
  } else {
    data.edit = false;
    //触发tree组件更新实现编辑的响应式
    treeData.value = [...treeData.value];
  }
};

const setInputRef = (el, nodeId) => {
  if (el) {
    inputRefs.value[nodeId] = el;
  }
};

//鼠标右键菜单显示
const handleNodeContextmenu = (event, data) => {
  event.preventDefault();
  if (data.edit) return; //编辑状态不能右键菜单
  contextmenuShow.value = true;
  contextmenuPosition.value.menuX = event.clientX;
  contextmenuPosition.value.menuY = event.clientY;
  currentNode.value = data;
};

const onRename = data => {
  editNode.value = "edit";
  data.edit = true;
  //触发tree组件更新实现编辑的响应式
  treeData.value = [...treeData.value];
  nextTick(() => {
    inputRefs.value[data.id]?.focus();
  });
};

const onDelete = () => {
  treeRef.value.remove(currentNode.value.id);
};
const setContextmenuShow = () => {
  contextmenuShow.value = false;
};

onBeforeUnmount(() => {
  window.removeEventListener("click", setContextmenuShow);
});
</script>
<style lang="scss" scoped>
.custom-contextmenu {
  position: fixed;
  color: #606266;
  background: white;
  border: 1px solid #ddd;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  text-align: center;
}
.custom-contextmenu div {
  padding: 8px 12px;
  cursor: pointer;
}
.custom-contextmenu div:hover {
  background: #f5f5f5;
}
</style>
