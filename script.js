let scene, camera, renderer, cube;

function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const error = document.getElementById("login-error");

  if (username === "admin" && password === "1234") {
    document.getElementById("login-container").style.display = "none";
    document.getElementById("calculator-container").style.display = "block";
    initCube();
  } else {
    error.textContent = "Invalid username or password.";
  }
}

function calculateVolume() {
  const length = parseFloat(document.getElementById("length").value);
  const width = parseFloat(document.getElementById("width").value);
  const height = parseFloat(document.getElementById("height").value);
  const result = document.getElementById("result");

  if (isNaN(length) || isNaN(width) || isNaN(height)) {
    result.textContent = "Please enter valid numbers in all fields.";
    return;
  }

  const volume_m3 = (length * width * height) / 1_000_000_000; // mm³ to m³
  result.textContent = `Volume: ${volume_m3.toFixed(6)} m³`;

  updateCube(length, height, width);
}

function initCube() {
  const container = document.getElementById("cube-container");

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 10, 7.5);
  scene.add(light);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshPhongMaterial({
    color: 0x007bff,
    opacity: 0.8,
    transparent: true,
  });
  cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  camera.position.z = 5;

  animate();
}

function updateCube(length, height, width) {
  const scaleFactor = 100; // Convert mm to scene units
  cube.scale.set(length / scaleFactor, height / scaleFactor, width / scaleFactor);
}

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
