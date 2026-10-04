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

updatekeranjang();