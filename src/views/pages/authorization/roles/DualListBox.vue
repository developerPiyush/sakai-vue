<template>
    <div class="container">
      <div class="panel">
        <h2>{{ props.leftLabel }}</h2>
        <select class="form-select" multiple v-model="leftSelectedData" @dblclick="moveRight">
          <option v-for="(item, index) in props.leftData" :value="item" :key="item.id">
            {{ item.name }}
          </option>
        </select>
      </div>
  
      <div class="middle">
        <button class="btn" @click.prevent="moveRight">&rarr;</button>
        <button class="btn" @click.prevent="moveLeft">&larr;</button>
      </div>
  
      <div class="panel">
        <h2>{{ props.rightLabel }}</h2>
        <select class="form-select" multiple v-model="rightSelectedData" @dblclick="moveLeft">
          <option v-for="(item, index) in props.rightData" :value="item" :key="item.id">
            {{ item.name }}
          </option>
        </select>
      </div>
    </div>
  </template>
  
<script setup>
import { defineEmits } from 'vue';
let leftSelectedData = []
let rightSelectedData = []
const emit = defineEmits(['onChangeList'])
const props = defineProps({
    leftLabel: {
        type: String,
        required: true
    },
    rightLabel: {
        type: String,
        required: true
    },
    leftData: {
        type: Array,
        required: true
    },
    rightData: {
        type: Array,
        required: true
    }
})

function moveLeft() {
    if (!rightSelectedData.length) return;
    for (let i = rightSelectedData.length; i > 0; i--) {
        let idx = props.rightData.indexOf(rightSelectedData[i - 1]);
        props.rightData.splice(idx, 1);
        props.leftData.push(rightSelectedData[i - 1]);
        rightSelectedData.pop();
    }
    let leftData = props.leftData
    let rightData = props.rightData
    emit("onChangeList", {
        leftData,
        rightData
    });
}

function moveRight() {
    if (!leftSelectedData.length) return;
    for (let i = leftSelectedData.length; i > 0; i--) {
        let idx = props.leftData.indexOf(leftSelectedData[i - 1]);
        props.leftData.splice(idx, 1);
        props.rightData.push(leftSelectedData[i - 1]);
        leftSelectedData.pop();
    }
    let leftData = props.leftData
    let rightData = props.rightData
    emit("onChangeList", {
        leftData,
        rightData
    })
}


</script>
  
<style scoped>
.container {
    display: flex;
    justify-content: space-around;
    align-items: stretch; /* Updated alignment for better consistency */
}

.panel {
    flex: 1;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    background-color: #fff; /* Added a background color for consistency */
}

.panel h2 {
    font-size: 1.5rem;
    margin-bottom: 10px;
    color: #333; /* Adjusted text color for better readability */
}

.form-select {
    height: 200px;
    width: 100%;
    border: 1px solid #ccc; /* Added border for a cleaner look */
}

.middle {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.btn {
    width: 100%;
    padding: 10px;
    background-color: #3498db;
    color: #fff;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-top: 15px; /* Adjusted margin for better spacing */
}

.btn i {
    margin-right: 5px; /* Added margin to create space between icon and text */
}

.btn:hover {
    background-color: #2980b9;
}

@media (max-width: 768px) {
    .container {
        flex-direction: column; /* Stack panels vertically on smaller screens */
    }

    .panel,
    .middle {
        margin-bottom: 15px; /* Added margin between panels and buttons on smaller screens */
    }
}
</style>
