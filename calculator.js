
document.getElementById('calculateBtn').addEventListener('click', function() {
    const type = document.getElementById('type').value;
    const interestType = document.getElementById('interestType').value;
    const periodType = document.getElementById('periodType').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const rate = parseFloat(document.getElementById('rate').value) / 100; // Membagi rate dengan 100 agar jadi desimal
    const time = parseFloat(document.getElementById('time').value);

    let a = time;
    let b = rate;

    let adjustedTime = time;  // Waktu yang disesuaikan berdasarkan periode
    let adjustedRate = rate;  // Suku bunga yang disesuaikan berdasarkan periode
    let result = 0;

    // Penyesuaian waktu dan suku bunga berdasarkan jenis periode
    switch (periodType) {
        case 'monthly':
            adjustedTime = time * 12;  // Jika memilih perbulan, kalikan dengan 12
            adjustedRate = rate / 12;  // Suku bunga tahunan menjadi bulanan
            break;
        case 'quarterly':
            adjustedTime = time * 4;   // Triwulan, kalikan dengan 4
            adjustedRate = rate / 4;   // Suku bunga tahunan menjadi triwulanan
            break;
        case 'semester':
            adjustedTime = time * 2;   // Semester, kalikan dengan 2
            adjustedRate = rate / 2;   // Suku bunga tahunan menjadi per semester
            break;
        case 'yearly':
            // Tidak perlu penyesuaian jika pertahun
            break;
    }

    if (type === 'initial') {
        // Menghitung modal awal
        if (interestType === 'simple') {
            // Bunga tunggal: Modal awal = Modal akhir / (1 + (rate * time))
            result = amount / (1 + (adjustedRate * adjustedTime));
        } else if (interestType === 'compound') {
            adjustedTime = a;
            adjustedRate = b;
            // Bunga majemuk: Modal awal = Modal akhir / (1 + rate)^time
            result = amount / Math.pow((1 + adjustedRate), adjustedTime);
        } else if (interestType === 'annuity') {
            
            adjustedTime = a;
            adjustedRate = b;
            // Anuitas: Modal awal = Modal akhir * (1 - (1 + rate)^(-time)) / rate
            result = amount * (1 - Math.pow((1 + adjustedRate), -adjustedTime)) / adjustedRate;
        }
    } else if (type === 'final') {
        // Menghitung modal akhir
        if (interestType === 'simple') {
            // Bunga tunggal: Modal akhir = Modal awal * (1 + (rate * time))
            result = amount * (1 + (adjustedRate * adjustedTime));
        } else if (interestType === 'compound') {
            c
            // Bunga majemuk: Modal akhir = Modal awal * (1 + rate)^time
            result = amount * Math.pow((1 + adjustedRate), adjustedTime);
        } else if (interestType === 'annuity') {
            
            adjustedTime = a;
            adjustedRate = b;
            // Anuitas: Modal akhir = Modal awal * (1 + rate)^time * rate / ((1 + rate)^time - 1)
            result = amount * adjustedRate * Math.pow((1 + adjustedRate), adjustedTime) / (Math.pow((1 + adjustedRate), adjustedTime) - 1);
        }
    }

    // Menampilkan hasil
    document.getElementById('result').textContent = `Hasil: ${result.toFixed(2)}`;
});
