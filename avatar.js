// The hero's 3D figure. The still image shows first; the model loads once the
// page is idle, then swaps in. Drag or use the arrow keys to turn it.
// "three" and "three/addons/" resolve through the import map in index.html.

const stage = document.querySelector("[data-avatar]");
const canvas = stage && stage.querySelector("canvas");
const toggle = document.querySelector("[data-avatar-toggle]");

function canRender() {
  if (!stage || !canvas) return false;
  if (navigator.connection && navigator.connection.saveData) return false;
  try {
    const probe = document.createElement("canvas");
    return !!(probe.getContext("webgl2") || probe.getContext("webgl"));
  } catch {
    return false;
  }
}

async function start() {
  const [THREE, { GLTFLoader }, { MeshoptDecoder }] = await Promise.all([
    import("three"),
    import("three/addons/loaders/GLTFLoader.js"),
    import("three/addons/libs/meshopt_decoder.module.js"),
  ]);

  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, matchMedia("(max-width: 60rem)").matches ? 1.5 : 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  scene.add(new THREE.HemisphereLight(0xffffff, 0x9a958a, 2.4));
  const key = new THREE.DirectionalLight(0xffffff, 1.6);
  key.position.set(2, 4, 3);
  scene.add(key);

  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50);
  const target = new THREE.Vector3(0, 0.88, 0);
  const DIST = 3.7;

  const loader = new GLTFLoader();
  loader.setMeshoptDecoder(MeshoptDecoder);
  const gltf = await loader.loadAsync(stage.dataset.avatar);
  // Stand the model on the ground at a known height, whatever size it was exported at.
  const model = gltf.scene;
  const box = new THREE.Box3().setFromObject(model);
  const size = box.getSize(new THREE.Vector3());
  const centre = box.getCenter(new THREE.Vector3());
  const scale = 1.72 / size.y;
  model.scale.setScalar(scale);
  model.position.set(-centre.x * scale, -box.min.y * scale, -centre.z * scale);
  const figure = new THREE.Group();
  figure.add(model);
  scene.add(figure);

  const mixer = new THREE.AnimationMixer(figure);
  if (gltf.animations[0]) mixer.clipAction(gltf.animations[0]).play();
  if (reduced) mixer.setTime(0);

  function resize() {
    const w = stage.clientWidth;
    const h = stage.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  new ResizeObserver(resize).observe(stage);
  resize();

  // One horizontal turn only: the page keeps its vertical scroll on touch.
  let angle = 0;
  let spinning = !reduced;
  let dragging = false;
  let lastX = 0;
  const introFrom = -Math.PI * 2;
  const introMs = reduced ? 0 : 1600;
  const t0 = performance.now();
  const ease = (x) => Math.sqrt(1 - Math.pow(x - 1, 4));

  function setSpinning(on) {
    spinning = on;
    if (toggle) {
      toggle.textContent = on ? "Pause" : "Turn";
      toggle.setAttribute("aria-pressed", String(!on));
    }
  }
  if (toggle) {
    toggle.hidden = false;
    toggle.addEventListener("click", () => setSpinning(!spinning));
  }
  setSpinning(spinning);

  canvas.addEventListener("pointerdown", (e) => {
    dragging = true;
    lastX = e.clientX;
    canvas.setPointerCapture(e.pointerId);
    setSpinning(false);
  });
  canvas.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    angle += (e.clientX - lastX) * 0.01;
    lastX = e.clientX;
  });
  const release = () => (dragging = false);
  canvas.addEventListener("pointerup", release);
  canvas.addEventListener("pointercancel", release);
  canvas.addEventListener("keydown", (e) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    setSpinning(false);
    angle += e.key === "ArrowLeft" ? -0.25 : 0.25;
  });

  let visible = true;
  new IntersectionObserver(([entry]) => (visible = entry.isIntersecting)).observe(stage);

  const clock = new THREE.Clock();
  let hovered = false;
  canvas.addEventListener("pointerenter", () => (hovered = true));
  canvas.addEventListener("pointerleave", () => (hovered = false));

  function frame(now) {
    requestAnimationFrame(frame);
    const dt = Math.min(clock.getDelta(), 0.1);
    if (!visible || document.hidden) return;
    if (!reduced) mixer.update(dt);
    const p = introMs ? Math.min((now - t0) / introMs, 1) : 1;
    const intro = introFrom * (1 - ease(p));
    if (spinning && !dragging && !hovered && p === 1 && document.activeElement !== canvas) angle += dt * 0.35;
    figure.rotation.y = angle + intro;
    camera.position.set(target.x, target.y + 0.25, target.z + DIST);
    camera.lookAt(target);
    renderer.render(scene, camera);
  }
  requestAnimationFrame((now) => {
    frame(now);
    stage.classList.add("is-live");
  });
}

if (canRender()) {
  const go = () => start().catch((e) => { console.warn("avatar:", e); stage.classList.remove("is-live"); });
  const idle = () => (window.requestIdleCallback ? requestIdleCallback(go, { timeout: 2500 }) : setTimeout(go, 600));
  if (document.readyState === "complete") idle();
  else addEventListener("load", idle, { once: true });
}
