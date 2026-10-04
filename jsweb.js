let keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];

function updatekeranjang() {
    let jumlah = document.getElementById("jumlah-keranjang");

    if (jumlah) {
        jumlah.textContent = keranjang.length;
    }
}

function tambahKeranjang(nama, harga) {
    keranjang.push({
        nama: nama,
        harga: harga
    });

    localStorage.setItem("keranjang", JSON.stringify(keranjang));

    updatekeranjang();

    alert(nama + " ditambahkan ke keranjang!");
}

function tampilkanKeranjang() {
    if (keranjang.length == 0) {
        alert("Keranjang masih kosong!");
        return;
    }

    let isi = "Isi keranjang:\n\n";

    keranjang.forEach(function(produk, index) {
        isi += (index + 1) + ". " + produk.nama +
        " - Rp " + produk.harga.toLocaleString("id-ID") + "\n";
    });

    isi += "\nketk nomor barang yang ingin di hapus: ";
    isi += "\nketik 0 jika tidak ingin menghapus: ";

    let pilih = prompt(isi);

    if (pilih === null || pilih == 0) {
        return;
    }

    let index = parseInt(pilih) - 1;

    if (index >= 0 && index < keranjang.length) {
        hapuskeranjang(index);
    } else {
        alert("nomor barang tidak ada!");
    }
}

function hapuskeranjang(index) {
    let namaproduk = keranjang[index].nama;

    keranjang.splice(index, 1);

    localStorage.setItem("keranjang", JSON.stringify(keranjang));

    updatekeranjang();

    alert(namaproduk + " berhasil dihapus");
}

function tampilkanisi() {
    let isi = document.getElementById("isi-keranjang");
    let totalharga = document.getElementById("total-harga")

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

        totalharga.textContent = "Rp 0";
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

                    <p>
                        Rp ${produk.harga.toLocaleString("id-ID")}
                    </p>
                </div>

                <button
                    class="hapus-produk"
                    onclick="hapuskeranjangWeb(${index})">

                    <i class="bi bi-trash-fill"></i>
                    Hapus

                </button>

            </div>
        `;
    });

    totalharga.textContent =
        "Rp " + total.toLocaleString("id-ID");
}

function hapuskeranjangWeb(index) {

    keranjang.splice(index, 1);

    localStorage.setItem(
        "keranjang",
        JSON.stringify(keranjang)
    );

    updatekeranjang();

    tampilkanisi();
}

function checkout() {

    if (keranjang.length == 0) {
        alert("Keranjang masih kosong!");
        return;
    }

    keranjang = [];

    localStorage.removeItem("keranjang");

    updatekeranjang();

    tampilkanisi();

    alert("Checkout berhasil!");
}

function cariproduk() {
    let input = document.getElementById("search-input");

    let katakunci = input.value.toLowerCase();

    let produk = document.querySelectorAll(".card-produk");

    produk.forEach(function(item) {

        let namaproduk = item
            .querySelector("h4")
            .textContent
            .toLowerCase();

        if (namaproduk.includes(katakunci)) {
            item.style.display = "flex";
        } else {
            item.style.display = "none";
        }

    });
}

updatekeranjang();
tampilkanisi();