<template>
  <div class="form-table">
    <div class="table-body">
      <el-form
        ref="tableFormRef"
        :model="model"
        :rules="model.rules"
        class="tableForm"
      >
        <pure-table
          row-key="id"
          stripe
          alignWhole="center"
          showOverflowTooltip
          :data="model.tableData"
          :columns="tableColumns"
          :row-class-name="tableRowClassName"
        >
          <template #fruits="scope">
            <el-form-item
              :prop="'tableData.' + scope.$index + '.fruits'"
              :rules="model.rules.fruits"
            >
              <el-select
                v-model="scope.row.fruits"
                placeholder="请选择"
                clearable
                filterable
              >
                <el-option
                  v-for="item in options.fruitsList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </template>
          <template #hobby="scope">
            <el-form-item
              :prop="'tableData.' + scope.$index + '.hobby'"
              :rules="model.rules.hobby"
            >
              <el-input
                v-model="scope.row.hobby"
                placeholder="请输入"
                clearable
              />
            </el-form-item>
          </template>
          <template #animals="scope">
            <el-form-item
              :prop="'tableData.' + scope.$index + '.animals'"
              :rules="model.rules.animals"
            >
              <el-select
                v-model="scope.row.animals"
                placeholder="请选择"
                clearable
                filterable
                multiple
              >
                <el-option
                  v-for="item in options.animalsList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </template>
          <template #image="{ row }">
            <el-upload
              v-model:file-list="row.image.img"
              :class="{ disabled: row.image.img.length !== 0 }"
              action="#"
              :auto-upload="false"
              list-type="picture-card"
              :limit="1"
              :on-preview="handlePictureCardPreview"
            >
              <div>点击上传</div>
            </el-upload>
            <el-checkbox
              v-if="row.image.img.length !== 0"
              v-model="row.is_main"
              @change="value => handleChange(value, row)"
              >设为主图</el-checkbox
            >
          </template>
          <template #operation="scope">
            <el-button type="danger" link @click="handleDetele(scope.$index)"
              >删除</el-button
            >
          </template>
          <template #append>
            <div class="add-btn cursor-pointer" @click="onAddItem">
              添加规格
            </div>
          </template>
        </pure-table>
      </el-form>
      <div class="bottom-button">
        <el-button> 返回 </el-button>
        <el-button type="primary" @click="onSubmit(tableFormRef)">
          提交
        </el-button>
      </div>
      <el-dialog v-model="dialogVisible">
        <img class="img" :src="dialogImageUrl" alt="Preview Image" />
      </el-dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTableConfig } from "./useConfig";
import type { FormInstance } from "element-plus";
import { ref } from "vue";
const {
  tableColumns,
  options,
  model,
  onAddItem,
  handleDetele,
  handleChange,
  onSubmit
} = useTableConfig();
defineOptions({
  name: "formTablePage"
});
const dialogImageUrl = ref("");
const dialogVisible = ref(false);
const tableFormRef = ref<FormInstance>();

const tableRowClassName = row => {
  if (!row.row.showline) {
    return "hidden";
  }
};

const handlePictureCardPreview = uploadFile => {
  dialogImageUrl.value = uploadFile.url!;
  dialogVisible.value = true;
};
</script>

<style lang="scss" scoped>
.form-table {
  background-color: white;
  border-radius: calc(0.5rem * var(--pr));
  height: 100%;
  padding: calc(1rem * var(--pr));
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;

  .img {
    width: 100%;
  }

  .disabled {
    :deep(.el-upload--picture-card) {
      display: none !important;
    }
  }

  .table-body {
    flex: 1;
    overflow: hidden;
    margin: 100px;

    :deep(.el-table) {
      .hidden {
        display: none;
      }
    }

    .tableForm {
      :deep(.el-select) {
        width: 100% !important;
      }
    }

    .bottom-button {
      display: flex;
      justify-content: center;
      margin-top: 20px;
    }

    .add-btn {
      width: 100%;
      height: 50px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(70, 148, 197, 0.1);
      border-radius: 8px;
      border: 1px dashed #1677ff;
      color: #1677ff;
      font-weight: bold;
    }
  }
}
</style>
