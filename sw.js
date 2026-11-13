const CACHE="lift-buddy-v6";
const IMGS=["./img/back_extension.jpg","./img/barbell_squat.jpg","./img/bulgarian.jpg","./img/bw_squat.jpg","./img/cable_curl.jpg","./img/cable_lateral.jpg","./img/calf_raise.jpg","./img/chest_press.jpg","./img/close_grip_pulldown.jpg","./img/crunch.jpg","./img/cs_row.jpg","./img/curl.jpg","./img/db_bench.jpg","./img/db_rdl.jpg","./img/db_squat.jpg","./img/dip.jpg","./img/face_pull.jpg","./img/glute_bridge.jpg","./img/goblet_squat.jpg","./img/hack_squat.jpg","./img/hammer_curl.jpg","./img/hanging_knee_raise.jpg","./img/hip_thrust.jpg","./img/incline_curl.jpg","./img/incline_machine_press.jpg","./img/incline_press.jpg","./img/incline_reverse_fly.jpg","./img/lat_pulldown.jpg","./img/lateral_raise.jpg","./img/leg_curl.jpg","./img/leg_ext.jpg","./img/leg_press.jpg","./img/lying_leg_curl.jpg","./img/machine_row.jpg","./img/machine_shoulder_press.jpg","./img/one_arm_row.jpg","./img/overhead_ext.jpg","./img/pallof_press.jpg","./img/pec_deck.jpg","./img/pec_fly.jpg","./img/pistol_squat.jpg","./img/plank.jpg","./img/pull_up.jpg","./img/push_up.jpg","./img/pushdown.jpg","./img/rdl.jpg","./img/reverse_cable_fly.jpg","./img/reverse_fly.jpg","./img/reverse_lunge.jpg","./img/rotary_torso.jpg","./img/seated_calf_raise.jpg","./img/seated_row.jpg","./img/shoulder_press.jpg","./img/side_plank.jpg","./img/skull_crusher.jpg","./img/smith_squat.jpg","./img/split_squat.jpg","./img/step_up.jpg","./img/tbar_row.jpg","./img/thumbs.jpg","./img/woodchop.jpg"];
const CORE=["./","./index.html","./manifest.webmanifest","./icon-192.png","./icon-512.png","./icon-maskable-512.png","./apple-touch-icon.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE).then(()=>Promise.all(IMGS.map(u=>c.add(u).catch(()=>{}))))).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
  const req=e.request; if(req.method!=="GET") return;
  if(req.url.includes("version.json")) return; // always straight from the network
  if(req.mode==="navigate"){ // newest app when online, cached app when offline
    e.respondWith(fetch(req.url,{cache:"no-store"}).then(r=>{const c=r.clone();caches.open(CACHE).then(x=>x.put("./index.html",c));return r}).catch(()=>caches.match("./index.html")));
    return;
  }
  e.respondWith(caches.match(req).then(hit=>hit||fetch(req).then(r=>{
    if(r.ok&&(new URL(req.url).origin===location.origin||req.url.startsWith("https://fonts."))){const c=r.clone();caches.open(CACHE).then(x=>x.put(req,c))}
    return r;
  })));
});
