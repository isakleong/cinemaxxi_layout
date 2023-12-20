const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class CinemaXXI {
    constructor() {
        this.arrSeat = [];
    }

    addSeat(seatLabel, seatNumber) {
        const isExist = this.arrSeat.find(item => item.seatLabel === seatLabel);

        if (isExist) {
            console.log('----- Maaf, kursi sudah ada, silahkan masukkan label kursi yang lain. -----');
        } else {
            for (var i = 1; i <= seatNumber; i++) {
                this.arrSeat.push(
                    { 
                        seatLabel: seatLabel,
                        seatNumber: i,
                        seatStatus: 'Free',
                        transactionDate: 'Belum Terjual',
                    }
                );
            }
            console.clear();
            console.clear();
            console.log("Data kursi berhasil ditambahkan ke layout.");
        }
    }

    showSeat() {
        console.clear();
        console.log("=================== Laporan Denah Kursi ===================");
        const sortedSeat = [...this.arrSeat].sort((a, b) => a.seatLabel.localeCompare(b.seatLabel) || a.seatNumber - b.seatNumber);
    
        for (const seat of sortedSeat) {
            console.log(`${seat.seatLabel}${seat.seatNumber} - ${seat.seatStatus}`);
        }
        console.log("=================== End Of Laporan Denah Kursi ===================");
      }

    bookSeat(seatCode) {
        var cntExist = 0;
        for (const item of this.arrSeat) {
            if ((`${item.seatLabel}${item.seatNumber}`) === seatCode) {
                cntExist++;
                if(item.seatStatus != 'Sold') {
                    item.seatStatus = 'Sold';
                    
                    const now = new Date();
                    var day = now.getDay();
                    var month = now.getMonth();
                    var year = now.getFullYear();
                    var hour = now.getHours();
                    var minute = now.getMinutes();
                    var second = now.getSeconds();
                    item.transactionDate = `${day}-${month}-${year} ${hour}:${minute}:${second}`;
                    console.clear();
                    console.log("\n----- Kursi berhasil dipesan. -----\n");
                    break;
                } else {
                    console.clear();
                    console.log("\n----- Mohon maaf, nomor kursi sudah dibeli oleh orang lain. Silahkan coba lagi. -----\n");
                    break;        
                }
            }
        }
        if(cntExist == 0) {
            console.clear();
            console.log("\n----- Mohon maaf, nomor kursi tidak ditemukan. Silahkan coba lagi. -----\n");
        }
        // mainMenu();
    }

    cancelSeat(seatCode) {
        var cntExist = 0;
        for (const item of this.arrSeat) {
            if ((`${item.seatLabel}${item.seatNumber}`) === seatCode) {
                cntExist++;
                if(item.seatStatus != 'Free') {
                    item.seatStatus = 'Free';
                    item.transactionDate = 'Belum Terjual';
                    break;
                } else {
                    console.clear();
                    console.log("\n----- Mohon maaf, nomor kursi belum dibeli, sehingga belum bisa dibatalkan. Silahkan coba lagi. -----\n");
                    break;
                }
            }
        }
        if(cntExist == 0) {
            console.clear();
            console.log("\n----- Mohon maaf, nomor kursi tidak ditemukan. Silahkan coba lagi. -----\n");
        }
        // mainMenu();
    }

    showTransactionReport() {
        console.log("=================== Laporan Transaksi ===================");

        const sortedSeat = [...this.arrSeat].sort((a, b) => a.seatLabel.localeCompare(b.seatLabel) || a.seatNumber - b.seatNumber);
    
        var cntFree = 0;
        var cntSold = 0;

        for (const seat of sortedSeat) {
            if(seat.seatStatus === 'Sold') {
                cntSold++;
            } else {
                cntFree++;
            }
        }
        console.log("Total "+cntFree+" Free, "+cntSold+" Sold");
        for (const seat of sortedSeat) {
            console.log(`${seat.seatLabel}${seat.seatNumber} - ${seat.transactionDate}`);
        }
        console.log("=================== End of Laporan Transaksi ===================");
    }
}

function settingLayout() {
    console.log("===== Menu Konfigurasi Denah Studio =====");
    rl.question('Masukkan Label Kursi (contoh A, B, C, dst) : ', (seatLabel) => {
        if (seatLabel.toLowerCase() === 'exit') {
            rl.close();
        } else {
            if (seatLabel.length === 1 && seatLabel.match(/[a-z]/i)) {
                rl.question('Masukkan Jumlah Kursi (maks 20 kursi) : ', (seatNumber) => {
                    if (seatNumber.toLowerCase() === 'exit') {
                        rl.close();
                    } else {
                        const checkNum = parseInt(seatNumber);
    
                        if (checkNum < 1) {
                            console.clear();
                            console.log("\n----- Mohon maaf, nomor kursi dimulai dengan angka 1. Silahkan coba lagi. -----\n");
                            settingLayout();
                        } else if (checkNum > 20) {
                            console.clear();
                            console.log("\n----- Mohon maaf, maksimal nomor kursi adalah 20. Silahkan coba lagi. ----\n");
                            settingLayout();
                        } else if (isNaN(seatNumber)) {
                            console.clear();
                            console.log("\n----- Mohon maaf, label kursi tidak valid. Silahkan coba lagi. -----\n");
                            settingLayout();
                        } else {
                            cinemaXXI.addSeat(seatLabel.toUpperCase(), seatNumber);
                            rl.question('Ingin tambah data? (Y/N) : ', (command) => {
                                if(command.toLowerCase() === "y") {
                                    console.clear();
                                    settingLayout();
                                } else if(command.toLowerCase() === "n") {
                                    console.clear();
                                    mainMenu();
                                } else {
                                    console.clear();
                                    console.log("\n----- Perintah tidak valid. -----\n")
                                    main();
                                }
                            });
                            console.log("")
                        }
                    }
                });
            } else {
                console.clear();
                console.log("\n----- Mohon maaf, label kursi tidak valid. Label kursi antara A - Z. Silahkan coba lagi. -----\n");
                settingLayout();
            }
        }
    });
}

const cinemaXXI = new CinemaXXI();
function mainMenu() {
    console.log("=================== Aplikasi Cinema XXI Layout ===================")
    console.log("1) Pemesanan Kursi");
    console.log("2) Batalkan Kursi");
    console.log("3) Laporan Denah Kursi");
    console.log("4) Laporan Transasksi Kursi");
    console.log("Masukkan 'Exit' untuk keluar dari aplikasi");


    rl.question('=================== Pilih salah satu nomor menu dibawah ini ===================\nMenu : ', (menu) => {
        if(menu.toLowerCase() === 'exit') {
            rl.close();
        } else {
            if (menu === '1') {
                rl.question('Masukkan nomor kursi yang ingin dipesan (contoh A5) : ', (data) => {
                    cinemaXXI.bookSeat(data);
                    mainMenu();
                });
            } else if (menu === '2') {
                rl.question('Masukkan nomor kursi yang ingin dibatalkan (contoh A5) : ', (data) => {
                    cinemaXXI.cancelSeat(data);
                    mainMenu();
                });
            } else if (menu === '3') {
                console.clear();
                cinemaXXI.showSeat();
                mainMenu();
            } else if (menu === '4') {
                console.clear();
                cinemaXXI.showTransactionReport();
                mainMenu();
            } else {
                console.clear();
                console.log("\n----- Nomor menu tidak valid, silahkan coba lagi. -----\n");
                mainMenu();
            }
        }
      });
}

function input() {
    rl.question('Input : ', (data) => {
        if (data.toLowerCase() === 'exit') {
            rl.close();
        } else if (data.toLowerCase() === 'ok') {
            console.clear();
            settingLayout();
        } else {
            console.clear();
            console.log("\n----- Input tidak valid, silahkan coba lagi -----\n");
            main();
        }
    });
}

function main() {
    console.log("===================  Aplikasi Cinema XXI Layout ===================");
    console.log("*) Selamat datang di aplikasi Cinema XXI. Anda perlu menginputkan konfigurasi denah studio terlebih dahulu. Silahkan input label kursi dan jumlah kursinya masing-masing.");
    console.log("*) Untuk masuk ke menu konfigurasi denah, masukkan 'OK'");
    console.log("*) Untuk keluar dari Aplikasi Cinema XXI, masukkan 'Exit'");
    input();
}

main();