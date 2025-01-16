<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { ColladaLoader } from "three/addons/loaders/ColladaLoader.js";
onMounted(() => {
  init();
  animate();
  container = document.getElementById("container");
  container.appendChild(renderer.domElement);
  container.addEventListener("mousemove", onDocumentMouseMove, false);
  //esc删除绘制
  window.addEventListener("keydown", handleKeyDown);
});
onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyDown);
});
function handleKeyDown(event) {
  if (event.key === "Escape") {
    escape();
  }
}

let container;
const scene = new THREE.Scene();
const boxWidth = 1000;
const boxHeight = 600;
const camera = new THREE.OrthographicCamera(
  boxWidth / -2,
  boxWidth / 2,
  boxHeight / 2,
  boxHeight / -2,
  1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(1000, 600);
const controls = new OrbitControls(camera, renderer.domElement);

//测距的射线
const raycaster = new THREE.Raycaster();
let intersects;
//测厚度的射线
let intersects1;
const raycaster1 = new THREE.Raycaster();

const mouse = new THREE.Vector2();

// var objMesh = null;
// const explodeValue = ref(0);

const init = () => {
  const axisHelper = new THREE.AxesHelper(200);
  scene.add(axisHelper);
  const point = new THREE.PointLight(0xffffff, 400, 0, 1);
  point.position.set(300, 400, 300);
  const ambient = new THREE.AmbientLight(0x444444, 5);
  scene.add(ambient);
  scene.add(point);
  camera.position.set(150, 65, 150);
  camera.lookAt(scene.position);
  const loadingManager = new THREE.LoadingManager(function () {});
  const loader = new ColladaLoader(loadingManager);
  loader.load("/src/assets/threeDemo/girl/elf.dae", function (collada) {
    // objMesh = collada.scene;
    // initExplodeModel(collada);
    const model = collada.scene;
    model.scale.set(20, 20, 20);
    model.rotation.z = 1;
    scene.add(model);
    render();
  });

  renderer.domElement.addEventListener("click", onClick, false);
};

function WorldtoScreenPosition(pos) {
  const worldVector = new THREE.Vector3(pos.x, pos.y, pos.z);
  const standardVector = worldVector.project(camera);
  const widthHalf = boxWidth / 2;
  const heightHalf = boxHeight / 2;
  return {
    x: Math.round(standardVector.x * widthHalf + widthHalf),
    y: Math.round(-standardVector.y * heightHalf + heightHalf),
    z: 1
  };
}

// function getWorldCenterPosition(box, scalar = 0.5) {
//   return new THREE.Vector3()
//     .addVectors(box.max, box.min)
//     .multiplyScalar(scalar);
// }

// 初始化爆炸数据保存到每个mesh的userdata上
// function initExplodeModel(modelObject) {
//   if (!modelObject) return;
//   // 计算模型中心
//   const explodeBox = new THREE.Box3();
//   explodeBox.setFromObject(modelObject);
//   const explodeCenter = getWorldCenterPosition(explodeBox);

//   const meshBox = new THREE.Box3();

//   // 遍历整个模型，保存数据到userData上，以便爆炸函数使用
//   modelObject.traverse(function (value) {
//     if (value.isMark || value.isMarkChild || value.isLine || value.isSprite)
//       return;
//     if (value.isMesh) {
//       meshBox.setFromObject(value);
//       const meshCenter = getWorldCenterPosition(meshBox);
//       // 爆炸方向
//       value.userData.worldDir = new THREE.Vector3()
//         .subVectors(meshCenter, explodeCenter)
//         .normalize();
//       // 爆炸距离 mesh中心点到爆炸中心点的距离
//       value.userData.worldDistance = new THREE.Vector3().subVectors(
//         meshCenter,
//         explodeCenter
//       );
//       // 原始坐标
//       value.userData.originPosition = value.getWorldPosition(
//         new THREE.Vector3()
//       );
//       // mesh中心点
//       value.userData.meshCenter = meshCenter.clone();
//       value.userData.explodeCenter = explodeCenter.clone();
//     }
//   });
// }

// function explodeChange() {
//   explodeModel(objMesh, explodeValue.value);
//   render();
// }

// function explodeModel(model, scalar) {
//   model.traverse(function (value) {
//     if (!value.isMesh || !value.userData.originPosition) return;
//     const distance = value.userData.worldDir
//       .clone()
//       .multiplyScalar(value.userData.worldDistance.length() * scalar);
//     const offset = new THREE.Vector3().subVectors(
//       value.userData.meshCenter,
//       value.userData.originPosition
//     );
//     const center = value.userData.meshCenter;
//     const newPos = new THREE.Vector3().copy(center).add(distance).sub(offset);
//     const localPosition = value.parent?.worldToLocal(newPos.clone());
//     localPosition && value.position.copy(localPosition);
//   });
// }

const isDistance = ref(false);
const isRadius = ref(false);
const isThickness = ref(false);

//---------------------------------------------测距功能实现
let lineId = 0;
let drawingLine = false;
let markers = {}; // {1:[],2:[]}
let textDoms = {};
let pointsDom = {};

let radiusPointsDom = {};
let radiusMarkers = {};
let radiusRing = [];
let points = [];
let pointId = 0;
let radiuslineId = 0;
let angleDom = {};

let thicknessPointsDom = {};
let thicknessTextDom = {};
let thicknessMarkers = {};
let thicknessId = 0;

let isDistanceActive = false;
let isThicknessActive = false;
let isRadiusActive = false;

//清除没画完的线
function escape() {
  if (drawingLine && isDistanceActive) {
    [...textDoms[lineId], ...pointsDom[lineId]].forEach(item => item.remove());
    markers[lineId].forEach(item => scene.remove(item));
    drawingLine = false;
  } else if (drawingLine && isRadiusActive) {
    [...radiusPointsDom[radiuslineId]].forEach(item => item.remove()),
      [...angleDom[radiuslineId]].forEach(item => item.remove());
    radiusMarkers[radiuslineId].forEach(item => {
      scene.remove(item);
    });
    points = [];
    pointId = 0;
    drawingLine = false;
  }
}

function distance() {
  escape();
  isDistanceActive = !isDistanceActive;
  isThicknessActive = false;
  isRadiusActive = false;
  isDistance.value = !isDistance.value;
  isRadius.value = false;
  isThickness.value = false;
  if (isDistance.value) {
    renderer.domElement.style.cursor = "crosshair";
  } else {
    renderer.domElement.style.cursor = "unset";
  }
}

function thickness() {
  escape();
  isThicknessActive = !isThicknessActive;
  isDistanceActive = false;
  isRadiusActive = false;
  isThickness.value = !isThickness.value;
  isRadius.value = false;
  isDistance.value = false;
  if (isThickness.value) {
    renderer.domElement.style.cursor = "crosshair";
  } else {
    renderer.domElement.style.cursor = "unset";
  }
}

function radius() {
  escape();
  isRadiusActive = !isRadiusActive;
  isDistanceActive = false;
  isThicknessActive = false;
  isRadius.value = !isRadius.value;
  isThickness.value = false;
  isDistance.value = false;
  if (isRadius.value) {
    renderer.domElement.style.cursor = "crosshair";
  } else {
    renderer.domElement.style.cursor = "unset";
  }
}
//测距线段移除
function distanceRemove() {
  for (let i in textDoms) {
    [...textDoms[i]].forEach(item => item.remove());
  }
  for (let i in pointsDom) {
    [...pointsDom[i]].forEach(item => item.remove());
  }
  for (let i in markers) {
    markers[i].forEach(item => {
      scene.remove(item);
    });
  }
  lineId = 0;
  markers = {};
  textDoms = {};
  pointsDom = {};
  drawingLine = false;
}

function thicknessRemove() {
  if (thicknessId) {
    [...thicknessPointsDom[0], ...thicknessTextDom[0]].forEach(item =>
      item.remove()
    ),
      thicknessMarkers[0].forEach(item => {
        scene.remove(item);
      });
    thicknessId = 0;
  }
}
//测半径线段移除
function radiusRemove() {
  for (let i in radiusPointsDom) {
    [...radiusPointsDom[i]].forEach(item => item.remove());
  }
  for (let i in angleDom) {
    [...angleDom[i]].forEach(item => item.remove());
  }
  for (let i in radiusMarkers) {
    radiusMarkers[i].forEach(item => {
      scene.remove(item);
    });
  }
  radiusRing.forEach(item => {
    scene.remove(item);
  });
  radiusRing = [];
  radiusMarkers = {};
  radiusPointsDom = {};
  angleDom = {};
  points = [];
  pointId = 0;
  radiuslineId = 0;
  drawingLine = false;
}

function removeAllBtn() {
  distanceRemove();
  radiusRemove();
  thicknessRemove();
}

function onClick() {
  if (isDistanceActive) {
    //实现测距功能
    raycaster.setFromCamera(mouse, camera);
    intersects = raycaster.intersectObjects(scene.children);
    if (intersects.length === 0) {
      intersects = raycaster.intersectObjects(scene.children[3].children);
    }
    if (intersects.length === 0) return;
    if (!drawingLine) {
      //加入距离文字
      let text1 = document.createElement("span");
      text1.style.position = "absolute";
      text1.style.top = "0";
      text1.style.color = "#efdbff";
      text1.style.pointerEvents = "none";
      let text2 = text1.cloneNode();
      container.appendChild(text1);
      container.appendChild(text2);
      textDoms[lineId] = [text1, text2];

      //加入2d的点
      let point2d1 = document.createElement("div");
      point2d1.style.position = "absolute";
      point2d1.style.width = "5px";
      point2d1.style.height = "5px";
      point2d1.style.borderRadius = "50%";
      point2d1.style.pointerEvents = "none";
      point2d1.style.cursor = "pointer";
      point2d1.style.transform = "translate(-50%,-50%)";
      point2d1.style.top = "0";
      point2d1.style.background = "#d3adf7";
      let point2d2 = point2d1.cloneNode();
      container.appendChild(point2d1);
      container.appendChild(point2d2);
      pointsDom[lineId] = [point2d1, point2d2];

      //加入3d中的两圆球
      let marker1 = new THREE.Mesh(
        new THREE.SphereGeometry(30, 10, 20),
        new THREE.MeshBasicMaterial({
          color: 0xefdbff
        })
      );
      let marker2 = marker1.clone();
      markers[lineId] = [marker1, marker2];
      // scene.add(marker1, marker2);
      const geometry = new THREE.BufferGeometry().setFromPoints([
        intersects[0].point,
        intersects[0].point.clone()
      ]);
      let line = new THREE.LineSegments(
        geometry,
        new THREE.LineDashedMaterial({
          color: 0xefdbff,
          transparent: true,
          depthTest: false
        })
      );

      line.frustumCulled = false;
      markers[lineId].push(line);
      scene.add(line);

      marker1.lineId = marker2.lineId = line.lineId = lineId;
      drawingLine = true;

      let cacheId = lineId;
      line.onBeforeRender = function () {
        const positions = line.geometry.attributes.position.array;
        const v0 = new THREE.Vector3(positions[0], positions[1], positions[2]);
        const v1 = new THREE.Vector3(positions[3], positions[4], positions[5]);
        const distance = v0.distanceTo(v1);
        let [text1, text2] = textDoms[cacheId];
        text1.innerHTML = distance.toFixed(2);
        text2.innerHTML = distance.toFixed(2);

        let point1 = new THREE.Vector3().lerpVectors(v0, v1, 0);
        let point2 = new THREE.Vector3().lerpVectors(v0, v1, 1);
        point1 = WorldtoScreenPosition(point1);
        point2 = WorldtoScreenPosition(point2);
        text1.style.left = point1.x + "px";
        text1.style.top = point1.y + 5 + "px";
        text2.style.left = point2.x + "px";
        text2.style.top = point2.y + 5 + "px";

        let [point2d1, point2d2] = pointsDom[cacheId];
        point1 = WorldtoScreenPosition(v0);
        point2 = WorldtoScreenPosition(v1);
        point2d1.style.left = point1.x + "px";
        point2d1.style.top = point1.y + "px";
        point2d2.style.left = point2.x + "px";
        point2d2.style.top = point2.y + "px";

        //let [marker1, marker2] = markers[cacheId];
        // marker1.position.set(v0);
        // marker2.position.set(v1);
      };
    } else {
      let line = markers[lineId][2];
      //保存旧的material
      line.oldMaterial = line.material;
      //虚线变实线
      line.material = new THREE.LineBasicMaterial({
        color: 0xefdbff,
        transparent: true,
        depthTest: false
      });

      updateLinePoint(line, intersects[0].point, 3);
      let [point2d1, point2d2] = pointsDom[lineId];
      point2d1.style.pointerEvents = "unset";
      point2d2.style.pointerEvents = "unset";
      draggablePoint(point2d1, lineId);
      draggablePoint(point2d2, lineId);

      lineId++;
      drawingLine = false;
    }
  } else if (isThicknessActive) {
    //实现厚度的测量
    raycaster.setFromCamera(mouse, camera);
    intersects = raycaster.intersectObjects(scene.children);
    if (intersects.length === 0) {
      intersects = raycaster.intersectObjects(scene.children[3].children);
    }
    if (intersects.length === 0) return;
    if (thicknessId) {
      [...thicknessPointsDom[0], ...thicknessTextDom[0]].forEach(item =>
        item.remove()
      ),
        thicknessMarkers[0].forEach(item => {
          scene.remove(item);
        });
      thicknessId = 0;
    }

    let point2d0 = document.createElement("div");
    point2d0.style.position = "absolute";
    point2d0.style.width = "5px";
    point2d0.style.height = "5px";
    point2d0.style.borderRadius = "50%";
    point2d0.style.pointerEvents = "none";
    point2d0.style.cursor = "pointer";
    point2d0.style.transform = "translate(-50%,-50%)";
    point2d0.style.top = "0";
    point2d0.style.background = "#d3adf7";

    let thicknessText = document.createElement("span");
    thicknessText.style.position = "absolute";
    thicknessText.style.top = "0";
    thicknessText.style.color = "#efdbff";
    thicknessText.style.pointerEvents = "none";

    container.appendChild(point2d0);
    container.appendChild(thicknessText);
    const dircetion = new THREE.Vector3(
      -intersects[0].face.normal.x,
      -intersects[0].face.normal.y,
      -intersects[0].face.normal.z
    );
    raycaster1.set(intersects[0].point, dircetion);
    intersects1 = raycaster1.intersectObjects(scene.children);
    if (intersects1.length === 0) {
      intersects1 = raycaster1.intersectObjects(
        scene.children[3].children,
        false
      );
    }
    if (intersects1.length === 0) return;
    let distance1;
    if (intersects1[0].distance >= 0.001) {
      distance1 = intersects1[0].distance;
    } else {
      distance1 = intersects1[1].distance;
    }

    let thicknessMarker = new THREE.Mesh(
      new THREE.SphereGeometry(0.01, 10, 20),
      new THREE.MeshBasicMaterial({
        color: "#d3adf7"
      })
    );
    thicknessMarker.frustumCulled = false;
    let positions;
    thicknessPointsDom[0] = [point2d0];
    thicknessTextDom[0] = [thicknessText];
    thicknessMarkers[0] = [];
    thicknessMarkers[0].push(thicknessMarker);
    thicknessMarker.position.set(
      intersects[0].point.x,
      intersects[0].point.y,
      intersects[0].point.z
    );
    thicknessMarker.onBeforeRender = function () {
      let [point2d0] = thicknessPointsDom[0];
      let [thicknessText] = thicknessTextDom[0];
      positions = thicknessMarker.position;
      positions = WorldtoScreenPosition(positions);
      point2d0.style.left = positions.x + "px";
      point2d0.style.top = positions.y + "px";
      thicknessText.style.left = positions.x + "px";
      thicknessText.style.top = positions.y + 5 + "px";
      thicknessText.innerHTML = distance1.toFixed(2);
    };
    scene.add(thicknessMarker);
    thicknessId++;
  } else if (isRadiusActive) {
    //实现半径的测量
    raycaster.setFromCamera(mouse, camera);
    intersects = raycaster.intersectObjects(scene.children);
    if (intersects.length === 0) return;
    let point2d0 = document.createElement("div");
    point2d0.style.position = "absolute";
    point2d0.style.width = "5px";
    point2d0.style.height = "5px";
    point2d0.style.borderRadius = "50%";
    point2d0.style.pointerEvents = "none";
    point2d0.style.cursor = "pointer";
    point2d0.style.transform = "translate(-50%,-50%)";
    point2d0.style.top = "0";
    point2d0.style.background = "#d3adf7";

    let angleText = document.createElement("span");
    angleText.style.position = "absolute";
    angleText.style.top = "0";
    angleText.style.color = "#efdbff";
    angleText.style.pointerEvents = "none";
    if (!drawingLine && pointId == 0) {
      //加入2d的点
      let point2d1 = point2d0.cloneNode();
      let angleText1 = angleText.cloneNode();
      container.appendChild(point2d1);
      container.appendChild(angleText1);
      radiusPointsDom[radiuslineId] = [point2d1];
      angleDom[radiuslineId] = [angleText1];
      let markers1 = new THREE.Mesh(
        new THREE.SphereGeometry(0.01, 10, 20),
        new THREE.MeshBasicMaterial({
          color: "#d3adf7"
        })
      );
      let positions;
      let cacheId = radiuslineId;
      markers1.position.set(
        intersects[0].point.x,
        intersects[0].point.y,
        intersects[0].point.z
      );
      markers1.onBeforeRender = function () {
        let [point2d1] = radiusPointsDom[cacheId];
        let [angleText1] = angleDom[cacheId];
        positions = markers1.position;
        positions = WorldtoScreenPosition(positions);
        point2d1.style.left = positions.x + "px";
        point2d1.style.top = positions.y + "px";
        angleText1.style.left = positions.x + "px";
        angleText1.style.top = positions.y + 5 + "px";
      };
      radiusMarkers[radiuslineId] = [];
      markers1.frustumCulled = false;
      radiusMarkers[radiuslineId].push(markers1);

      scene.add(markers1);
      points.push(intersects[0].point);

      pointId++;
      drawingLine = true;
    } else if (pointId == 1) {
      let point2d2 = point2d0.cloneNode();
      let angleText2 = angleText.cloneNode();
      container.appendChild(point2d2);
      container.appendChild(angleText2);
      radiusPointsDom[radiuslineId] = [
        ...radiusPointsDom[radiuslineId],
        point2d2
      ];
      angleDom[radiuslineId] = [...angleDom[radiuslineId], angleText2];
      let markers2 = new THREE.Mesh(
        new THREE.SphereGeometry(0.01, 10, 20),
        new THREE.MeshBasicMaterial({
          color: "#d3adf7"
        })
      );
      markers2.frustumCulled = false;
      radiusMarkers[radiuslineId].push(markers2);
      let positions;
      let cacheId = radiuslineId;
      markers2.position.set(
        intersects[0].point.x,
        intersects[0].point.y,
        intersects[0].point.z
      );
      markers2.onBeforeRender = function () {
        let [point2d1, point2d2] = radiusPointsDom[cacheId];
        let [angleText1, angleText2] = angleDom[cacheId];
        positions = markers2.position;
        positions = WorldtoScreenPosition(positions);
        point2d2.style.left = positions.x + "px";
        point2d2.style.top = positions.y + "px";
        angleText2.style.left = positions.x + "px";
        angleText2.style.top = positions.y + 5 + "px";
      };
      scene.add(markers2);
      points.push(intersects[0].point);
      pointId++;
    } else {
      let point2d3 = point2d0.cloneNode();
      let angleText3 = angleText.cloneNode();
      container.appendChild(point2d3);
      container.appendChild(angleText3);
      radiusPointsDom[radiuslineId] = [
        ...radiusPointsDom[radiuslineId],
        point2d3
      ];
      angleDom[radiuslineId] = [...angleDom[radiuslineId], angleText3];
      let markers3 = new THREE.Mesh(
        new THREE.SphereGeometry(0.01, 10, 20),
        new THREE.MeshBasicMaterial({
          color: "#d3adf7"
        })
      );
      markers3.frustumCulled = false;
      radiusMarkers[radiuslineId].push(markers3);
      let positions;
      let cacheId = radiuslineId;
      markers3.position.set(
        intersects[0].point.x,
        intersects[0].point.y,
        intersects[0].point.z
      );
      markers3.onBeforeRender = function () {
        let [point2d1, point2d2, point2d3] = radiusPointsDom[cacheId];
        let [angleText1, angleText2, angleText3] = angleDom[cacheId];
        positions = markers3.position;
        positions = WorldtoScreenPosition(positions);
        point2d3.style.left = positions.x + "px";
        point2d3.style.top = positions.y + "px";
        angleText3.style.left = positions.x + "px";
        angleText3.style.top = positions.y + 5 + "px";
      };
      scene.add(markers3);
      points.push(intersects[0].point);

      let geometry = new THREE.BufferGeometry().setFromPoints([
        points[0],
        points[1],
        points[2],
        points[0]
      ]);
      let triangleLine = new THREE.Line(
        geometry,
        new THREE.LineBasicMaterial({
          color: 0xefdbff,
          transparent: true
        })
      );
      radiusMarkers[radiuslineId].push(triangleLine);
      scene.add(triangleLine);

      let l10 = new THREE.Vector3().subVectors(points[1], points[0]);
      let l20 = new THREE.Vector3().subVectors(points[2], points[0]);
      let l21 = new THREE.Vector3().subVectors(points[2], points[1]);
      let a = l10.length();
      let b = l20.length();
      let c = l21.length();
      let triangle = new THREE.Triangle(points[0], points[1], points[2]);
      let s = triangle.getArea();
      let radius = (a * b * c) / 4 / s;

      document.getElementById("radius").innerHTML = radius.toFixed(2);

      triangleLine.onBeforeRender = function () {
        let angle0 =
          (Math.acos((a * a + b * b - c * c) / (2 * a * b)) * 180) / Math.PI;
        let angle1 =
          (Math.acos((a * a + c * c - b * b) / (2 * a * c)) * 180) / Math.PI;
        let angle2 = 180 - angle0 - angle1;
        let [angleText1, angleText2, angleText3] = angleDom[cacheId];
        angleText1.innerHTML = angle0.toFixed(2) + "°";
        angleText2.innerHTML = angle1.toFixed(2) + "°";
        angleText3.innerHTML = angle2.toFixed(2) + "°";
      };

      let [listenPoint1, listenPoint2, listenPoint3] = radiusPointsDom[cacheId];
      listenPoint1.style.pointerEvents = "unset";
      listenPoint2.style.pointerEvents = "unset";
      listenPoint3.style.pointerEvents = "unset";
      draggableRadiusPoint(listenPoint1, radiuslineId, 0);
      draggableRadiusPoint(listenPoint2, radiuslineId, 1);
      draggableRadiusPoint(listenPoint3, radiuslineId, 2);
      addRingGeometry(
        triangle,
        points[0],
        points[1],
        points[2],
        radiuslineId,
        "add",
        radius
      );
      pointId = 0;
      radiuslineId++;
      drawingLine = false;
      points = [];
    }
  }
}

function addRingGeometry(
  triangle,
  point0,
  point1,
  point2,
  radiuslineId,
  type,
  radius
) {
  let x1 = point0.x;
  let y1 = point0.y;
  let z1 = point0.z;

  let x2 = point1.x;
  let y2 = point1.y;
  let z2 = point1.z;

  let x3 = point2.x;
  let y3 = point2.y;
  let z3 = point2.z;

  let a1 = y1 * z2 - y2 * z1 - y1 * z3 + y3 * z1 + y2 * z3 - y3 * z2;
  let b1 = -(x1 * z2 - x2 * z1 - x1 * z3 + x3 * z1 + x2 * z3 - x3 * z2);
  let c1 = x1 * y2 - x2 * y1 - x1 * y3 + x3 * y1 + x2 * y3 - x3 * y2;
  let d1 = -(
    x1 * y2 * z3 -
    x1 * y3 * z2 -
    x2 * y1 * z3 +
    x2 * y3 * z1 +
    x3 * y1 * z2 -
    x3 * y2 * z1
  );
  let a2 = 2 * (x2 - x1);
  let b2 = 2 * (y2 - y1);
  let c2 = 2 * (z2 - z1);
  let d2 = x1 * x1 + y1 * y1 + z1 * z1 - x2 * x2 - y2 * y2 - z2 * z2;
  let a3 = 2 * (x3 - x1);
  let b3 = 2 * (y3 - y1);
  let c3 = 2 * (z3 - z1);
  let d3 = x1 * x1 + y1 * y1 + z1 * z1 - x3 * x3 - y3 * y3 - z3 * z3;
  let x =
    -(
      b1 * c2 * d3 -
      b1 * c3 * d2 -
      b2 * c1 * d3 +
      b2 * c3 * d1 +
      b3 * c1 * d2 -
      b3 * c2 * d1
    ) /
    (a1 * b2 * c3 -
      a1 * b3 * c2 -
      a2 * b1 * c3 +
      a2 * b3 * c1 +
      a3 * b1 * c2 -
      a3 * b2 * c1);
  let y =
    (a1 * c2 * d3 -
      a1 * c3 * d2 -
      a2 * c1 * d3 +
      a2 * c3 * d1 +
      a3 * c1 * d2 -
      a3 * c2 * d1) /
    (a1 * b2 * c3 -
      a1 * b3 * c2 -
      a2 * b1 * c3 +
      a2 * b3 * c1 +
      a3 * b1 * c2 -
      a3 * b2 * c1);
  let z =
    -(
      a1 * b2 * d3 -
      a1 * b3 * d2 -
      a2 * b1 * d3 +
      a2 * b3 * d1 +
      a3 * b1 * d2 -
      a3 * b2 * d1
    ) /
    (a1 * b2 * c3 -
      a1 * b3 * c2 -
      a2 * b1 * c3 +
      a2 * b3 * c1 +
      a3 * b1 * c2 -
      a3 * b2 * c1);
  const v4 = new THREE.Vector3(0, 0, 0);
  triangle.getNormal(v4);
  const circleGeometry = new THREE.RingGeometry(radius, radius + 1, 32);
  circleGeometry.lookAt(v4);
  circleGeometry.translate(x, y, z);

  // 创建材质
  const material = new THREE.MeshBasicMaterial({
    color: 0xefdbff,
    side: THREE.DoubleSide
  });
  // 创建圆并添加到场景
  const circle1 = new THREE.Mesh(circleGeometry, material);
  if (type == "add") {
    radiusRing.push(circle1);
    scene.add(circle1);
  } else {
    scene.remove(radiusRing[radiuslineId]);
    radiusRing[radiuslineId] = circle1;
    scene.add(circle1);
  }
}

function onDocumentMouseMove(event) {
  if (event.target.id != "input") {
    event.preventDefault();
    const rendererDomElement = renderer.domElement;

    const rect = rendererDomElement.getBoundingClientRect();

    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    mouse.x = (mouseX / rect.width) * 2 - 1;
    mouse.y = -(mouseY / rect.height) * 2 + 1;
    if (drawingLine && isDistanceActive) {
      raycaster.setFromCamera(mouse, camera);
      intersects = raycaster.intersectObjects(scene.children);
      if (intersects.length === 0) {
        intersects = raycaster.intersectObjects(scene.children[3].children);
      }
      if (intersects.length === 0) return;
      let line = markers[lineId][2];
      line.computeLineDistances();
      updateLinePoint(line, intersects[0].point, 3);
    }
  }
}

function draggablePoint(el, id) {
  let timeId = null;
  let index = pointsDom[id].findIndex(item => item === el);
  let line = markers[id][2];
  el.addEventListener("mousedown", e => {
    timeId = setTimeout(() => {
      changeMaterial(line);
      //变虚线
      timeId = null;
      //长按监听移动
      container.addEventListener("mousemove", handlePointMove);
    }, 100);
    container.addEventListener("mouseup", handlePointUp);
  });
  function handlePointMove() {
    //打出射线
    raycaster.setFromCamera(mouse, camera);
    intersects = raycaster.intersectObjects(scene.children);
    if (intersects.length === 0) {
      intersects = raycaster.intersectObjects(scene.children[3].children);
    }
    //排除含有
    // intersects = intersects.filter(item => !(item.object));
    if (intersects.length === 0) return;
    //变更线段两端点的位置
    let arrayStart = index && 3;
    updateLinePoint(line, intersects[0].point, arrayStart);
  }

  function handlePointUp() {
    if (timeId) {
      clearTimeout(timeId);
      timeId = null;
    } else {
      changeMaterial(line);
    }
    container.removeEventListener("mouseup", handlePointUp);
    container.removeEventListener("mousemove", handlePointMove);
  }
}

function changeMaterial(object3d) {
  let temp = object3d.oldMaterial;
  object3d.oldMaterial = object3d.material;
  object3d.material = temp;
}

function updateLinePoint(line, point, arrayIndex) {
  const positions = line.geometry.attributes.position.array;
  positions[arrayIndex] = point.x;
  positions[arrayIndex + 1] = point.y;
  positions[arrayIndex + 2] = point.z;
  line.geometry.attributes.position.needsUpdate = true;
}

function draggableRadiusPoint(el, id, index) {
  let timeId = null;
  let line = radiusMarkers[id][3];
  let point = radiusMarkers[id][index];
  el.addEventListener("mousedown", e => {
    timeId = setTimeout(() => {
      //变虚线
      timeId = null;
      //长按监听移动
      container.addEventListener("mousemove", handleRadiusPointMove);
    }, 100);
    container.addEventListener("mouseup", handleRadiusPointUp);
  });
  function handleRadiusPointMove() {
    //打出射线
    raycaster.setFromCamera(mouse, camera);
    intersects = raycaster.intersectObjects(scene.children);
    if (intersects.length === 0) {
      intersects = raycaster.intersectObjects(scene.children[3].children);
    }
    //排除含有
    // intersects = intersects.filter(item => !(item.object));
    if (intersects.length === 0) return;
    updateLineRadiusPoint(line, intersects[0].point, index * 3, point, id);
  }

  function handleRadiusPointUp() {
    if (timeId) {
      clearTimeout(timeId);
      timeId = null;
    }
    container.removeEventListener("mouseup", handleRadiusPointUp);
    container.removeEventListener("mousemove", handleRadiusPointMove);
  }
}

function updateLineRadiusPoint(line, point, arrayIndex, points, id) {
  const position1 = points.position;
  position1.x = point.x;
  position1.y = point.y;
  position1.z = point.z;
  const positions = line.geometry.attributes.position.array;
  positions[arrayIndex] = point.x;
  positions[arrayIndex + 1] = point.y;
  positions[arrayIndex + 2] = point.z;
  if (arrayIndex == 0) {
    positions[9] = point.x;
    positions[10] = point.y;
    positions[11] = point.z;
  }
  line.geometry.attributes.position.needsUpdate = true;
  let point0 = new THREE.Vector3(positions[0], positions[1], positions[2]);
  let point1 = new THREE.Vector3(positions[3], positions[4], positions[5]);
  let point2 = new THREE.Vector3(positions[6], positions[7], positions[8]);
  let l10 = new THREE.Vector3().subVectors(point1, point0);
  let l20 = new THREE.Vector3().subVectors(point2, point0);
  let l21 = new THREE.Vector3().subVectors(point2, point1);
  let a = l10.length();
  let b = l20.length();
  let c = l21.length();
  let triangle = new THREE.Triangle(point0, point1, point2);
  let s = triangle.getArea();
  let radius = (a * b * c) / 4 / s;
  document.getElementById("radius").innerHTML = radius.toFixed(2);
  line.onBeforeRender = function () {
    let angle0 =
      (Math.acos((a * a + b * b - c * c) / (2 * a * b)) * 180) / Math.PI;
    let angle1 =
      (Math.acos((a * a + c * c - b * b) / (2 * a * c)) * 180) / Math.PI;
    let angle2 = 180 - angle0 - angle1;
    let [angleText1, angleText2, angleText3] = angleDom[id];
    angleText1.innerHTML = angle0.toFixed(2) + "°";
    angleText2.innerHTML = angle1.toFixed(2) + "°";
    angleText3.innerHTML = angle2.toFixed(2) + "°";
  };
  addRingGeometry(triangle, point0, point1, point2, id, "update", radius);
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  render();
}

function render() {
  renderer.render(scene, camera);
}
</script>

<template>
  <div class="flex w-[1200px]">
    <div id="container" class="w-[1000px] h-[600px] relative" />
    <div class="w-50 flex flex-col justify-start">
      <el-button type="primary" @click="distance"> 测距 </el-button>
      <el-button type="primary" @click="radius">
        半径<span id="radius" />
      </el-button>

      <el-dropdown>
        <el-button type="primary">清除</el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="distanceRemove"
              >清除测距</el-dropdown-item
            >
            <el-dropdown-item @click="radiusRemove">清除半径</el-dropdown-item>
            <el-dropdown-item @click="removeAllBtn">全部清除</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style scoped>
.el-button {
  width: 100px;
  margin-bottom: 20px;
  margin-left: 10px;
}
</style>
<!-- 厚度测试功能有待测试
<el-dropdown-item @click="thicknessRemoveBtn"
>清除厚度</el-dropdown-item
>
<el-button @click="thickness"> 厚度 </el-button>   
<el-slider
:max="10"
:step="0.1"
:style="{
  width: '150px'
}"
v-model="explodeValue"
@input="explodeChange()"
/> -->
