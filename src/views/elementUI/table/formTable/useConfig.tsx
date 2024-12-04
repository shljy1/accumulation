import { reactive } from "vue";
export function useTableConfig() {
  const model = reactive({
    rules: {
      fruits: [{ required: true, message: "必填项", trigger: "change" }],
      hobby: [{ required: true, message: "必填项", trigger: "change" }],
      animals: [{ required: true, message: "必填项", trigger: "change" }]
    },

    tableData: [
      {
        fruits: "",
        hobby: "",
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
      animals: [],
      showline: true,
      image: {
        img: []
      },
      is_main: false
    });
  };

  return {
    tableColumns,
    options,
    model,
    onAddItem
  };
}
