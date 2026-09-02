const programs = [
  [
    "Kelas Pelajar",
    "Kelas Promo",
    "Untuk pelajar.",
    "Syarat: Memiliki kartu pelajar / kartu mahasiswa",
    150000,
    [
      "Pengenalan alat jahit",
      "Mengukur badan",
      "Membuat pola",
      "Pecah pola & menggunting",
      "Menjahit dress A",
    ],
  ],
  [
    "Kelas Mama Keren",
    "Kelas Promo",
    "Untuk peserta yang ingin belajar dasar menjahit.",
    "",
    300000,
    [
      "Pengenalan alat jahit",
      "Mengukur badan",
      "Membuat pola",
      "Pecah pola & menggunting",
      "Dress A / baju tidur / gaun",
    ],
  ],
  [
    "Kelas UMKM Unggulan paket A",
    "Kelas Promo",
    "Pembuatan produk dompet.",
    "Catatan: Pola awal hanya dress A",
    450000,
    [
      "Pengenalan alat jahit",
      "Mengukur badan",
      "Membuat pola",
      "Pecah pola & menggunting",
      "Menjahit dompet, dress A dan celana",
    ],
  ],
  [
    "Kelas UMKM Unggulan paket B",
    "Kelas Promo",
    "Pembuatan dress A, tunik dan celana pendek anak.",
    "",
    600000,
    [
      "Pengenalan alat jahit",
      "Mengukur badan",
      "Membuat pola",
      "Pecah pola & menggunting",
      "Membuat buat pola Dress A, tunik dan celana pendek anak",
    ],
  ],
  [
    "Kelas Pemula Dasar",
    "Kelas Reguler",
    "Fondasi menjahit untuk pemula.",
    "",
    1000000,
    [
      "Pengenalan alat jahit",
      "Mengukur badan",
      "Membuat pola",
      "Pecah pola & menggunting",
      "menjahit pakaian jadi dress A, tunik, rok",
    ],
  ],
  [
    "Kelas Terampil",
    "Kelas Reguler",
    "Meningkatkan keterampilan pola dan jahit.",
    "",
    2500000,
    [
      "Pengenalan alat jahit",
      "Mengukur badan",
      "Membuat pola",
      "Pecah pola sebanyak 6 pola & menggunting",
      "Menjahit pakaian jadi dress A, tunik, rok,  kemeja, gaun umbrella",
      "Mendapatkan sertifikat",
    ],
  ],
  [
    "Kelas Wirausaha",
    "Kelas Reguler",
    "Persiapan keterampilan untuk usaha mandiri.",
    "",
    4000000,
    [
      "Pengenalan alat jahit",
      "Mengukur badan",
      "Membuat pola",
      "Pecah pola hingga seluruh inti pola dikuasai & mengunting",
      "Menjahit pakaian jadi dress A, tunik, rok, kemeja, gaun umbrella",
      "Mendapatkan sertifikat",
    ],
  ],
  [
    "Kelas Industri",
    "Kelas Reguler",
    "Program intensif menuju kebutuhan industri.",
    "",
    5000000,
    [
      "Pengenalan alat jahit",
      "Mengukur badan & membuat pola",
      "Mendesain pakaian & membaca desain",
      "Pecah pola hingga seluruh inti pola dikuasai & mengunting",
      "Menjahit pakaian jadi dress A, tunik, rok, kemeja, gaun umbrella, jas almamater, kebaya nikah",
      "Mempelajari teknik drapting dan Mempayet",
      "Project akhir membuat pakaian sesuai desain sendiri",
      "Magang",
      "Mendapatkan sertifikat",
      "Bonus bordir 1x tatap muka",
    ],
  ],
];

const money = (n) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n);
const grid = document.querySelector("#programGrid"),
  sel = document.querySelector("#programSelect"),
  price = document.querySelector("#price");
programs.forEach((p, i) => {
  grid.insertAdjacentHTML(
    "beforeend",
    `<article class="card"><span class="badge">${p[1]}</span><h3>${p[0]}</h3><p>${p[2]}</p>${p[3] ? `<small> ${p[3]}</small>` : ""}<ul>${p[5].map((x) => `<li>${x}</li>`).join("")}</ul><div class="price">${money(p[4])}</div><button class="btn btn-primary choose" data-i="${i}">Pilih Program</button></article>`,
  );
  sel.insertAdjacentHTML("beforeend", `<option value="${i}">${p[0]}</option>`);
});
function updatePrice() {
  price.value = money(programs[Number(sel.value)]?.[4] || 0);
}
sel.addEventListener("change", updatePrice);
updatePrice();
document.querySelectorAll(".choose").forEach((b) =>
  b.addEventListener("click", () => {
    sel.value = b.dataset.i;
    updatePrice();
    document.querySelector("#daftar").scrollIntoView({ behavior: "smooth" });
  }),
);
document
  .querySelector(".menu-btn")
  .addEventListener("click", () =>
    document.querySelector("#menu").classList.toggle("open"),
  );
document
  .querySelectorAll("#menu a")
  .forEach((a) =>
    a.addEventListener("click", () =>
      document.querySelector("#menu").classList.remove("open"),
    ),
  );

function compressImageFile(
  file,
  { maxWidth = 1200, maxHeight = 1200, quality = 0.75 } = {},
) {
  return new Promise((resolve, reject) => {
    if (
      !file ||
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf")
    ) {
      resolve(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        const ratio = Math.min(maxWidth / width, maxHeight / height, 1);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Gagal mengompres file gambar."));
              return;
            }

            const compressedFile = new File([blob], file.name, {
              type: blob.type || "image/jpeg",
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          },
          file.type || "image/jpeg",
          quality,
        );
      };
      img.onerror = () => reject(new Error("Gambar tidak dapat dibaca."));
      img.src = reader.result;
    };
    reader.onerror = () => reject(new Error("Gagal membaca file."));
    reader.readAsDataURL(file);
  });
}

function updateUploadStatus(input, text, status = "info") {
  const statusEl = input.parentElement.querySelector(".upload-status");
  if (!statusEl) return;
  statusEl.textContent = text;
  statusEl.style.color = status === "error" ? "#b42318" : "#3d6b40";
}

async function compressSelectedFile(input) {
  const file = input.files?.[0];
  if (!file) return;

  const isPdf =
    file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
  if (isPdf) {
    updateUploadStatus(input, "Format PDF tidak dikompres.");
    return;
  }

  try {
    updateUploadStatus(input, "Mengompres foto…");
    const compressedFile = await compressImageFile(file, {
      maxWidth: 1200,
      maxHeight: 1200,
      quality: 0.7,
    });

    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(compressedFile);
    input.files = dataTransfer.files;

    const originalSizeKB = (file.size / 1024).toFixed(1);
    const compressedSizeKB = (compressedFile.size / 1024).toFixed(1);
    updateUploadStatus(
      input,
      `Foto berhasil dikompres: ${originalSizeKB} KB → ${compressedSizeKB} KB`,
      "success",
    );
  } catch (error) {
    console.error(error);
    updateUploadStatus(
      input,
      "Gagal mengompres file, tetap menggunakan file asli.",
      "error",
    );
  }
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      resolve("");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Gagal membaca foto."));
    reader.readAsDataURL(file);
  });
}

document.querySelectorAll('input[type="file"]').forEach((input) => {
  input.addEventListener("change", () => compressSelectedFile(input));
});

const form = document.querySelector("#regForm"),
  paymentPage = document.querySelector("#paymentPage"),
  documentPage = document.querySelector("#documentPage");
const steps = document.querySelectorAll(".steps span");
let registrationData = {};
function setStep(n) {
  steps.forEach((x, i) => x.classList.toggle("active", i === n - 1));
}
function val(name) {
  return form.elements[name]?.value?.trim() || "-";
}
function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}
function showToast(message, type = "error") {
  const toast = document.querySelector("#toast");
  if (!toast) return;
  toast.textContent = message;
  toast.className = `toast ${type} visible`;
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("visible"), 4500);
}
function fieldLabel(field) {
  const label = field.closest("label");
  if (!label) return field.name || "kolom ini";
  const text = [...label.childNodes]
    .filter((node) => node.nodeType === Node.TEXT_NODE)
    .map((node) => node.textContent.trim())
    .join(" ");
  return text || field.name || "kolom ini";
}
function validateForm() {
  const requiredFields = [...form.querySelectorAll("[required]")];
  const missingFields = requiredFields.filter((field) => {
    if (field.type === "file") return !field.files?.length;
    return !field.value.trim();
  });
  if (missingFields.length) {
    const names = missingFields.map(fieldLabel).join(", ");
    showToast(`Mohon lengkapi kolom berikut:\n${names}`);
    missingFields[0].focus();
    return false;
  }
  const email = form.elements.email;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
    showToast("Kolom Email belum diisi dengan format yang benar.");
    email.focus();
    return false;
  }
  return true;
}
async function copyAccountNumber() {
  const account = document.querySelector("#accountNumber")?.textContent.trim();
  if (!account) return;
  try {
    await navigator.clipboard.writeText(account);
  } catch (error) {
    const helper = document.createElement("textarea");
    helper.value = account;
    document.body.appendChild(helper);
    helper.select();
    document.execCommand("copy");
    helper.remove();
  }
  showToast("Nomor rekening berhasil disalin.", "success");
}
function formatDate(iso) {
  if (!iso) return "-";
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const f = e.currentTarget,
    msg = document.querySelector("#formMsg");
  if (!validateForm()) return;
  const nik = f.nik.value.replace(/\D/g, "");
  if (nik.length !== 16) {
    msg.textContent = "NIK harus terdiri dari 16 digit.";
    showToast("NIK harus terdiri dari 16 digit.");
    f.nik.focus();
    return;
  }
  if (!/^[0-9+\-\s]{9,16}$/.test(f.hp.value)) {
    msg.textContent = "Nomor HP tidak valid.";
    showToast("Nomor HP tidak valid.");
    f.hp.focus();
    return;
  }
  const number = `DL-2026-${String(Math.floor(10000 + Math.random() * 90000))}`;
  registrationData = {
    number,
    date: new Date(),
    name: val("nama"),
    nik: val("nik"),
    tempat: val("tempat"),
    tanggal: val("tanggal"),
    agama: val("agama"),
    jk: val("jk"),
    pendidikan: val("pendidikan"),
    pekerjaan: val("pekerjaan"),
    hp: val("hp"),
    email: val("email"),
    alamatktp: val("alamatktp"),
    domisili: val("domisili"),
    ayah: val("ayah"),
    hpAyah: val("hpAyah"),
    ibu: val("ibu"),
    hpIbu: val("hpIbu"),
    alamatWali: val("alamatWali"),
    program: programs[Number(sel.value)][0],
    harga: programs[Number(sel.value)][4],
  };
  setText("payName", registrationData.name);
  setText("payProgram", registrationData.program);
  setText("payTotal", money(registrationData.harga));
  setText("regNo", number);
  setText("finalRegNo", number);
  paymentPage.hidden = false;
  form.style.display = "none";
  setStep(2);
  paymentPage.scrollIntoView({ behavior: "smooth", block: "start" });
});

document.querySelector("#backToForm").addEventListener("click", () => {
  paymentPage.hidden = true;
  form.style.display = "block";
  setStep(1);
  document.querySelector("#daftar").scrollIntoView({ behavior: "smooth" });
});

function fillPdf() {
  const d = registrationData;
  const date = d.date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const status =
    document.querySelector('input[name="paymentMethod"]:checked').value ===
    "transfer"
      ? "Menunggu Konfirmasi Pembayaran"
      : "Belum Dibayar / Bayar di LKP";
  setText("finalRegNo", d.number);
  setText("finalDate", date);
  setText("finalProgram", d.program);
  setText("paymentStatus", status);
  setText("pdfRegNo", d.number);
  setText("pdfDate", date);
  setText("pdfNama", d.name);
  setText("pdfNik", d.nik);
  setText("pdfTtl", `${d.tempat}, ${formatDate(d.tanggal)}`);
  setText("pdfJk", d.jk);
  setText("pdfAgama", d.agama);
  setText("pdfPendidikan", d.pendidikan);
  setText("pdfHp", d.hp);
  setText("pdfEmail", d.email);
  setText("pdfKtp", d.alamatktp);
  setText("pdfDomisili", d.domisili);
  setText("pdfAyah", d.ayah);
  setText("pdfHpAyah", d.hpAyah);
  setText("pdfIbu", d.ibu);
  setText("pdfHpIbu", d.hpIbu);
  setText("pdfAlamatWali", d.alamatWali);
  setText("pdfPekerjaan", d.pekerjaan);
  setText("pdfProgram", d.program);
  setText("pdfHarga", money(d.harga));
  setText("pdfStatus", status);
  setText("signatureName", d.name);
}
document.querySelector("#continuePayment").addEventListener("click", () => {
  fillPdf();
  paymentPage.hidden = true;
  documentPage.hidden = false;
  setStep(3);
  documentPage.scrollIntoView({ behavior: "smooth", block: "start" });
});
document
  .querySelector("#printPdf")
  ?.addEventListener("click", () => window.print());

document
  .querySelector("#copyAccount")
  ?.addEventListener("click", copyAccountNumber);

document.querySelector("#downloadPdf")?.addEventListener("click", async () => {
  const btn = document.querySelector("#downloadPdf");
  btn.disabled = true;
  btn.textContent = "Membuat PDF…";
  try {
    if (!window.jspdf) throw new Error("PDF library belum termuat");
    fillPdf();
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const W = 210,
      H = 297,
      M = 18,
      CW = W - M * 2;
    const burg = [139, 21, 56];
    const black = [0, 0, 0];
    const safe = (v) => String(v == null || v === "" ? "-" : v);
    const wrap = (v, w) => doc.splitTextToSize(safe(v), w);
    const lineSpacing = 1.5;
    const textLineHeight = (size) => size * lineSpacing * 0.35;
    const baseHref = window.location.href.split("#")[0];
    const logoLembagaUrl = new URL("./assets/logo.png", baseHref).href;
    const logoPendidikanUrl = new URL("./assets/logo_pendidikan.png", baseHref)
      .href;
    let y = 18;
    function header(withLetterhead = false) {
      if (!withLetterhead) {
        y = 18;
        return;
      }
      const logoSize = 25;
      const logoY = 10;
      const logoInset = 5;

      try {
        doc.addImage(
          logoLembagaUrl,
          "PNG",
          M + logoInset,
          logoY,
          logoSize,
          logoSize,
        );
      } catch (error) {
        console.warn("Logo lembaga gagal dimuat:", error);
      }

      try {
        doc.addImage(
          logoPendidikanUrl,
          "PNG",
          W - M - logoSize - logoInset,
          logoY,
          logoSize,
          logoSize,
        );
      } catch (error) {
        console.warn("Logo pendidikan gagal dimuat:", error);
      }

      doc.setTextColor(35, 35, 35);
      doc.setFont("Times New Roman", "bold");
      doc.setFontSize(11.5);
      doc.text("LEMBAGA PENDIDIKAN", W / 2, 15, { align: "center" });
      doc.setFontSize(17);
      doc.text("DEWI LUTFI’KA", W / 2, 23, { align: "center" });
      doc.setFont("Times New Roman", "normal");
      doc.setFontSize(6.5);
      const headerTextWidth = W - 2 * (M + logoInset + logoSize + 8);
      const addressLines = doc.splitTextToSize(
        "Alamat: Jl. Pattimura II Lrg. Basamo, RT.10/RW.No.29, Kenali Besar, Kecamatan Alam Barajo, Kota Jambi, Jambi 36129, Telp/WA: 08216222667 / 08980215460",
        headerTextWidth,
      );
      doc.text(addressLines, W / 2, 29, {
        align: "center",
        maxWidth: headerTextWidth,
        lineHeightFactor: 1.2,
      });
      y = 42;
      doc.setDrawColor(...black);
      doc.setLineWidth(0.7);
      doc.line(M, y, W - M, y);
      y += 8;
    }
    function title(t) {
      doc.setFont("Times New Roman", "bold");
      doc.setFontSize(15);
      doc.setTextColor(30, 30, 30);
      doc.text(t, W / 2, y, { align: "center" });
      y += 6;
    }
    function subtitle(t) {
      doc.setFont("Times New Roman", "bold");
      doc.setFontSize(11);
      doc.text(t, W / 2, y, { align: "center" });
      y += 10;
    }
    function section(t) {
      if (y > 270) {
        doc.addPage();
        y = 18;
        header();
      }
      doc.setTextColor(0, 0, 0);
      doc.setFont("Times New Roman", "bold");
      doc.setFontSize(12);
      doc.text(t, M, y);
      doc.setDrawColor(0, 0, 0);
      doc.setLineWidth(0.3);
      doc.line(M, y + 2, W - M, y + 2);
      doc.setTextColor(0, 0, 0);
      y += 8;
    }
    function row(label, value) {
      const lines = wrap(value, CW - 58);
      const rowHeight = Math.max(6, lines.length * textLineHeight(10.5));
      if (y + rowHeight > 282) {
        doc.addPage();
        y = 18;
        header();
      }
      doc.setFont("Times New Roman", "bold");
      doc.setFontSize(10.5);
      doc.text(label, M, y);
      doc.setFont("Times New Roman", "normal");
      doc.text(lines, M + 48, y, { lineHeightFactor: lineSpacing });
      y += rowHeight + 2;
    }
    function para(t, size = 10.5) {
      const lines = wrap(t, CW);
      const paraHeight = lines.length * textLineHeight(size);
      if (y + paraHeight > 282) {
        doc.addPage();
        y = 18;
        header();
      }
      doc.setFont("Times New Roman", "normal");
      doc.setFontSize(size);
      doc.text(lines, M, y, { lineHeightFactor: lineSpacing });
      y += paraHeight + 3;
    }
    function numbered(items) {
      items.forEach((item, i) => {
        const lines = wrap(item, CW - 9);
        const itemHeight = lines.length * textLineHeight(10.5);
        if (y + itemHeight + 3 > 282) {
          doc.addPage();
          y = 18;
          header();
        }
        doc.setFont("Times New Roman", "normal");
        doc.setFontSize(10.5);
        doc.text(`${i + 1}.`, M, y);
        doc.text(lines, M + 7, y, { lineHeightFactor: lineSpacing });
        y += itemHeight + 3;
      });
    }

    header(true);
    title("FORMULIR PENDAFTARAN");
    subtitle("PESERTA KURSUS MENJAHIT");
    row("Nama", registrationData.name);
    row("Jenis Kelamin", registrationData.jk);
    row(
      "Tempat/Tanggal Lahir",
      `${registrationData.tempat}, ${formatDate(registrationData.tanggal)}`,
    );
    row("NIK", registrationData.nik);
    row("Alamat KTP", registrationData.alamatktp);
    row("Alamat Domisili", registrationData.domisili);
    row("Agama", registrationData.agama);
    row("Pendidikan Terakhir", registrationData.pendidikan);
    row("Pekerjaan", registrationData.pekerjaan);
    row("Telepon/HP/WA", registrationData.hp);
    row("Email", registrationData.email);
    row("Nama Orang Tua", `${registrationData.ayah} / ${registrationData.ibu}`);
    row("Alamat Orang Tua/Wali", registrationData.alamatWali);
    row(
      "Telepon/HP/WA Orang Tua",
      `${registrationData.hpAyah} / ${registrationData.hpIbu}`,
    );
    row("Kelas Yang Dipilih", registrationData.program);

    para(
      "Menyatakan bersedia menjadi peserta dan mematuhi segala kewajiban dan peraturan sebagai peserta.",
    );
    section("A. KEWAJIBAN PESERTA");
    numbered([
      "Mengikuti aturan di LKP Dewi Luthfi’ka selama masa pelatihan.",
      "Menyerahkan foto copy KTP sebanyak 3 lembar dan KK 3 lembar.",
      "Menyerahkan foto copy ijazah terakhir sebanyak 3 lembar.",
      "Menyerahkan foto ukuran 3x4 sebanyak 3 lembar.",
      "Melakukan pembayaran secara lunas.",
    ]);

    doc.addPage();
    y = 18;
    header();
    section("B. PERATURAN KURSUS JAHIT LKP/LPK DEWI LUTHFI’KA");
    numbered([
      "Siswa atau siswi harus datang sesuai jam kursus.",
      "Jika peserta berhalangan hadir, harus menginformasikan kepada instruktur/kasur kursus 2 jam sebelum waktu belajar dimulai.",
      "Peserta yang mendaftar dengan mencicil uang pendaftaran maka wajib membayar uang cicilan dalam jangka perbulan setiap jatuh tempo, untuk kurun waktu 2 bulan atau 3 bulan (untuk kelas wirausaha/industri).",
      "Jika peserta merusak perlengkapan belajar kursus jahit maka wajib menggantinya.",
      "Bagi peserta yang sudah melakukan pembayaran dan membatalkan secara sepihak maka uang pendaftaran tidak dapat dikembalikan (dengan catatan dapat diganti dengan jadwal kelas yang lain sesuai peraturan).",
      "Peserta yang mendaftar kelas promo jika suatu hari tidak hadir dalam jadwal kursus, maka 1 hari yang tidak hadir dianggap HANGUS, tidak dapat diganti hari lain, dan tetap melanjutkan kursus sesuai jadwal tanggal PENETAPAN KURSUS CLASS PROMO.",
      "Bagi peserta yang tidak hadir dalam kegiatan kursus dalam dua minggu maka terhitung jadwal satu minggu akan dihanguskan, absennya sebanyak 2 absen dihitung sampai setiap satu minggu tatap muka, jika tidak merapel absen yang lain tidak masuk.",
      "Bagi peserta yang tidak hadir berturut-turut dalam 2 bulan tanpa ada usaha meneruskan kegiatan menjahit maka pihak lembaga berhak mengeluarkan peserta dari kegiatan kursus lembaga.",
    ]);
    y += 3;
    section("NB");
    para(
      "Para peserta yang telah mendaftar diharapkan dapat mengkonfirmasi melalui WA resmi LKP DEWI LUTHFI’KA bahwa telah melakukan pembayaran uang kursus, agar peserta yang mendaftar bisa langsung digabungkan di GRUP WA pelatihan.",
    );
    para("Nomor WA resmi lembaga: 08216222667 / 08980215460");

    if (y > 245) {
      doc.addPage();
      y = 18;
      header();
    }
    y += 8;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.text("Jambi, __________________ 20____", W - 80, y);
    y += 8;
    doc.text("Mengetahui,", W - 80, y);
    y += 35;
    doc.text("(Orang Tua / Wali)", W - 55, y, { align: "center" });

    const photoInput = document.querySelector('input[name="fotoFile"]');
    const photoFile = photoInput?.files?.[0];
    const photoBoxX = M;
    const photoBoxY = y - 50;
    const photoBoxW = 42;
    const photoBoxH = 55;

    if (photoFile) {
      try {
        const photoDataUrl = await fileToDataUrl(photoFile);
        const format = photoFile.type === "image/png" ? "PNG" : "JPEG";
        doc.addImage(
          photoDataUrl,
          format,
          photoBoxX,
          photoBoxY,
          photoBoxW,
          photoBoxH,
          undefined,
          "FAST",
        );
      } catch (error) {
        showToast("Berkas PDF belum berhasil dibuat. Silakan coba lagi.");
        console.error(error);
        doc.rect(photoBoxX, photoBoxY, photoBoxW, photoBoxH);
        doc.setFontSize(8);
        doc.text("3X4", photoBoxX + photoBoxW / 2, photoBoxY + photoBoxH / 2, {
          align: "center",
        });
      }
    } else {
      doc.rect(photoBoxX, photoBoxY, photoBoxW, photoBoxH);
      doc.setFontSize(8);
      doc.text("3X4", photoBoxX + photoBoxW / 2, photoBoxY + photoBoxH / 2, {
        align: "center",
      });
    }

    doc.save(`Formulir-Pendaftaran-${registrationData.name}.pdf`);
  } catch (err) {
    alert("Berkas PDF belum berhasil dibuat. Silakan coba lagi.");
    console.error(err);
  } finally {
    btn.disabled = false;
    btn.textContent = "↓ Download Berkas PDF";
  }
});
