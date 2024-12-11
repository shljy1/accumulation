import { reactive, nextTick } from "vue";
import { ElMessageBox } from "element-plus";
import { message } from "@/utils/message";
export function useTableConfig() {
  const validateNumber = (rule: any, value: any, callback: any) => {
    if (value === "") {
      callback(new Error("必填项"));
    } else if (isNaN(value)) {
      callback(new Error("请输入正确的数值"));
    } else {
      callback();
    }
  };
  const model = reactive({
    rules: {
      fruits: [{ required: true, message: "必填项", trigger: "change" }],
      hobby: [{ required: true, message: "必填项", trigger: "change" }],
      money: [{ validator: validateNumber, required: true, trigger: "change" }],
      animals: [{ required: true, message: "必填项", trigger: "change" }]
    },

    tableData: [
      {
        fruits: "",
        hobby: "",
        money: "",
        animals: [],
        showline: true,
        image: {
          img: []
        },
        is_main: false
      }
    ]
  });

  const options = reactive({
    fruitsList: [
      { label: "葡萄", value: "葡萄" },
      { label: "樱桃", value: "樱桃" },
      { label: "菠萝", value: "菠萝" }
    ],
    animalsList: [
      { label: "海豚", value: "海豚" },
      { label: "熊猫", value: "熊猫" },
      { label: "老虎", value: "老虎" }
    ]
  });
  const tableColumns: TableColumnList = [
    {
      label: "水果",
      slot: "fruits"
    },
    {
      label: "爱好",
      slot: "hobby"
    },
    {
      label: "金钱",
      slot: "money"
    },
    {
      label: "动物",
      slot: "animals"
    },
    {
      label: "图片",
      slot: "image"
    },
    {
      label: "操作",
      slot: "operation",
      width: 200,
      fixed: "right"
    }
  ];

  const onAddItem = () => {
    model.tableData.push({
      fruits: "",
      hobby: "",
      money: "",
      animals: [],
      showline: true,
      image: {
        img: []
      },
      is_main: false
    });
  };

  const handleDetele = async (index: number) => {
    let con = await ElMessageBox.confirm(" 是否删除该记录？", {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      type: "warning"
    }).catch(() => {});
    if (!con) return;
    model.tableData[index] = {
      fruits: "",
      hobby: "",
      money: "",
      animals: [],
      showline: false,
      image: {
        img: []
      },
      is_main: false
    };
    await nextTick();
    model.tableData.map(i => {
      if (i.image.img.length !== 0 && i.showline) {
        let blob = new Blob([i.image.img[0].raw], {
          type: i.image.img[0].raw.type
        });
        URL.revokeObjectURL(i.image.img[0].url);
        let blobURL = URL.createObjectURL(blob);
        i.image.img[0].url = blobURL;
      }
    });
  };

  const handleChange = (value, row) => {
    if (value) {
      model.tableData.forEach(i => {
        i.is_main = false;
        return i;
      });
      row.is_main = value;
    }
  };

  const onSubmit = async tableFormEls => {
    let tableValid = true;
    await tableFormEls.validate((valid, field) => {
      let deleteRow = [];
      model.tableData.map((i, n) => {
        if (!i.showline) {
          deleteRow.push(n.toString());
        }
      });
      if (field) {
        Object.keys(field).map(i => {
          let row = i.slice(10, 11).toString();
          if (deleteRow.indexOf(row) == -1) {
            tableValid = false;
          }
        });
      }
      valid = tableValid; //为通过语法检验而写，可以删
    });
    if (!tableValid) return;

    if (model.tableData.filter(i => i.showline).length == 0) {
      message("请至少添加一条商品规格", { type: "error" });
    }
  };

  return {
    tableColumns,
    options,
    model,
    handleChange,
    onAddItem,
    handleDetele,
    onSubmit
  };
}
