// DATA KERANJANG
let keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];

// UPDATE JUMLAH KERANJANG
function updatekeranjang() {
    let jumlah = document.getElementById("jumlah-keranjang");
    if (jumlah) {
        jumlah.textContent = keranjang.length;
    }
}

// TAMBAH KE KERANJANG
function tambahKeranjang(nama, harga) {
    keranjang.push({
        nama: nama,
        harga: harga
    });
    localStorage.setItem("keranjang", JSON.stringify(keranjang));
    updatekeranjang();
    tampilkanNotifikasi(nama + " ditambahkan ke keranjang!");
}

// TAMPILKAN KERANJANG
function tampilkanKeranjang() {
    if (keranjang.length == 0) {
        alert("Keranjang masih kosong!");
        return;
    }
    let isi = "Isi keranjang:\n\n";
    keranjang.forEach(function(produk, index) {
        isi += (index + 1) + ". " + produk.nama + " - Rp " + produk.harga.toLocaleString("id-ID") + "\n";
    });
    isi += "\nketik nomor barang yang ingin dihapus: ";
    isi += "\nketik 0 jika tidak ingin menghapus: ";
    let pilih = prompt(isi);
    if (pilih === null || pilih == 0) {
        return;
    }
    let index = parseInt(pilih) - 1;
    if (index >= 0 && index < keranjang.length) {
        hapuskeranjang(index);
    } else {
        alert("Nomor barang tidak ada!");
    }
}

// HAPUS KERANJANG
function hapuskeranjang(index) {
    let namaproduk = keranjang[index].nama;
    keranjang.splice(index, 1);
    localStorage.setItem("keranjang", JSON.stringify(keranjang));
    updatekeranjang();
    alert(namaproduk + " berhasil dihapus");
}

// TAMPILKAN ISI KERANJANG
function tampilkanisi() {
    let isi = document.getElementById("isi-keranjang");
    let totalharga = document.getElementById("total-harga");
    if (!isi) {
        return;
    }
    if (keranjang.length == 0) {
        isi.innerHTML = `
            <div class="keranjang-kosong">
                <i class="bi bi-cart-x"></i>
                <h2>Keranjang masih kosong</h2>
                <p>Silakan pilih produk terlebih dahulu.</p>
            </div>
        `;
        if (totalharga) {
            totalharga.textContent = "Rp 0";
        }
        return;
    }
    let total = 0;
    isi.innerHTML = "";
    keranjang.forEach(function(produk, index) {
        total += produk.harga;
        isi.innerHTML += `
            <div class="item-keranjang">
                <div class="item-info">
                    <h3>${produk.nama}</h3>
                    <p>Rp ${produk.harga.toLocaleString("id-ID")}</p>
                </div>
                <button class="hapus-produk" onclick="hapuskeranjangWeb(${index})">
                    <i class="bi bi-trash-fill"></i>
                    Hapus
                </button>
            </div>
        `;
    });
    if (totalharga) {
        totalharga.textContent = "Rp " + total.toLocaleString("id-ID");
    }
}

// HAPUS PRODUK DARI HALAMAN KERANJANG
function hapuskeranjangWeb(index) {
    keranjang.splice(index, 1);
    localStorage.setItem("keranjang", JSON.stringify(keranjang));
    updatekeranjang();
    tampilkanisi();
}

// CHECKOUT
function checkout(){
    if(keranjang.length==0){
    tampilkanNotifikasi("Keranjang masih kosong!");
    return;
    }

    keranjang=[];
    localStorage.removeItem("keranjang");

    updatekeranjang();
    tampilkanisi();

    tampilkanNotifikasi("Checkout berhasil!");
}


// CARI PRODUK
function cariproduk() {
    let input = document.getElementById("search-input");
    if (!input) {
        return;
    }
    let katakunci = input.value.toLowerCase();
    let produk = document.querySelectorAll(".card-produk");
    produk.forEach(function(item) {
        let nama = item.querySelector("h4");
        if (!nama) {
            return;
        }
        let namaproduk = nama.textContent.toLowerCase();
        if (namaproduk.includes(katakunci)) {
            item.style.display = "flex";
        } else {
            item.style.display = "none";
        }
    });
}

// NOTIFIKASI
function tampilkanNotifikasi(pesan) {
    let notifikasi = document.createElement("div");
    notifikasi.className = "notifikasi";
    notifikasi.innerHTML = `
        <i class="bi bi-check-circle-fill"></i>
        <span>${pesan}</span>
    `;
    document.body.appendChild(notifikasi);
    setTimeout(function() {
        notifikasi.remove();
    }, 2500);
}

// JALANKAN PROGRAM
updatekeranjang();
tampilkanisi();
