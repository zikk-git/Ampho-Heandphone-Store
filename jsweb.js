let keranjang = [];

function tambahkeranjang (nama, harrga) {
    keranjang.push ({
        nama: nama,
        harga: harrga
    });

    document.getElementById("jumlah-keranjang").textContent = keranjang.length;

    alert(nama + " ditambahkan ke keranjang!");
}

function tampilkeranjang () {
    if (keranjang.length == 0) {
        alert("keranjang masih kosong!");
        return;
    }

    let isi = "isi keranjang:\n\n";

    keranjang.forEach(function(produk, indedx) {
        isi += (index + 1) + ". " + produk.nama +
        " - Rp " + produk.harga.toLocaleString("id-ID") + "\n";
    });

    alert(isi);
}