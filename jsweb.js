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

    alert(isi);
}

updatekeranjang();