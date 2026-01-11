oldApk.style.display = "inline-block";
newApk.style.display = "inline-block";
webApp.style.display = "inline-block";

function  downloadAPK(url) {
  loader.style.display = "flex";

  let startTime = Date.now();

  let ring = document.getElementById("progressRing");
  let radius = 54;
  let circumference = 2 * Math.PI * radius;
  ring.style.strokeDasharray = circumference;
  ring.style.strokeDashoffset = circumference;

  function setProgress(percent) {
    let offset = circumference - (percent / 100) * circumference;
    ring.style.strokeDashoffset = offset;
  }

  let xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.responseType = "blob";

  xhr.onprogress = function (e) {
    if (e.lengthComputable) {
      let percent = Math.floor((e.loaded / e.total) * 100);

      loaderPercent.textContent = percent + "%";
      setProgress(percent);

      // الحجم
      let loadedMB = (e.loaded / 1024 / 1024).toFixed(2);
      let totalMB = (e.total / 1024 / 1024).toFixed(2);
      loaderSize.textContent = loadedMB + " MB / " + totalMB + " MB";

      // السرعة
      let seconds = (Date.now() - startTime) / 1000;
      let speed = e.loaded / seconds;
      let speedKB = speed / 1024;

      if (speedKB > 1024) {
        loaderSpeed.textContent = (speedKB / 1024).toFixed(2) + " MB/s";
      } else {
        loaderSpeed.textContent = Math.round(speedKB) + " KB/s";
      }

      // تحذير البطء
      if (speedKB < 50) {
        slowMsg.style.display = "block";
      } else {
        slowMsg.style.display = "none";
      }
    }
  };

  xhr.onload = function () {
    loaderPercent.textContent = "100%";
    setProgress(100);

    let blob = xhr.response;
    let fileName = url.split("/").pop();

    let a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    setTimeout(() => {
      loader.style.display = "none";
    }, 1200);
  };

  xhr.onerror = function () {
    alert("❌ حدث خطأ أثناء التحميل");
    loader.style.display = "none";
  };

  xhr.send();
}/* ===== إظهار العناصر عند التمرير ===== */
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  for (let i = 0; i < reveals.length; i++) {
    const windowHeight = window.innerHeight;
    const elementTop = reveals[i].getBoundingClientRect().top;
    const elementVisible = 120;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    }
  }
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);
/* ===== Ripple Effect عند الضغط على الأزرار ===== */
document.querySelectorAll(".btn").forEach(btn => {
  btn.addEventListener("click", function (e) {
    const circle = document.createElement("span");
    const diameter = Math.max(this.clientWidth, this.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - this.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${e.clientY - this.getBoundingClientRect().top - radius}px`;
    circle.classList.add("ripple");

    const ripple = this.getElementsByClassName("ripple")[0];
    if (ripple) {
      ripple.remove();
    }

    this.appendChild(circle);
  });
});
/* ===== معرض الصور ===== */
const images = document.querySelectorAll(".feature-card img");
let current = 0;

const imageModal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");

function openImage(i) {
  current = i;
  modalImg.src = images[i].src;
  imageModal.style.display = "flex";
}

function closeImage() {
  imageModal.style.display = "none";
}

function changeImage(step) {
  current = (current + step + images.length) % images.length;
  modalImg.src = images[current].src;
}
function toggleMenu() {
  const menu = document.getElementById("menuDropdown");
  menu.style.display = (menu.style.display === "block") ? "none" : "block";
}

function shareApp() {
  const url = window.location.href;

  if (navigator.share) {
    navigator.share({
      title: "المكلا تيليكوم",
      text: "حمّل تطبيق المكلا تيليكوم",
      url: url
    });
  } else {
    copyLink();
    alert("تم نسخ الرابط للمشاركة");
  }
}

function copyLink() {
  const url = window.location.href;
  navigator.clipboard.writeText(url);
}
function toggleMenu() {
  const menu = document.getElementById("menuDropdown");
  menu.style.display = (menu.style.display === "block") ? "none" : "block";
}

// مشاركة التطبيق
function shareApp() {
  const url = window.location.href;

  if (navigator.share) {
    navigator.share({
      title: document.title,
      text: "حمل تطبيق المكلا تيليكوم",
      url: url
    });
  } else {
    copyLink();
  }
}

// نسخ الرابط
function copyLink() {
  const url = window.location.href;

  navigator.clipboard.writeText(url).then(() => {
    showToast("✅ تم نسخ الرابط بنجاح");
  });
}
function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.innerText = msg;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
                              }
